# ChTestApi
## installation

- First clone both api and taskManager repos somewhere in same directory:

```
git clone https://github.com/SET001/ChTestApi
git clone https://github.com/SET001/chTestTaskManager
```

install npm packages for both:

```
cd ChTestApi
npm install
cd ../chTestTaskManager
npm install
```

you can use pm2 and following config to run them both at same time

```
module.exports = {
	apps: [
		{
			name: 'api',
			script: `${__dirname}/ChTestApi/index.js`,
		},
		{
			name: 'task_manager',
			script: `${__dirname}/chTestTaskManager/index.js`,
		}
	]
}
```


use POSTMAN to login
```
POST 127.0.0.1:3400/login
JSON body: {"login": "admin", "password": "admin"}
```

I added errors simulation so you may need few attemps. Finally this will get you a GWS token.
Use it as value for `Authorization` parameter in header to send POST to `127.0.0.1:3400/generate`

generate as many tasks as you want. Use `pm2 logs` to see the sequence in which they are finished.
They will finish in random time within 5 seconds.
