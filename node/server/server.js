const _           = require('lodash');
const config      = require('nconf');
const open        = require('open');
const notifier    = require('node-notifier');
const WebSocket   = require('ws');
const compression = require('compression');
const express     = require('express');
const request     = require('request');
const app         = express();

app.use(compression());
app.use(express.static(`${__dirname}/../build`));

config.argv()
    .env({ lowerCase: true })
    .file('environment', { file: `config/${process.env.NODE_ENV}.json` })
    .file('defaults', { file: 'config/default.json' });

const pageTemplate = require('./page.template.js');
const render = require('vitreum/steps/render');

app.get('*', (req, res) => {
    render('main', pageTemplate, {
        url: req.url
    })
        .then((page) => res.send(page))
        .catch((err) => console.log(err));
});

const PORT = config.get('port');
app.listen(PORT);
console.log(`server on port:${PORT}`);

const wss = new WebSocket.Server({ port: 8080 });

const quizData = {};
const museData = {};

const handleClientMessage =

wss.on('connection', (ws) => {
    ws.on('message', (message, client) => {
        let msg;
        try {
            msg = JSON.parse(message);
        } catch (e) {
            console.log('Error parsing JSON:', e);
            return;
        }
        console.log('Recieved message', msg);

        if (msg.type === 'quiz') {
            const d = new Date;
            const timestamp = Math.round(d.getTime() / (1000 * 3600));
            const average = msg.value.reduce((sum, val) => { return sum + val;}, 0) / msg.value.length;
            museData[timestamp] = average;
            console.log('Quiz result:', timestamp, average);
        }

        if (msg.type === 'muse') {
            let timestamp = msg.firstTimestamp;
            _.forEach(msg.data, (datum) => {
                museData[timestamp] = datum;
                timestamp += 20;
            });
        }

        if (msg.type === 'client') {
            _.forEach(museData, (value, timestamp) => {
                if (timestamp <= msg.timestamp) {
                    return;
                }
                const reply = {
                    type: 'museValue',
                    timestamp: timestamp,
                    value,
                };
                ws.send(JSON.stringify(reply));
            });
            const reply = {
                type: 'quizValue',
                value: quizData,
            };
            ws.send(JSON.stringify(reply));
        }

    });

    //ws.send('something')
});


setInterval(() => {
    notifier.notify({
        title: 'You are notified!',
        message: 'This is a notification.',
        wait: true,
        closeLabel: 'Dismiss',
        actions: 'Open',
    }, (err, response, meta) => {
        if (response === 'activate') {
            open('http://localhost:8000/quiz');
        }
    });
}, 300000);

const formData = {
    from: 1508671000
};

setInterval(() => {
    notifier.notify({
        title: 'You are notified!',
        message: 'This is a notification.',
        wait: true,
        closeLabel: 'Dismiss',
        actions: 'Open',
    }, (err, response, meta) => {
        if (response === 'activate') {
            open('http://localhost:8000/quiz');
        }
    });
}, 300000);

const reqFunc = () => {
    request
        .post({ url: 'http://165.227.46.196:4245/get_data/', formData }, (err, response, body) => {
            if (err) {
                console.log('POST error', err);
                return;
            }
            let msg;
            try {
                msg = JSON.parse(body);
            } catch (e) {
                console.log('JSON error:', e);
                return;
            }
            console.log('Recieved', msg.data.length);
            let timestamp = msg.firstTimestamp;
                _.forEach(msg.data, (datum) => {
                    museData[timestamp] = datum;
                    timestamp += 20;
                });
        });
}

setInterval(reqFunc, 20000);
reqFunc();

