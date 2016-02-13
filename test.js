var token = "";
// const readline = require("readline");
var request = require('request');
var moment = require('moment');
var groupIDs = {}
var curGroup = 1;


getGroups(function(g) {
    groupIDs = g;
    console.log(groupIDs);
    getMessages(groupIDs[curGroup])
    sendMessage(groupIDs[curGroup],"Test: Rohan Likes Men")
});


function getGroups(callback){
    var addr = "http://api.groupme.com/v3/groups?token=" + token;
    request({
        uri: addr,
        method: "GET",
        timeout: 5000
    }, function(error, response, body) {
        if (error) {
            console.log(error)
        } else {
            var myGroups = [];
            var gID = {}
            groups = JSON.parse(response["body"])["response"]
            groups.forEach(function(element, index, arr2) {
                gID[index] = element.group_id;
                group = {name: element.name, id: index};
                myGroups.push(group);
            })
            console.log(myGroups)
            callback(gID)//need to return this
        }
    });
}

function getMessages(groupID, callback){
    var addr = "http://api.groupme.com/v3/groups/" + groupID + "/messages?token=" + token;
    request({
        uri: addr,
        method: "GET",
        timeout: 5000
    }, function(error, response, body) {
        if (error) {
            console.log(error)
        } else {
            var myMessages = [];
            msgs = JSON.parse(response["body"])["response"]["messages"]

            msgs.forEach(function(element, index, arr2) {
              //   var d = new Date(element.created_at)
              // //   var dformat = [d.getMonth()+1,
              // //  d.getDate(),
              // //  d.getFullYear()].join('/')+' '+
              // // [d.getHours(),
              // //  d.getMinutes()].join(':');
              //   var t = moment(element.created_at).format('MMMM Do YYYY, h:mm:ss a');
              //   console.log(t)
                msg = {creator: element.name, text: element.text, likes: element.favorited_by.length}
                myMessages.push(msg)
            });

            myMessages.reverse();

            console.log(myMessages)
        }
    });
}

//TODO:not working properly yet
function sendMessage(groupID, msg, callback){
    var addr = "http://api.groupme.com/v3/groups/" + groupID + "/messages?token=" + token;
    console.log(addr)
    request({
        uri: addr,
        method: "POST",
        timeout: 5000,
        message: {
             "text": "hello world",
        }
    }, function(error, response, body) {
        if (error) {
            console.log("something went wrong")
            console.log(error)
        } else {
            console.log(body)
            // var myMessages = [];
            // msgs = JSON.parse(response["body"])["response"]["messages"]

            // msgs.forEach(function(element, index, arr2) {
            //   //   var d = new Date(element.created_at)
            //   // //   var dformat = [d.getMonth()+1,
            //   // //  d.getDate(),
            //   // //  d.getFullYear()].join('/')+' '+
            //   // // [d.getHours(),
            //   // //  d.getMinutes()].join(':');
            //   //   var t = moment(element.created_at).format('MMMM Do YYYY, h:mm:ss a');
            //   //   console.log(t)
            //     msg = {creator: element.name, text: element.text, likes: element.favorited_by.length}
            //     myMessages.push(msg)
            // });

            // myMessages.reverse();

            // console.log(myMessages)
        }
    });
}
