const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true, unique:true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
		inventory:[
			{
			  inventory_name:{type:String ,default:'n/a'},
			  desc:{type:String, default:'n/a'},
			  date:{type:Date, default:Date.now()},
			  approx_val:{type:Number, default:0},
			  insurance_val:{type:Number, default:0},
			  photo:{type:String,default:'n/a'}
			}
		]
	},
	{ collection: 'userdata' }
)

const model = mongoose.model('UserData', User)

module.exports = model