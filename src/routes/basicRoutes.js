const {loginRequired} = require('../controllers/authController');

function basicRoutes(app) {
    
    app.get('/', function(req, res){
        res.status(200).render('index');
    });

    app.get('/feed', loginRequired, function(req, res){
        res.status(200).render('feed');
    });

    
}

module.exports = basicRoutes;
