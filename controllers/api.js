const express = require('express')
const	{statuses} = require('../errors')

module.exports = class ApiCtrl{
	constructor(){
		this.router = express.Router()
	}

	response(cb){
		return async (req, res)=>{
			let
				status = 200,
				data
			try{
				data = await cb.call(this, req, res) || 'OK'
			}	catch(e){
				[data, status] = [e.message, statuses[e.name] || 500]
			}
			res.status(status).send(data)
		}
	}
}