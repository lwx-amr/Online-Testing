const { hrLoginRequired } = require('../controllers/authController');
const { renderPositions, addNewPosition, deletePosition, renderRequests, renderApproveReq, disApproveReq} = require('../controllers/hrController');
const { renderQuestions, addNewQuestion, viewQuestion, deleteQuestion, editQuestion } = require('../controllers/questionsController');
const { addNewType, getAllTypes, deleteType, viewType, editType } = require('../controllers/typesController');
const { createExam } = require('../controllers/examsController');

function hrRoutes(app){
    
    app.get('/hr-panel', hrLoginRequired, function(req, res){ res.status(200).render('hr-panel');});

    // Exam Types
    app.get('/available-exams-types', hrLoginRequired,getAllTypes)

    app.route('/exam-type')
        .get(hrLoginRequired,viewType)
        .post(hrLoginRequired,addNewType)

    app.post('/exam-type-edit', hrLoginRequired, editType);

    app.get('/exam-type-delete', hrLoginRequired, deleteType);
    
    // Questions
    app.get('/all-questions', hrLoginRequired,renderQuestions)

    app.route('/question')
        .get(hrLoginRequired,viewQuestion)
        .post(hrLoginRequired,addNewQuestion);
    
    app.post('/question-edit', hrLoginRequired,editQuestion);

    app.get('/question-delete', hrLoginRequired,deleteQuestion);
    

    // Positions
    app.route('/available-positions')
        .get(hrLoginRequired, renderPositions)
        .post(hrLoginRequired, addNewPosition);
    
    app.get('/available-positions/delete/:id', hrLoginRequired,deletePosition);
    
    // Applicants Request and Exams
    app.get('/applicants-requests', renderRequests);
    
    app.get('/approve_request', renderApproveReq);

    app.get('/disapprove_request', disApproveReq);
    
    app.route('/exam')
        .post(hrLoginRequired, createExam);
};

module.exports = hrRoutes;
