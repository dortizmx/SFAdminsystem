const jwt = require('jsonwebtoken');
const users = require('../models/users');

exports.verifyToken = function verifyToken(req, res, next){
    var bearerHeader = req.headers["authorization"];
    
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        jwt.verify(bearer, "company", (err, decoded)=>{
            if(err) return res.status(403).send({message : err});
            console.log(decoded);
            next();
        });
        next;
    }
    else {
        res.sendStatus(403);
    }
}

exports.createToken = function createToken(req, res){
    let usrkey = req.body.userkey;
    let usrpwd = req.body.password;
    console.log("entro");
    users.findOne({ usr_key : usrkey, usr_status : 'AC'}, (err, user)=>{
        if(err) return res.status(500).send({message : err});
        if(!user) return res.status(500).send({message : "usuario no encontrado"});
        jwt.sign({ user : user.usr_key },"company", (err, token)=>{
            let retvalue = { firstname : user.usr_fname, lastname : user.usr_lname, token : token }
            return res.json(retvalue);
        });
    
    });
}