const Event = require("../models/event.model");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      venue,
      city,
      date,
      startTime,
      totalSeats
    } = req.body;

    if (
      !title ||
      !description ||
      !venue ||
      !city ||
      !date ||
      !startTime ||
      !totalSeats
    ) {
      return res.status(400).json({
        message: "All event fields are required"
      });
    }

    const event = await Event.create({
      title,
      description,
      venue,
      city,
      date,
      startTime,
      totalSeats,
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    res.status(200).json({
      count: events.length,
      events
    });
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json({
      event
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Update event error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    console.error("Delete event error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};