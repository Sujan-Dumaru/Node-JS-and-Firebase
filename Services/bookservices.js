const { db } = require("../util/admin");
const Book = require('../models/book.model');

exports.getAllBooks = async (req, res) => {
    const booksRef = db.collection('Books');
    const data = await booksRef.get();
    const booksArray = [];

    if (data.empty) {
        res.status(400).send("No records found!");
    } else {
        data.forEach(doc => {
            const book = new Book(
                doc.id,
                doc.data().isbn,
                doc.data().pages,
                doc.data().title
            );
            booksArray.push(book);
        });
        res.send(booksArray);
    } 
}

exports.getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await db.collection('Books').doc(id);
        const data = await book.get();
        if (!data.exists) {
            res.status(404).send('Record not found!');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        return res.status(500)
        .json({ 
            general: "Something went wrong, please try again", 
            error: error.message
        });
    }
}

exports.updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const book = await db.collection('Books').doc(id);
        await book.update(data);

        res.send('Record updated successfully!');
    } catch (error){
        return res.status(500)
        .json({ 
            general: "Something went wrong, please try again", 
            error: error.message
        });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        await db.collection('Books').doc(id).delete();
        res.send('Record deleted successfully!');
    } catch (error){
        return res.status(500)
        .json({ 
            general: "Something went wrong, please try again", 
            error: error.message
        });
    }
}

const books = async (req, res) => {
    const booksRef = db.collection('Books');

    try {
        booksRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log(data);
            return res.status(201).json(data);
        })
    } catch (error) {
        return res.status(500)
            .json({ 
                general: "Something went wrong, please try again", 
                error : error.message
            });
    }
}

exports.createBook = async (req, res) => {
    try {
        const bookJson = {
            isbn: req.body.isbn,
            pages: req.body.pages,
            title: req.body.title
        };

        db.collection("Books").doc().set(bookJson);
        return res.status(200).json({
            message: "Record added successfully!"
        });        
    } catch (error) {
        return res.status(500)
        .json({ 
            general: "Something went wrong, please try again", 
            error: error.message
        });
    }
}