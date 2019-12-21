const {hrLoginRequired} = require('../controllers/authController');
const {addNewExam, addNewType, getAllTypes, deleteType, viewType,renderQuestions, addNewQuestion, deleteQuestion, renderPositions, addNewPosition, deletePosition} = require('../controllers/hrController');
function hrRoutes(app){
    
    app.route('/hr-panel')
        .get(hrLoginRequired,function(req, res){
            res.status(200).render('hr-panel');
        });

    app.route('/available-exams-types')
        .get(hrLoginRequired,getAllTypes)
        .post(hrLoginRequired, addNewExam);

    app.route('/questions')
        .get(hrLoginRequired,renderQuestions)
        .post(hrLoginRequired,addNewQuestion);
    
    app.route('/question/delete/:id')
        .get(hrLoginRequired,deleteQuestion);

    app.route('/exam-type')
        .post(hrLoginRequired,addNewType)

    app.route('/exam-type/:id')
        .get(hrLoginRequired,viewType);

    app.route('/exam-type/delete/:id')
        .get(hrLoginRequired,deleteType);
    
    app.route('/available-positions')
        .get(hrLoginRequired, renderPositions)
        .post(hrLoginRequired, addNewPosition);
    
    app.route('/available-positions/delete/:id')
        .get(hrLoginRequired,deletePosition);
};


module.exports = hrRoutes;
