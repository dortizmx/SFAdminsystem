//Salesforces schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalesforcesSchema = new Schema({
    sf_key : {type : String, unique :true},
    sf_name : {type : String },
    sf_description : {type : String},
    sf_status : { type : String, default : 'AC' }
});

module.exports = mongoose.model("Salesforce", SalesforcesSchema);