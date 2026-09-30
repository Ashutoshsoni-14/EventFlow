const sendBookingConfirmation = async (data) => {
  console.log("\n📧 BOOKING CONFIRMATION");
  console.log("------------------------");
  console.log(`Booking ID: ${data.bookingId}`);
  console.log(`User ID: ${data.userId}`);
  console.log("Message: Your booking has been confirmed!");
  console.log("------------------------\n");
};

const sendBookingCancellation = async (data) => {
  console.log("\n📧 BOOKING CANCELLATION");
  console.log("------------------------");
  console.log(`Booking ID: ${data.bookingId}`);
  console.log(`User ID: ${data.userId}`);
  console.log(
    "Message: Your booking could not be completed."
  );
  console.log("------------------------\n");
};

module.exports = {
  sendBookingConfirmation,
  sendBookingCancellation
};