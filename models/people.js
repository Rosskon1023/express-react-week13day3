const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
    uId: {
        type: String,
        default: 'cdOpaKerdKW0aU63DxW23zvgWVo1'
    }
});

const People = mongoose.model("People", PeopleSchema);

module.exports = People;