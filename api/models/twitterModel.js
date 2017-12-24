var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var twitterQuoteSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	created_at: Date,
  	updated_at: Date
})

twitterQuoteSchema.pre('save', function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;

	if(!this.created_at){
		this.created_at = currentDate;
	}
	next();
})

var Quotes = mongoose.model('Quotes', twitterQuoteSchema);

module.exports = Quotes;