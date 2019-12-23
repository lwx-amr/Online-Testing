const session = require('express-session');

const {PositionModel} = require('../models/hrModels');
const {AppReqModel} = require('../models/applicantModels');

function renderFeed (req, res, next){
    PositionModel.find({}, function(err, data){
        if(err)
             return res.status(400).send(err);
        res.status(200).render('feed', {positions:data});
    });
};

function renderPosition (req, res, next){
    var username = session.username.split("@"); 
    AppReqModel.countDocuments({position_id:req.query.id, applicant_id: username[0]}, function(err, data){
        if(data===1) // To Do not apply twise
            return res.status(200).redirect('/application_sent');
        
        PositionModel.findById(req.query.id, function (err, data){
            if (err)
                return res.status(400).send(err);
            return res.render('position', {position:data});
        });
    });
};

function uploadCV(req, res) {
    let newAppReq = AppReqModel(req.body);
    newAppReq.save(function(err){
        if(err)
            res.status(400).send(err);
        
        var file = req.files.applicant_cv,
            filename = req.body.applicant_id;
        file.mv("./public/uploads/" + filename + ".pdf", function(err){
            if(err)
                res.status(400).send(err)
            res.status(200).redirect('/application_sent');  
        }); 
    });
};

module.exports  = {renderFeed, renderPosition, uploadCV};
