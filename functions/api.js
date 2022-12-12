const express = require('express');
const app = express();
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


    // MIDDLEWARE TO ENABLE CORS (Cross Origin Resource Sharing)
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
    app.use('/home-posts', require('./routes/Home'));
    app.use('/popular', require('./routes/Popular'));


    // NECESSARY TO RUN SERVELESS
    const router = express.Router();




// ROUTES
router.get('/', cors(), (req, res) => {
    res.json({
      'path': 'Home',
      'by Valerio': 'Hello, world! This is my own public API made using Nodejs & Express ^^',
      'message': 'Be Welcome!',
      'About this API': 'You should navigate through these paths as well:',
      'posts': 'https://resilient-kangaroo-970dc9.netlify.app/posts',
      'aside': 'https://resilient-kangaroo-970dc9.netlify.app/popular',
      'aside': 'https://resilient-kangaroo-970dc9.netlify.app/aside-posts',
      'author': 'https://resilient-kangaroo-970dc9.netlify.app/author'
    })
})

router.get('/author', cors(), (req, res) => {
    res.json({
      'Author': 'Valerio Figueira',
      'About': 'Just a student and web developer, looking for a space in this technology world. I believe in hard work and discipline. Some technologies I am currently learning are NodeJS, React, Javascript, HTML, CSS, MongoDB, and my favorite O.S Linux.',
      'Linkedin': 'https://www.linkedin.com/in/valerio-figueira/',
      'Github': 'https://github.com/valerio-figueira',
      'Portfolio': 'https://valerio-figueira.github.io/portfolio/',
      'Location': 'Monte Alegre de Minas - Minas Gerais',
      'Country': 'Brazil',
      'Audiat sapiens': '"Tria sunt studientibus necessaria: natura, exercitium et disciplina." - Hugo de São Vitor'
    })
})


router.get('/imgs/:name', cors(), (req, res) => {
  const options ={
    root: path.join('../New App/public/imgs/')
  }

  const fileName = req.params.name;
  res.sendFile(fileName, options);

})


app.use('/', router);

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