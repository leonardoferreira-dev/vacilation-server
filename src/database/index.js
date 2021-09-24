const mongoose = require('mongoose');

const uri = 'mongodb+srv://leonardo:MyVision2019@cluster0-k1ack.mongodb.net/VACILATION?retryWrites=true&w=majority';
// const uri = process.env.DB_URL

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
