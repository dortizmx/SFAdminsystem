
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZonesSchema = new Schema({
    zn_key : {type : String, unique :true},
    zn_name : {type : String },
    zn_description : {type : String},
    zn_status : { type : String, default : 'AC' }
});

module.exports = mongoose.model("Zone", zonesSchema);