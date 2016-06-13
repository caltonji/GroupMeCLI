#!/usr/bin/env node
var path = require('path');
var readline = require('readline');

var pkg = require( path.join(__dirname, 'package.json') );

var currentGroup = 344;
var defaultMessageNum = 10;
var apiservice = require('./apiservice.js');


// Initialize readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var AliveStates = {
    GROUPS_NOT_FOUND : 0,
    GROUPS_FOUND : 1,
    GROUPS_FOUND_AND_IN_GROUP : 2
};

var state = AliveStates.GROUPS_NOT_FOUND;
var currentGroupIndex = null;
var groupList = null;

rl.setPrompt('GROUPME> ');

//start by getting the user's groups (only do this once)
console.log("Preparing the groupme CLI app...")
apiservice.getGroups(function(groups) {
    if (!groups) {
        console.log("Something went wrong with getting your groups.  Check if the token in the config is correct.");
        rl.close()
    } else {
        groupList = groups;
        state = AliveStates.GROUPS_FOUND;
        rl.prompt();
    }
});

rl.on('line', function(line) {
    //remove the whitespace on either sides and duplicate white spaces
    command = line.trim().replace(/\s{2,}/g, ' ');

    //grab the individual words for different show commands
    var words = command.split(" ");

    //check the input
    if (command == "stop") {
        console.log("closing the program.");
        rl.close();
    } else if (words[0] == "show" && words[1] == "groups") {
        if (groupList) {
            if (groupList.length >= 0) {
                groupList.forEach(function(group, index) {
                    console.log(index.toString() + "    " + group.name);
                });
            } else {
                console.log("You are in zero groups.");
            }
        } else {
            console.log("Something went wrong. The developers didn't think this message would ever actually print they just added it in case they missed an edge case.");
        }
        rl.prompt();
    } else if (words[0] == "use") {
        //shouldn't have to null check this but you know how it is
        if (groupList) {
            var index = parseInt(words[1]);

            if (isNaN(index) || (index < 0) || (index >= groupList.length)) {
                console.log("use requires valid index value, run show groups to see valid index values.");
            } else {
                //switch to this group
                currentGroupIndex = index;
                state = AliveStates.GROUPS_FOUND_AND_IN_GROUP;
                console.log("Switched to group " + groupList[currentGroupIndex].name + ".  Now showing incoming message from this group.");
            }
        }
        rl.prompt();
    } else if (words[0] == "show" && words[1] == "messages") {
        if (state == AliveStates.GROUPS_FOUND_AND_IN_GROUP) {
            console.log("not implemented yet but it's working properly.");
        } else {
            console.log("Not in a group.  Run use <index> to choose which group to show messages for.")
        }
        rl.prompt();
    } else if (command == "help") {
        console.log("        show groups                 list your groups");
        console.log("        show messages               show 5 most recent messages in current group");
        console.log("        use <groupIndex>            switch current group");
        console.log("        stop                        close the program (can also press ctrl-c)");
        console.log("        help                        show this message");
        rl.prompt();
    } else {
        console.log(command + " is not a valid command.  Type help to see valid commands.");
        rl.prompt();
    }
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

setInterval(function() {
    if (state == AliveStates.GROUPS_FOUND_AND_IN_GROUP) {

    }
    // console.log("\n yo yo yo");
    // rl.prompt();
}, 3000);




var showGroups = function() {
    console.log("TODO: fill out showGroups function.");
    apiservice.getGroups(function(groups) {
        console.log(groups);
    });
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


// program
//     .version(pkg.version)
    
// program
//     .command('show')
//     .description('show your groups')
//     .action(showGroups);

// program
//     .command('use <group_id>')
//     .description('switch to a new group')
//     .action(switchGroups)

// program
//     .command('messages')
//     .description('show recent messages for your current group')
//     .action(showMessage)
//     .option('-n, --num <num>', 'Number of messages to show', parseInt);

// program
//     .command('send [words...]')
//     .description('Send a message to you current group')
//     .action(function (words) {
//         message = words.join(' ');
//         sendMessage(message);
//     });

// program
//     .command('like <message_id>')
//     .description('Like a message.')
//     .action(likeMessage);

// program
//     .parse(process.argv);
