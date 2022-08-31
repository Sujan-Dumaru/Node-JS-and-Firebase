var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const csrf = require('csrf');

const PORT = process.env.PORT || 5050

app.listen(PORT, function () {
    console.log(`Demo project at: ${PORT} !`);
});

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes.routes);

const bookRoutes = require('./routes/book.routes');
app.use('/api', bookRoutes.routes);

const chapterRoutes = require('./routes/chapter.route');
app.use('/api', chapterRoutes.routes);