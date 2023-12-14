const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated,(req, res) => { // put back rejectUnauthenticated !!!!
  console.log("req.use", req.user);
 const idOfAuthenticatedUser = req.user;

  const query = `SELECT * FROM "item"`
  const values = [idOfAuthenticatedUser]
  pool
    .query(query)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making SELECT for shelf:", error);
      res.sendStatus(500);
    });
 // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  console.log('POSTing the shelf url and description');
  const insertShelfQuery = `
    INSERT INTO "item"
    ("description", "image_url", "user_id")
      VALUES
    ($1, $2, $3)
  `
  const insertShelfValues = [req.body.description, req.body.image_url, req.body.user_id];
  pool.query(insertShelfQuery, insertShelfValues)
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('ERROR in post (pool)', err);
      res.sendStatus(500);
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
