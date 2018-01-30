var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    usr_key : {type : String, unique :true},
    usr_fname : {type : String },
    usr_lname : {type : String},
    usr_password : { type : String},
    usr_stauts : { type : String, default : 'AC' }
});

module.exports = mongoose.model("Users", UsersSchema);