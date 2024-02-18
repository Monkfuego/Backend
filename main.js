document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the server after a successful login
  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Include any login credentials here if needed
  })
  .then(response => response.json())
  .then(data => {
    // Manipulate the DOM with the received data
    document.getElementById('regid').innerText = `Registration ID: ${data.username}`;
    document.getElementById('userid').innerText = `User ID: ${data.name}`;
    document.getElementById('eventFreq').innerText = `Events: ${data.events.join(', ')}`;
  })
  .catch(error => console.error('Error fetching data:', error));
});
function countFrequency(arr) {
  const frequency = {};

  // Loop through the array
  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];

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
  let result = "";
  for (const item in frequency) {
    result += `${item}: ${frequency[item]} times\n`;
  }
  return result;
}