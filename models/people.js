const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
    uId: String,
});

const People = mongoose.model("People", PeopleSchema);

module.exports = People;