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

app.use(cors({ origin: 'http://localhost:3000' }));
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
  return el;
};

app.get('/item', async (req, res) => {
  let {
    search, minPrice, maxPrice, state, category, startDate, endDate,
  } = req.query;

  state = convertQueryToString(state);
  category = convertQueryToString(category);
  startDate = convertQueryToString(startDate);
  endDate = convertQueryToString(endDate);

  try {
    const result = await pool.query(`SELECT *
                                      FROM Capyborrow.all_items_display AS i
                                      WHERE ($1::text IS NULL OR i.name ILIKE '%' || $1 || '%')
                                        AND ($2::int  IS NULL OR i.price >= $2)
                                        AND ($3::int  IS NULL OR i.price <= $3)
                                        AND ((${state || null}) IS NULL OR i.state IN (${state || null}))
                                        AND ((${category || null}) IS NULL OR i.category1 IN (${category || null}))
                                        AND ((${startDate || null}) IS NULL OR i.start_date <= (${startDate || null}))
                                        AND ((${endDate || null}) IS NULL OR i.end_date >= (${endDate || null}))
                                        `, [search || null, minPrice || null, maxPrice || null]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post pour créer un item

module.exports = app;
