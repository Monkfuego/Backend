import user from "/server.js";

var name = user.name
var regid = user.username
var event = user.events
event_reg = countFrequency(event)
document.getElementById("regid").innerHTML = name
document.getElementById("userid").innerHTML = regid
document.getElementById("userid").innerHTML = event_reg

function countFrequency(arr) {
    var frequency = {};
  
    // Loop through the array
    for (var i = 0; i < arr.length; i++) {
      var currentItem = arr[i];
  
      // Check if the item is already in the frequency object
      if (frequency[currentItem] === undefined) {
        // If not, initialize the count to 1
        frequency[currentItem] = 1;
      } else {
        // If yes, increment the count
        frequency[currentItem]++;
      }
    }
  
    // Display the frequency of each item
    for (var item in frequency) {
      console.log(item + ": " + frequency[item] + " times");
    }
  }