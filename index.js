#!/usr/bin/env node
var path = require('path');

var pkg = require( path.join(__dirname, 'package.json') );

var currentGroup = 344;
var defaultMessageNum = 10;

// Parse command line options

var program = require('commander');


var showGroups = function() {
    console.log("TODO: fill out showGroups function.");
}

var switchGroups = function(groupId) {
    groupId = parseInt(groupId);
    console.log('groupId: ' + groupId);
    console.log('TODO: fill our switch groups function.');
}

var showMessage = function(cmd) {
    var numMessages = cmd.num || defaultMessageNum;
    console.log("TODOL fill out show messages function");
    console.log("number messages: " + numMessages);
}

var sendMessage = function(message) {
    console.log("TODO: fill out sendMessage function.");
    console.log("message to send: " + message);
}

var likeMessage = function(message_id) {
    message_id = parseInt(message_id);
    console.log('message_id: ' + message_id);
    console.log("TODO: Fill out like Message function");
}


program
    .version(pkg.version)
    
program
    .command('groups')
    .description('show your groups')
    .action(showGroups);

program
    .command('use <group_id>')
    .description('switch to a new group')
    .action(switchGroups)

program
    .command('messages')
    .description('show recent messages for your current group')
    .action(showMessage)
    .option('-n, --num <num>', 'Number of messages to show', parseInt);

program
    .command('send [words...]')
    .description('Send a message to you current group')
    .action(function (words) {
        message = words.join(' ');
        sendMessage(message);
    });

program
    .command('like <message_id>')
    .description('Like a message.')
    .action(likeMessage);

program
    .parse(process.argv);

// .option('-n, --num <num>', 'Number of messages to return', parseInt);

// // print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

var port = program.port || 3000;

console.log("I think it's time for us to have a toast. port: " + port);
// console.log(program);