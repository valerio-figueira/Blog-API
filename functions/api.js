const express = require('express');
const app = express();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


    // MIDDLEWARE TO ENABLE CORS
    app.use(cors({
      origin: '*',
      methods: ['GET']
    }));

    // MIDDLEWARE FOR STATIC FILES
    app.use(express.static(path.join(__dirname, 'public')));


    // JSON CONFIG IN MIDDLEWARES
    app.use(
        express.urlencoded({
            extended: true
        })
    )
    app.use(express.json());


    // MIDDLEWARE TO REDIRECT ALL '/posts' ENTRIES TO ./routes/Posts
    app.use('/posts', require('./routes/Posts'));
    app.use('/aside-posts', require('./routes/AsidePosts'));

    // NECESSARY TO RUN SERVELESS
    const router = express.Router();




// ROUTES
router.get('/', cors(), (req, res) => {
  res.json({
    'path': 'Home',
    'message': 'Hello, world!'
  })
})

router.get('/author', cors(), (req, res) => {
    res.json({
      'author': 'Valerio Figueira'
    })
})


router.get('/imgs/:name', cors(), (req, res) => {
  const options ={
    root: path.join('../New App/public/imgs/')
  }

  const fileName = req.params.name;
  res.sendFile(fileName, options);

})


app.use('/', router)

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.vimpoeg.mongodb.net/master?retryWrites=true&w=majority`)
.then(() => {
    console.log('Connected with MongoDB!')
}).catch((error) => {
    console.log("Fail to connect with MongoDB: " + error);
});


module.exports.handler = serverless(app)