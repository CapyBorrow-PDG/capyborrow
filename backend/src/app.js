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

app.get('/item', async (req,res) => {
  const {search, min_price, max_price, state, category, start_date, end_date} = req.query;
  try {
    const result = await pool.query(`
      SELECT *
      FROM Capyborrow.all_items_display AS i
      WHERE ($1::text IS NULL OR i.name ILIKE '%' || $1 || '%')
        AND ($2::int  IS NULL OR i.price >= $2)
        AND ($3::int  IS NULL OR i.price <= $3)
        AND ($4::text IS NULL OR i.state = $4)
        AND ($5::text IS NULL OR i.category1 = $5)
        AND ($6::date IS NULL OR $7::date IS NULL OR NOT EXISTS (
               SELECT 1 FROM Capyborrow.borrow b
               WHERE b.item_id = i.item_id
                 AND b.start_date <= $7::date
                 AND b.end_date   >= $6::date
        ))`, 
        [search || null, min_price || null, max_price || null, state || null, category || null, start_date || null, end_date || null]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


/*
app.get('/item', async (req,res) => {
  try {
    const result = await pool.query(`SELECT * FROM capyborrow.all_items_display`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});
*/

//post pour créer un item

module.exports = app;