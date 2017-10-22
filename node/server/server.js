const _           = require('lodash');
const config      = require('nconf');
const open        = require('open');
const notifier    = require('node-notifier');
const WebSocket   = require('ws');
const compression = require('compression');
const express     = require('express');
const app         = express();

app.use(compression());
app.use(express.static(`${__dirname}/../build`));

config.argv()
	.env({lowerCase: true})
	.file('environment', {file: `config/${process.env.NODE_ENV}.json`})
	.file('defaults', {file: 'config/default.json'});

const pageTemplate = require('./page.template.js');
const render = require('vitreum/steps/render');

app.get('*', (req, res)=>{
	render('main', pageTemplate, {
		url : req.url
	})
		.then((page)=>res.send(page))
		.catch((err)=>console.log(err));
});

const PORT = config.get('port');
app.listen(PORT);
console.log(`server on port:${PORT}`);

const wss = new WebSocket.Server({ port: 8080 });

const handleClientMessage = (message, client) => {
    console.log('Recieved message', message);
};

wss.on('connection', (ws) => {
    ws.on('message', handleClientMessage);
    
    //ws.send('something')
});

/*
notifier.notify({
    title: 'You are notified!',
    message: 'This is a notification.',
    wait: true,
    closeLabel: 'Dismiss',
    actions: 'Open',
}, (err, response, meta) => {
    if (response === 'activate') {
        open('http://www.google.com/');
    }
});
*/
