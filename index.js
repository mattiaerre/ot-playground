var Hapi = require('hapi'),
    fs = require('fs'),
    moment = require('moment');

var server = new Hapi.Server();

var Core = require('./lib/person').Core;

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        var person = new Core.Person('mattia', 'richetto');
        console.log(person.fullName);

        var html = fs.readFileSync('./index.html').toString();
        html = html.replace('{model.now}', moment().format('HH:mm:ss DD/MM/YYYY'));
        reply(html);
    }
});

server.start(function () {
    console.log('server running at: ', server.info.uri);
});