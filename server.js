const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/api/auth.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/posts.js');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;

//Body Parser middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CONNECT  TO MONGODB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello Big Guy!!!'));

//USE ROUTES
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server running on port ${port}`));

