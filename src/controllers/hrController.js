const nodemailer = require('nodemailer');

const {TypeModel, PositionModel} = require('../models/hrModels');
const {AppReqModel} = require('../models/applicantModels');

function renderPositions(req, res){
    PositionModel.find({}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).render('available-positions', {positions:data});  
    });
}

function addNewPosition (req, res){
    let newPosition= PositionModel(req.body);
    newPosition.save(function(err, question){
        if(err)
            return res.status(400).send(err)
        return res.status(200).redirect('/available-positions');
    });
}

function deletePosition (req, res){
    PositionModel.deleteOne({_id:req.params.id}, function(err, data){
        if(err)            
            return res.status(400).send(err)
        return res.status(200).redirect('/available-positions');
    });
}

function renderRequests(req, res){
    AppReqModel.find(function(err, data){
        if(err)
            res.status(400).send(err);
        res.status(200).render('applicants_requests', {requests:data});
    });
}

function renderApproveReq(req, res){
    TypeModel.find({}, function(err, findedTypes){
        if(err)            
            return res.status(400).send(err);
        AppReqModel.findById(req.query.id, function(err, data){
            return res.status(200).render('approve_request', {types:findedTypes, request: data});
        })
    });
}

const transporter = nodemailer.createTransport({
    service: 'yahoo',
    secure: false,
    auth: {
        user: 'onlinetest1102@yahoo.com',
        pass: 'udgjyscbamobpwpd'
    }
});

function disApproveReq(req, res){
    AppReqModel.findById(req.query.id, function(err, data){
        if(err)
            return res.status(400).send(err);
        
        const mailOptions = {
            from: 'onlinetest1102@yahoo.com',
            to: data.applicant_id,
            subject: data.position_title,
            text: 'Sorry, Your application is disapproved by our HR, try again later Please!'
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                return res.status(400).send(err);
            }
        });
        AppReqModel.findByIdAndDelete(req.query.id, function(err, data){
            if(err)
                return res.status(400).send(err);
            return res.status(200).redirect('/applicants-requests');
        });
    });
}

module.exports = {
    renderPositions, addNewPosition, deletePosition, 
    renderRequests, renderApproveReq, disApproveReq
};
