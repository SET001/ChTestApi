const	{keys, map, toPairs, head, filter} = require('ramda')

const messages = {
	wrongUser: user => `No such user: ${user}`,
	wrongPassword: () => `Password invalid`,
	sourceConnection: () => `Can't connect to data source`,
	badCredentials: () => 'Bad credentials',
	wrongJWT: ()=> 'Wrong JWT',
}

const statuses = {
	badCredentials: 403,
	wrongJWT: 403
}

const groups = {
	badCredentials: ['wrongPassword', 'wrongUser']
}

const errors = map((em)=>{
	const findGgroups = msg => filter(
		group => group.includes(msg),
	groups)
	const g = toPairs(findGgroups(em.name))

	if (g.length){
	  const groupName = head(head((g)))
	  em = messages[groupName]
	}

	const name = em.name
	return (...args) =>{
		const error = new Error(em.apply(this, args))
		error.name = name
		return error
	}
}, messages)

module.exports = {errors, messages, statuses}