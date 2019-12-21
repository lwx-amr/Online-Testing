const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const examSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});
const ExamModel = mongoose.model('exam',examSchema);


const questionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    answers: {type : Array}
});
const QuestionModel = mongoose.model('questions',questionSchema);


const positionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const PositionModel = mongoose.model('positions',positionSchema);


const typeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});
const TypeModel = mongoose.model('exam-type',typeSchema);

module.exports = {ExamModel, TypeModel, QuestionModel, PositionModel};
