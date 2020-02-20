'use strict';

const morgan = require('morgan');
const express = require('express');  // I added this


const { top50 } = require('./data/top50');

const { books } = require('./data/books');

const PORT = 7000 || process.env.PORT;



const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');



// endpoints here
const temphome = (req, res) => res.render('pages/fourOhFour', {title: "I AM HERE",path: req.originalUrl});
// const temphome = (req, res) => res.render('pages/fourOhFour', {title: "I AM HOME", path: req.originalUrl});
const top50page = (req, res) => res.render('pages/top50', {title: "Top 50 Songs Streamed on Spotify", top50: top50});
const topArtist = (req, res) => res.render('pages/topArtist', {title: "Top Artist Streamed on Spotify", top50: top50});
const allTheseBooks = (req, res) => res.render('pages/books', {title: "25 Earth-books", books: books, genre: 'all'});
const fictionBooks = (req, res) => res.render('pages/books', {title: "Fictional Earth-books", books: books, genre: 'fiction'});
const nonfictionBooks = (req, res) => res.render('pages/books', {title: "Not-so-fictional Earth-books", books: books, genre: 'non-fiction'});
const dramaBooks = (req, res) => res.render('pages/books', {title: "Dramatic Earth-books", books: books, genre: 'drama'});
const graphicnovelBooks = (req, res) => res.render('pages/books', {title: "Graphic Earth-books", books: books, genre: 'graphic-novel'});

app.get('/', temphome)
app.get('/top50', top50page)
app.get('/topArtist', topArtist)
app.get('/books', allTheseBooks)
app.get('/books/fiction', fictionBooks)
app.get('/books/nonfiction', nonfictionBooks)
app.get('/books/drama', dramaBooks)
app.get('/books/graphic-novel', graphicnovelBooks)

app.get('/top50/:number', (req,res) => {
    const test = req.params.number;
    if (test%1===0&&test<51&&test>0){
        res.render('pages/top50#', {
            number : req.params.number,
            top50: top50
        });
    }
    else {res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
})

app.get('/book/:number', (req,res) => {
    const test = req.params.number;
    if (test%1===0&&test<126&&test>100){
        res.render('pages/book#', {
            number : req.params.number,
            books: books
        });
    }
    else {res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
})

// handle 404s

app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));