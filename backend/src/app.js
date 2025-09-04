/* eslint-disable prefer-const */
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>A JavaScript project</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>A JavaScript project</h1>
</body>
</html>`;

const app = express();

//lance en localhost si on est pas en production
if (process.env.NODE_ENV !== 'production') {
  const port = 8888;
  app.listen(port, () => {
    console.log("Server running on port localhost:8888")
  });
}

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(html);
});

/* USER */
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM capyborrow.user');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  const { email, username } = req.body;
  try {
    const result = await pool.query(`INSERT INTO Capyborrow.user(email, username)
                                      VALUES($1, $2)`, [email, username]);
    if (!result.rows[0]) {
      return res.status(500).json({ error: 'Utilisateur non créé' });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  return null;
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, fname, lname } = req.body;
  try {
    const result = await pool.query(`UPDATE Capyborrow.user
                                      SET username = $1,
                                          firstname = $2,
                                          lastname = $3
                                      WHERE user_id = $4
                                      RETURNING *;`, [username, fname, lname, id]);
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  return null;
});

/* ITEM */

const convertQueryToString = (el) => {
  let newel = el;
  if (typeof newel === 'string') {
    newel = `'${newel}'`;
  } else if (typeof newel === 'object') {
    newel = newel.flat().map((v) => `'${v}'`).join(', ');
  }
  return newel;
};

app.get('/item{/:id}', async (req, res) => {
  let {
    search, user, minPrice, maxPrice, state, category, startDate, endDate,
  } = req.query;
  let id = req.params.id || 'default';

  if(id === 'default') {
    state = convertQueryToString(state);
    category = convertQueryToString(category);
    startDate = convertQueryToString(startDate);
    endDate = convertQueryToString(endDate);
  }

  try {
    const result = (id !== 'default') ? await pool.query(`SELECT * FROM Capyborrow.all_items_display AS i
                                        WHERE i.item_id = (${id});`) :

                                        await pool.query(`SELECT *
                                        FROM Capyborrow.all_items_display AS i
                                        WHERE ($1::text IS NULL OR i.name ILIKE '%' || $1 || '%')
                                        AND ($2::int IS NULL OR i.owner_id = $2)
                                        AND ($3::int  IS NULL OR i.price >= $3)
                                        AND ($4::int  IS NULL OR i.price <= $4)
                                        AND ((${state || null}) IS NULL OR i.state IN (${state || null}))
                                        AND ((${category || null}) IS NULL OR i.category1 IN (${category || null}))
                                        AND ((${startDate || null}) IS NULL OR i.start_date <= (${startDate || null}))
                                        AND ((${endDate || null}) IS NULL OR i.end_date >= (${endDate || null}))
                                        `, [search || null, user || null, minPrice || null, maxPrice || null]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  return null;
});

app.post('/item', async (req, res) => {
  const {
    name, description, price, state, ownerId, category1, category2, picture,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO
      Capyborrow.item(name, description, price, state, owner_id, category1, category2, picture)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8);`,
      [name, description || null, price, state, ownerId,
        category1 || null, category2 || null, picture],
    );

    if (!result.rows[0]) {
      return res.status(500).json({ error: 'Item non créé' });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  return null;
});

/* BORROW */

app.get('/borrows/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM Capyborrow.all_borrows AS b
                                      WHERE b.borrower_id = $1;`, [userid]);
    res.json(result.rows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

/* COLLECTION */

app.get('/users/:userid/collections{/:cid}', async (req, res) => {
  const userid = req.params.userid;
  let cid = req.params.cid || 'default';
  
  try {
    const result = cid === 'default' ? await pool.query(`SELECT c.collection_id, c.name FROM Capyborrow.itemcollection AS c WHERE owner_id = $1;`, [userid])
     : await pool.query(`SELECT i.*
                          FROM Capyborrow.all_items_display AS i
                          LEFT JOIN Capyborrow.collecteditem AS c USING(item_id)
                          LEFT JOIN Capyborrow.itemcollection AS co USING(collection_id)
                          WHERE c.collection_id = $1
                          AND co.owner_id = $2;`, [cid, userid]);
    res.json(result.rows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
  return null;
});

app.post('/users/:userid/collections', async (req, res) => {
  const {userid} = req.params;
  let {name} = req.body;

  name = convertQueryToString(name);

  try {
    const result = await pool.query(`INSERT INTO
      Capyborrow.itemcollection(name, owner_id)
      VALUES($1, $2);`, [name, userid]);

    if (!result.rows[0]) {
      return res.status(500).json({ error: 'collection non créée' });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.post('/users/:userid/collections/:cid', async (req, res) => {
  const {userid, cid} = req.params;
  const {item_id} = req.body;

  try {
    const result = await pool.query(`INSERT INTO
      Capyborrow.collecteditem(item_id, collection_id)
      VALUES($1, $2);`, [item_id, cid]);

    if (!result.rows[0]) {
      return res.status(500).json({ error: 'collection non créée' });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* REVIEW */

app.get('/item/:id/review', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(`SELECT * FROM Capyborrow.all_reviews WHERE item_id = (${id});`);

    res.json(result.rows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
  return null;
});

app.post('/item/:id/review', async (req, res) => {
  const id = req.params.id;
  let { author_id, rating, comment } = req.body;

  comment = convertQueryToString(comment);

  try {
    const result = await pool.query(`INSERT INTO
      Capyborrow.review(item_id, author_id, rating, comment)
      VALUES($1, $2, $3, (${comment || null}));`, [id, author_id, rating]);

    if (!result.rows[0]) {
      return res.status(500).json({ error: 'review non créée' });
    }
    res.status(201).json(result.rows[0]);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
})