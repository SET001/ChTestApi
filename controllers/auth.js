const {pickAll} = require('ramda')
	ApiCtrl = require('./api')
	Auth = require('../services/auth')

module.exports = class AuthCtrl extends ApiCtrl{
	constructor(){
		super()
		this.router.post('/login', this.response(this.login))
	}

	async login(req, res){
		const	{login, password} = pickAll(['login', 'password'], req.body)
		const user = await Auth.login(login, password)
		return Auth.createToken(user)
	}

}