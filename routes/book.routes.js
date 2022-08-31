const express = require('express');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../Services/bookservices');

const router = express.Router();

router.post('/createbook', createBook);
router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id', getBookById);
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);

module.exports = {
    routes: router
}