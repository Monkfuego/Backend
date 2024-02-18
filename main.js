document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/signin");
    const data = await response.json();

    document.getElementById("regid").textContent = data.name;
    document.getElementById("userid").textContent = data.username;

    const eventFreq = countFrequency(data.events);
    document.getElementById("eventFreq").textContent = eventFreq;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
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
