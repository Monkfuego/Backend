import user from "/server.js";

var name = user.name
var regid = user.username
var event = user.events

document.getElementById("regid").innerHTML = name
document.getElementById("userid").innerHTML = regid
document.getElementById("userid").innerHTML = event