const
	{allPass, propEq, pick, pathOr} = require('ramda')
	jwt = require('jsonwebtoken')
	config = require('../config')
const	{errors, messages, statuses} = require('../errors')
	mockUser = {
		login: 'admin',
		password: 'admin',
		dateCreated: Date.now()
	}

	publicUserFields = ['login', 'dateCreated']

const
	decodePassword = password => password
	checkLogin = login => propEq('login', login)
	checkPassword = password => propEq('password', decodePassword(password))
	checkCreds = (login, password) => allPass([
		checkLogin(login),
		checkPassword(password)
	])
	findUser = login =>
		new Promise((resolve, reject)=>{

			setTimeout(()=>{
				Math.round(Math.random())
					?	checkLogin(login)(mockUser)
						?	resolve(mockUser)
						: reject(errors.wrongUser(login))
					: reject(errors.sourceConnection(login))
		}, Math.random()*2000)
	})

const login = async (login, password) =>{
	const user = await findUser(login)
	if (!checkPassword(password)(user)){
		const error = new Error()
		error.name = 'badCredentials'
		throw errors.wrongPassword()
	}
	return pick(publicUserFields, user)
}

const createToken = user => {
	return jwt.sign(user, config.secret,  { expiresIn: config.tokenExpiration })
}

const validateToken = token => {
	return jwt.verify(token, config.secret)
}

const middleware = (req, res, next)=>{
	const token = pathOr('', ['headers', 'authorization'], req)
	try{
		req.userInfo = validateToken(token)
		next()
	} catch(e){
		res
			.status(statuses.wrongJWT)
			.send(messages.wrongJWT())
	}
}

module.exports = {login, createToken, middleware, validateToken}