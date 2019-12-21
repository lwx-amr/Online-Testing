const {ExamModel, QuestionModel, TypeModel, PositionModel} = require('../models/examModels');

function renderQuestions(req, res){
    TypeModel.find({}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        QuestionModel.find({}, function(err, quests){
            if(err)            
                return res.status(400).redirect('/hr-panel');
            return res.status(200).render('questions', {quests:quests,types:data});  
        })
    });
}

function addNewQuestion (req, res){
    let newQuest= QuestionModel(req.body);
    newQuest.save(function(err, question){
        if(err)
            return res.status(400).redirect('/hr-panel');
        res.status(200).redirect('/questions');
    });
}

function deleteQuestion (req, res, next){
    QuestionModel.deleteOne({_id:req.params.id}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        return res.status(200).redirect('/questions');
    });
}

function renderPositions(req, res){
    PositionModel.find({}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');

        var positions = [
            {
                _id: '123',
                title: 'Software enginner',
                description: 'this is descirption'
            },
            {
                _id: '456',
                title: 'Database admin',
                description: 'this is descirption'
            }
        ];
        return res.status(200).render('available-positions', {positions:data});  
    });
}

function addNewPosition (req, res){
    let newPosition= PositionModel(req.body);
    newPosition.save(function(err, question){
        if(err)
            return res.status(400).redirect('/hr-panel');
        return res.status(200).redirect('/available-positions');
    });
}

function deletePosition (req, res, next){
    PositionModel.deleteOne({_id:req.params.id}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        return res.status(200).redirect('/available-positions');
    });
}

function addNewExam (req, res, next){
    let newExam = ExamModel(req.body);
    newExam.save(function(err, user){
        if(err)
            return res.status(400).redirect('/hr-panel');
        res.status(200).redirect('/available-exams-types');
    });
}


function addNewType (req, res, next){
    let newType= TypeModel(req.body);
    newType.save(function(err, user){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        res.status(200).redirect('/available-exams-types');
    });
}

function getAllTypes (req, res, next){
    TypeModel.find({}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        return res.status(200).render('available-exams-types', {types:data});
    });
}

function deleteType (req, res, next){
    TypeModel.deleteOne({_id:req.params.id}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        return res.status(200).redirect('/available-exams-types');
    });
}

function viewType (req, res, next){
    TypeModel.find({_id:req.params.id}, function(err, data){
        if(err)            
            return res.status(400).redirect('/hr-panel');
        return res.status(200).render('exam-type', {type:data[0]});
    });
}

module.exports = {addNewExam, addNewType, getAllTypes, deleteType, viewType, renderQuestions, addNewQuestion, deleteQuestion, renderPositions, addNewPosition, deletePosition};
