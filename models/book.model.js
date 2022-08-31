// const firefose = require('firefose');
// const {Schema} = require('firefose');
// const {String, Number, Array} = require('firefose/types');
// const { model } = require('mongoose');

// const bookSchema = new Schema({
//     isbn: {type: String, required: true },
//     pages: {type: String, required: true },
//     title: {type: String, required: true },
// },{
//     timestamp: true
// });

// const book = firefose.model('book', bookSchema);
// model.exports = book;

class Book {
    constructor(id, isbn, pages, title){
        this.id = id;
        this.isbn = isbn;
        this.pages = pages;
        this.title = title;
    }
}

module.exports = Book;