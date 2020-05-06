const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const config = require('config');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const connectMongo = require('connect-mongo');
const mongoose = require ('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
// const expressSession = require('express-session');




//========middleware







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);





//======mongo

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
// mongoose.connect( 'mongodb+srv://root:root@cluster0-zjxmc.azure.mongodb.net/test?retryWrites=true&w=majority',
// { 
      mongoose.connect( 'mongodb://localhost:27017/connect',
    { 
            useNewUrlParser: true ,
            useUnifiedTopology: true,
            useCreateIndex: true })
  .then(() => console.log('MongoDB Connected '))
  .catch(err => console.log(err));
 


//   const mongoStore = connectMongo(expressSession);
//   app.use(expressSession({
//     secret: 'secret',
//     url:db,
//     autoRemove: 'native',
//     resave: true,
//     saveUninitialized: true,
//     store: new mongoStore({
//         mongooseConnection: mongoose.connection
//     })
// }));

//==========logger
if (app.get('env') == 'production') {
    app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 },
     stream: __dirname + './log//morgan.log' }));
  } else {
    app.use(morgan('dev'));
  }
  

app.listen(PORT, () => console.log( `  🚀 show must go on port ${PORT}`));