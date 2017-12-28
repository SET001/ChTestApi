const
	{pickAll} = require('ramda')
	ApiCtrl = require('./api')
	Auth = require('../services/auth')
	TaskService = require('../services/tasks')

module.exports = class TasksCtrl extends ApiCtrl{
	constructor(){
		super()
		this.router.use(Auth.middleware)
		this.router.post('/generate', this.response(this.generate))
	}

	generate(req, res){
		const	{ from, to, format} = pickAll(['from', 'to', 'format'], req.body)
		TaskService.generate(from, to, format)
	}
}