const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));    

function readAndServe(path, type, res) {
  try{
    const data = fs.readFileSync( path );
    res.statusCode = 200;
    res.setHeader('Content-Type', type);
    res.end( data );
  }
  catch(err)
  {
    console.log('Error: ',err);
  }
}

function readAndPost(path, type, req, res) {
  try{
    fs.writeFileSync( path, JSON.stringify(req.body) );
    // console.log( JSON.stringify( req.body ) )
    res.statusCode = 200;
    // res.setHeader('Content-Type', type);
    res.end();
}
  catch(err)
  {
    console.log('Error: ',err);
  }
}

app.get('/', (req, res) => {
  readAndServe( './public/index.html', 'text/html', res);
})

app.get('/index.js', (req, res) => {
  readAndServe( './public/index.js', 'text/javascript', res);
})

app.get('/styles.css', (req, res) => {
  readAndServe( './public/styles.css', 'text/css', res);
})

app.get('/db.json', (req, res) => {
  readAndServe( './public/db.json', 'application/json', res);
})

app.post('/db.json', (req, res) => {
  readAndPost( './public/db.json', 'application/json', req, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})