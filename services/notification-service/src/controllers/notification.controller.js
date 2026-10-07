const notificationsLog = [];

const sendBookingConfirmation = async (data) => {
  const notification = {
    id: `NOTIF-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type: "BOOKING_CONFIRMED",
    bookingId: data.bookingId,
    userId: data.userId,
    message: "Your booking has been confirmed!",
    timestamp: new Date()
  };

  notificationsLog.push(notification);

  console.log("\n📧 BOOKING CONFIRMATION");
  console.log("------------------------");
  console.log(`Booking ID: ${data.bookingId}`);
  console.log(`User ID: ${data.userId}`);
  console.log("Message: Your booking has been confirmed!");
  console.log("------------------------\n");
};

const sendBookingCancellation = async (data) => {
  const notification = {
    id: `NOTIF-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type: "BOOKING_CANCELLED",
    bookingId: data.bookingId,
    userId: data.userId,
    message: "Your booking could not be completed.",
    timestamp: new Date()
  };

  notificationsLog.push(notification);

  console.log("\n📧 BOOKING CANCELLATION");
  console.log("------------------------");
  console.log(`Booking ID: ${data.bookingId}`);
  console.log(`User ID: ${data.userId}`);
  console.log(
    "Message: Your booking could not be completed."
  );
  console.log("------------------------\n");
};

const getNotifications = async (req, res) => {
  try {
    res.status(200).json({
      count: notificationsLog.length,
      notifications: notificationsLog
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMyNotifications = async (req, res) => {
  try {
    const userNotifs = notificationsLog.filter((n) => n.userId === req.user.userId);
    res.status(200).json({
      count: userNotifs.length,
      notifications: userNotifs
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendBookingConfirmation,
  sendBookingCancellation,
  getNotifications,
  getMyNotifications
};