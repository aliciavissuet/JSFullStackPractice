const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongoDB through mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.send("hello :)"));
//passport middleware

app.use(passport.initialize());

//passport config
require('./config/passport')(passport);
//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//server static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));