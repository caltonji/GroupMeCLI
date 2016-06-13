var apiService = {};

//includes
apiService.request = require('request');
apiService.moment = require('moment');
apiService.configs = require('./configs.js');

//constants
var TOKEN = apiService.configs.token;

apiService.arbitraryTestFunction = function() {
    console.log('yo');
};

apiService.getGroups = function(callback) {
    var addr = "http://api.groupme.com/v3/groups?token=" + TOKEN;
    apiService.request({
        uri: addr,
        method: "GET",
        timeout: 5000
    }, function(error, response, body) {
        if (error) {
            console.log(error)
        } else {
            var groups = [];
            if (response && response.body) {
                groupsResponse = JSON.parse(response["body"])["response"];
                //shouldn't have to check null unless they change api
                if (groupsResponse) {
                    groupsResponse.forEach(function(element, index, arr2) {
                        group = {name: element.name, groupId: element.group_id};
                        groups.push(group);
                    });
                    callback(groups);
                } else {
                    callback(groups);
                }
            } else {
                callback(null);   
            }
            
        }
    })
};

apiService.getMessage = function(groupID, callback) {
    var addr = "http://api.groupme.com/v3/groups/" + groupID + "/messages?token=" + TOKEN;
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
};

//assign self to module.exports
module.exports = apiService;
