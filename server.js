'use strict';

const morgan = require('morgan');
const express = require('express');  // I added this

const { top50 } = require('./data/top50');

const PORT = 7000 || process.env.PORT;



const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');



// endpoints here
const temphome = (req, res) => res.render('pages/top50')
const top50page = (req, res) => res.render('pages/top50')

.get('/', temphome)
.get('/top50', top50)

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));