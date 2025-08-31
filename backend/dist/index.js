// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"db.js":[function(require,module,exports) {
const {
  Pool
} = require("pg");
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "capyborrow-db",
  password: "admin",
  port: 5432
});
module.exports = pool;
},{}],"app.js":[function(require,module,exports) {
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
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(html);
});

/*USER*/
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM capyborrow.user");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
app.post('/users', async (req, res) => {
  const {
    email,
    username
  } = req.body;
  try {
    const result = await pool.query(`INSERT INTO Capyborrow.user(email, username)
        VALUES($1, $2)`, [email, username]);
    if (!rows[0]) {
      return res.status(500).json({
        error: "Utilisateur non créé"
      });
    }
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log("la");
    res.status(500).json({
      error: err.message
    });
  }
});
app.put('/users/:id', async (req, res) => {
  const {
    id
  } = req.params;
  const {
    username,
    fname,
    lname
  } = req.body;
  try {
    const result = await pool.query(`UPDATE Capyborrow.user
        SET username = $1,
            firstname = $2,
            lastname = $3
        WHERE user_id = $4
        RETURNING *;`, [username, fname, lname, id]);
    if (!result.rows[0]) {
      return res.status(404).json({
        error: "Utilisateur introuvable"
      });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/*ITEM*/

app.get('/item', async (req, res) => {
  const {
    search,
    min_price,
    max_price,
    state,
    category,
    start_date,
    end_date
  } = req.query;
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
        ))`, [search || null, min_price || null, max_price || null, state || null, category || null, start_date || null, end_date || null]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
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
},{"./db":"db.js"}],"index.js":[function(require,module,exports) {
const app = require('./app');
const port = '8888';
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
},{"./app":"app.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map