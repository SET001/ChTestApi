const
	express = require('express')
	app = express()
	config = require('./config')
	bodyParser = require('body-parser')
	AuthCtrl = require('./controllers/auth')
	TasksCtrl = require('./controllers/tasks')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(new AuthCtrl().router)
app.use(new TasksCtrl().router)

app.listen(config.port, function () {
  console.log(`${config.name} is listening on ${config.port}!`)
})