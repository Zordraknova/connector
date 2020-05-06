const mongoose = require ('mongoose');
const config = require ('config');
const db = config.get('mongoURI')

// const connectDB= async()=>{
//     try{
// await mongoose.connect(db, { 
//          useNewUrlParser: true ,
//         useUnifiedTopology: true,
//         useCreateIndex: true });
//         console.log('You are now connected to Mongo!')
//     }catch(err){console.error (err.message);
//     process.exit(1)}
// }
// module.exports = connectDB;

// // Map global promises
// mongoose.Promise = global.Promise;
// // Mongoose Connect
// mongoose.connect( db,
// { 
//              useNewUrlParser: true ,
//             useUnifiedTopology: true,
//             useCreateIndex: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

 
module.exports= db;