document.addEventListener('DOMContentLoaded', () => {
  // Add an event listener to all "CHECK" buttons
  document.querySelectorAll('.check-btn').forEach(button => {
      button.addEventListener('click', async function(event) {
          event.preventDefault();

          // Get the event name from the data attribute
          const eventName = this.dataset.event;
          const userName = this.dataset.username;

          try {
              // Send an AJAX request to the server to generate QR code
              const response = await fetch(`/generateQR?event=${eventName}`);
              const qrCodeData = await response.json();

              // Display the QR code data in the QR code container
              // alertWithQR(qrCodeData.qrCode);
              document.getElementById('qr-code-container').innerHTML = qrCodeData.qrCode;
              
          } catch (error) {
              console.error('Error generating QR code:', error);
          }
      });
  });
});
