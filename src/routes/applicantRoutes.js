const {loginRequired} = require('../controllers/authController');
const {renderFeed, renderPosition, uploadCV} = require('../controllers/applicantController');

function applicantRoutes(app) {

    app.get('/feed', loginRequired, renderFeed);

    app.get('/applicant-position',loginRequired, renderPosition);

    app.post('/cv_upload', loginRequired, uploadCV);

    app.get('/application_sent', function(req, res){
        res.status(200).render('application_sent');
    });
}

module.exports = applicantRoutes;
