const {hrLoginRequired} = require('../controllers/authController');

function hrRoutes(app){
    
    app.route('/hr-panel')
        .get(hrLoginRequired,function(req, res){
            res.status(200).render('hr-panel');
        });

    app.route('/available-exams')
    .get(hrLoginRequired,function(req, res){
        res.status(200).render('available-exams');
    });

        
};


module.exports = hrRoutes;
