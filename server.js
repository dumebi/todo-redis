const express = require('express');
const path = require('path');
const redis = require('redis');
const cors = require('cors')
app = express();

const client = redis.createClient();
client.on('connect', function(){
  console.log('connected to redis server');
})

/* Create Application Routes */
const todoRoutes = require('./routes/todo');


const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/* Add Routes to App */
app.use('/api/', todoRoutes);
app.all("/*", (req, res) => {
  return res.status(404).json({ status: 'failed', data: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ status: 'failed', data: 'error occured' });
});

// app.use(require('connect-history-api-fallback')())
// app.use(serveStatic(__dirname + "/docs"));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'build/contracts')));
app.use(express.static(path.join(__dirname, 'node_modules')));
const port = process.env.PORT || 5000;


app.listen(port);
console.log('server started '+ port);
