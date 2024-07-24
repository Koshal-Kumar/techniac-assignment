const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    Question : {
        type : String,
        required : true
    },
    options : {
        type :String,
        required : true
    },
    answer : {
        type :String,
        required : true
    }

})

const Quiz = mongoose.model('quiz' , quizSchema);
module.exports = Quiz;