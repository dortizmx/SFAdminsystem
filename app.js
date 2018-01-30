

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var methodOverride = require('method-override');

var Salesforce = require('./models/salesforces');
var sfController = require('./controllers/salesforces_repository');
var userMdl = require('./middlewares/authorization');

var app = express();





app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
app.use(methodOverride());

//Routes definitions
//Salesforces
routerSalesforces = express.Router();
app.use("/api/Salesforces", routerSalesforces);
//Zones 
routerZones = express.Router();
app.use('/api/zones', routerZones);



app.get("", (req, res)=>{
    res.status(400).send({ message : "You should use /api path"});
});


//login
routerSalesforces.route('/login').post(userMdl.createToken);

//Salesforces Routes
/*
routerSalesforces.get("/", (req, res)=>{ 
    res.status(200).send({ message : "Welcome to the SalesForces API"});
});*/
routerSalesforces.route('/').get(userMdl.verifyToken,sfController.findAllSalesforces)
routerSalesforces.route('/:id').get(sfController.findSalesforcebyId);
routerSalesforces.route('/').post(sfController.addSalesforce);
routerSalesforces.route("/name/:name").get(sfController.findSalesforcebyName);


//Zones Routes


app.listen(8099, ()=>{
    console.log("Application running at port 8099");
});

mongoose.connect("mongodb://localhost/sfadmindb", (err, res)=>{
    if (err) throw err;
    console.log("app connected to de DB");
});