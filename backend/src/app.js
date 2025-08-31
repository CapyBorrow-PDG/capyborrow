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

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(html);
});

/*USER*/


/*ITEM*/

const convertQueryToString = (el) => {
  if(typeof el === "string") {
    el = `'${el}'`;
  }
  else if(typeof el === "object") {
    el = el.flat().map(v => `'${v}'`).join(", ");
  }
  return el;
}

app.get('/item', async (req,res) => {
  //nique sa mère on verra demain
  let {search, minPrice, maxPrice, state, category, startDate, endDate} = req.query;

  state = convertQueryToString(state);
  category = convertQueryToString(category);
  startDate = convertQueryToString(startDate);
  endDate = convertQueryToString(endDate);

  try {
    const result = await pool.query(`
      SELECT *
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
    res.status(500).json({error: err.message});
  }
});

//post pour créer un item

module.exports = app;