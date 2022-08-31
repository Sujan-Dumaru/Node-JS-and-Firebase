const { db } = require("../util/admin");
const Chapter = require("../models/chapter.model")

exports.createChapter = async (req, res) => {
    try {
        const bookId = req.params.id;
        const chapterJson = {
            title: req.body.title,
            pages: req.body.pages,
        };

        db.collection("Books").doc(bookId).collection('Chapters').add(chapterJson);
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

/*
exports.getAllChapter = async (req, res) => {
    try {
        const bookId = req.params.id;
        const chapterRef = db.collection('Chapters');
        const data = await chapterRef.get();
        const chaptersArray = [];

        if (data.empty) {
            res.status(400).send("No records found!");
        } else {
            data.forEach(doc => {
            const chapter = new Chapter(
                doc.id,
                doc.data().title,
                doc.data().pages
            );
            chaptersArray.push(chapter);
        });
        res.send(chaptersArray);
        } 
    } catch (error) {
        return res.status(500)
        .json({ 
            general: "Something went wrong, please try again", 
            error: error.message
        });
    }
}
*/

exports.getChaptersOfBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const chapterRef = db.collection('Books').doc(bookId).collection('Chapters');
        const data = await chapterRef.get();
        const chaptersArray = [];

        if (data.empty) {
            res.status(400).send("No records found!");
        } else {
            data.forEach(doc => {
            const chapter = new Chapter(
                doc.id,
                doc.data().title,
                doc.data().pages
            );
            chaptersArray.push(chapter);
        });
        res.send(chaptersArray);
        } 
    } catch (error) {
        return res.status(500)
        .json({ 
            general: "Something went wrong, please try again", 
            error: error.message
        });
    }
}