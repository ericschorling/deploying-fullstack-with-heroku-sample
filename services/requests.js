const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const { Pool } = require('pg'); // import node-postgres


const devPoolObject ={
  user: "postgres",
  password: "ews0310",
  host: "localhost",
  port: 5432,
  database: "my_activities"
}

const productionPool = { // create connection to database
  connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
  ssl: {
    rejectUnauthorized: false // don't check for SSL cert
  }
}

console.log(process.env.NODE_ENV)
const pool = new Pool( process.env.NODE_ENV ? productionPool : devPoolObject);

const getAllActivities = (req, res) => {
  const getString = 'SELECT * FROM my_activities'; // select all rows from the 'my_activities' table
  const countString = 'SELECT count(*) FROM my_activities' // get total row count from the 'my_activities' table
  pool.query(getString) // send query to select all rows from the 'my_activities' table 
    .then(activityResults => {
      let activities = activityResults.rows;
      pool.query(countString) // send query to get total row count from the 'my_activities' table
        .then(countResult => {
          let count = countResult.rows[0].count;
          console.log('Activities List:', activities);
          console.log(`Activities Count: ${count}`);
          res.json({ activities, count})
          // res.render('index', { activities: activities, count: count }); // render index.ejs, and send activity and count results to index.ejs
          // TODO: Send info to frontend 
        })
    })
    .catch(err => console.log(err));
}

const getSingleActivity = (req, res) => {
  fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
    .then(data => data.json()) // return a promise containing the response
    .then(json => res.json(json)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
    .catch((err) => console.log(err)) // log errors to the console
}

const addActivityToDB = (req, res) => {
  const activity = [ req.body.activity ]

  const addString = 'INSERT INTO my_activities (activity) VALUES ($1) RETURNING *'; // insert value into my_activities' table

  pool.query(addString, activity)
    .then(result => res.json(result))
    .catch(err => console.log(err));
}

const deleteAllActivites = (req, res) => {
  const removeString = 'DELETE FROM my_activities'; // delete all items in the 'my_activities' table
  pool.query(removeString) // send query delete all items in the 'my_activities' table
    .then(res.send('All activities cleared!')) // send confirmation to the browser
    .catch(err => console.log(err));  
}

const getAllImages = (req, res) => {
  const getString = 'SELECT * FROM drawings WHERE userid = 1'; // select all rows from the 'my_activities' table
  const countString = 'SELECT count(*) FROM drawings' // get total row count from the 'my_activities' table
  pool.query(getString) // send query to select all rows from the 'my_activities' table 
    .then(imageResults => {
      let images = imageResults.rows;
      pool.query(countString) // send query to get total row count from the 'my_activities' table
        .then(countResult => {
          let count = countResult.rows[0].count;
          console.log('Activities List:', images);
          console.log(`Activities Count: ${count}`);
          res.json({ images, count})
          // res.render('index', { activities: activities, count: count }); // render index.ejs, and send activity and count results to index.ejs
          // TODO: Send info to frontend 
        })
    })
    .catch(err => console.log(err));
}
const addImageToDB = (req, res) => {
  const imageData =  req.body.drawing_src 
  const userId = [req.body.userid]
  console.log(typeof imageData)
  
  const addString = 'INSERT INTO drawings (userid, drawing_src) VALUES ($1, $2) RETURNING *'; // insert value into my_activities' table

  pool.query(addString, [+userId, imageData])
    .then(result => res.json(result))
    .catch(err => console.log(err));
}

module.exports = { getSingleActivity, addActivityToDB, getAllActivities, deleteAllActivites, getAllImages, addImageToDB }