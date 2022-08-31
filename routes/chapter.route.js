const express = require('express');
const { createChapter, getChaptersOfBook, getAllChapter } = require('../Services/chapterservice');

const router = express.Router();

router.post('/Book/:id/addChapter', createChapter);
router.get('/Book/:id/Chapters', getChaptersOfBook);
// router.get('/getAllChapters', getAllChapter);

module.exports = {
    routes: router,
};
