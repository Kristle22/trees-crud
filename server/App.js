const express = require('express')
const app = express()

const path = require('path');

const port = process.env.PORT || 3003;

if (process.env.NODE_ENV === "production") {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "la_ma",
});

// READ
app.get('/', (req, res) => {
  res.send('Hello, World!')
})
app.get('/zuikis', (req, res) => {
  res.send('Labas, Zuiki!')
})

// /////////////TREES////////////////////
// Routes
// READ

// SELECT column_name(s)
// FROM table1
// LEFT JOIN table2
// ON table1.column_name = table2.column_name;

app.get('/medziai', (req, res) => {
  const sql = `
  SELECT
  t.title, g.title AS good, height, type, t.id, GROUP_CONCAT(c.com, '-^o^-') AS coms, GROUP_CONCAT(c.id) AS coms_id
  FROM trees AS t
  LEFT JOIN goods AS g
  ON t.good_id = g.id
  LEFT JOIN comments AS c
  ON t.id = c.tree_id
  GROUP BY t.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE
// INSERT INTO table_name(column1, column2, column3, ...)
// VALUES(value1, value2, value3, ...);
app.post('/medziai', (req, res) => {
  const sql = `
  INSERT INTO trees
  (type, title, height, good_id)
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [req.body.type, req.body.title, req.body.height ? req.body.height : 0, req.body.good === '0' ? null : req.body.good], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Zuiki', type: 'success' } });
  })
});

// DELETE
// DELETE FROM table_name WHERE condition;
app.delete('/medziai/:treeId', (req, res) => {
  const sql = `
  DELETE FROM trees
  WHERE id = ?
  `;
  con.query(sql, [req.params.treeId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Ok, Barsukai', type: 'danger' } });
  })
});

// EDIT(PUT);
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition
app.put('/medziai/:treeId', (req, res) => {
  const sql = `
  UPDATE trees 
  SET title = ?, height = ?, type = ?, good_id = ?
  where id = ?
  `;
  con.query(sql, [req.body.title, req.body.height, req.body.type, req.body.good, req.params.treeId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Bebrai', type: 'info' } });
  })
});

// /////////////GOODS//////////////
// CREATE GOODS
app.post('/gerybes', (req, res) => {
  const sql = `
  INSERT INTO goods
  (title)
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Zuiki', type: 'success' } });
  })
});

// READ GOODS
app.get('/gerybes', (req, res) => {
  const sql = `
SELECT
g.title, g.id, COUNT(t.id) AS trees_count
FROM trees AS t
RIGHT JOIN goods AS g
ON t.good_id = g.id
GROUP BY g.id
ORDER BY trees_count DESC
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// READ FRONT GOODS
app.get('/front/gerybes', (req, res) => {
  const sql = `
SELECT
g.title, g.id, COUNT(t.id) AS trees_count, GROUP_CONCAT(t.title) AS tree_titles
FROM trees AS t
RIGHT JOIN goods AS g
ON t.good_id = g.id
GROUP BY g.id
ORDER BY g.title
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// READ FRONT TREES
app.get('/front/medziai', (req, res) => {
  const sql = `
SELECT
t.title, g.title AS good, height, type, t.id, GROUP_CONCAT(c.com, '-^o^-') AS coms, t.rates, t.rate_sum 
FROM trees AS t
LEFT JOIN goods AS g
ON t.good_id = g.id
LEFT JOIN comments AS c
ON t.id = c.tree_id
GROUP BY t.id
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE FRONT TREE RATES

app.put('/front/balsuok/:treeId', (req, res) => {
  const sql = `
  UPDATE trees 
  SET rates = rates + 1, rate_sum = rate_sum + ?
  where id = ?
  `;
  con.query(sql, [req.body.rate, req.params.treeId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Tavo balsas iskaitytas!', type: 'info' } });
  })
});

// CREATE FRONT COMMENTS
app.post('/front/komentarai', (req, res) => {
  const sql = `
  INSERT INTO comments
  (com, tree_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.comment, req.body.treeId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'OK, Zuiki', type: 'success' } });
  })
});


// DELETE GOODS
// DELETE FROM table_name WHERE condition;
app.delete('/gerybes/:goodId', (req, res) => {
  const sql = `
  DELETE FROM goods
  WHERE id = ?
  `;
  con.query(sql, [req.params.goodId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Ok, Barsukai', type: 'danger' } });
  })
});

// DELETE COMMENTS
app.delete('/komentarai/:comId', (req, res) => {
  const sql = `
  DELETE FROM comments
  WHERE id = ?
  `;
  con.query(sql, [req.params.comId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Komentaras istrintas', type: 'info' } });
  })
});

app.listen(port, () => {
  console.log(`Bebras klauso porto Nr. ${port}`)
});