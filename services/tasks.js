const 
	redis = require('redis')
	pendingTasks = redis.createClient()
	completedTasks = redis.createClient()

let id = 0

completedTasks.subscribe("completed_tasks")
completedTasks.on('message', (channel, taskId)=>{
	console.log(`Task ${taskId} completed`)
})

const generate = (from, to, format)=>{
	pendingTasks.publish('pending_tasks', JSON.stringify({from, to, format, id: id++}))
}

module.exports = {generate}