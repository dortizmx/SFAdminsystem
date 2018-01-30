const mongoose = require('mongoose');
const moment = require('moment');
const salesforce = require('../models/salesforces');

exports.findAllSalesforces = function findAllSalesforces(req, res){
    salesforce.find((err, sf)=>{
        if(err) return res.status(500).send({message : err});
        res.status(200).jsonp(sf);
    })
}

exports.findSalesforcebyId = function findSalesforcebyId(req, res){
    let _id =  req.params.id;
    salesforce.find({ sf_key : _id}, (err, sf)=>{
        if(err) return res.status(500).send({message : err});
        res.status(200).jsonp(sf);
    });
}


exports.findSalesforcebyName = function findSalesforcebyName(req, res){
    let _name = req.params.name;
    let regexp = RegExp(_name, "i")
    salesforce.find({ sf_name : regexp}, (err, sf)=>{
        if(err) return res.status(500).send({message : err});
        res.status(200).jsonp(sf);
    });
}
exports.addSalesforce = function addSalesforce(req, res){
    let key = req.body.key;
    let name = req.body.name;
    let description = req.body.description;
    let sfr = new salesforce({
        sf_key : key,
        sf_name : name,
        sf_description : description
    })
    sfr.save((err, slf)=>{
        if(err) return res.status(500).send({message : err});
        res.status(200).jsonp(slf);
    });
}

