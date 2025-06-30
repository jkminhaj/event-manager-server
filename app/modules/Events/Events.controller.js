import Event from "./Events.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, name, dateTime, location, description , owner } = req.body;
    if (!title || !name || !dateTime || !location || !description || !owner) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newEvent = await Event.create({ title, name, dateTime, location, description , owner });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get event', error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const userId = req.body.userId;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.joinedUsers.includes(userId)) {
      return res.status(400).json({ message: 'You already joined this event' });
    }
    event.attendeeCount++;
    event.joinedUsers.push(userId);
    await event.save();
    res.json({ message: 'Joined event successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to join event', error: err.message });
  }
};

export const leaveEvent = async (req, res) => {
  try {
    const userId = req.body.userId;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.joinedUsers.includes(userId)) {
      return res.status(400).json({ message: 'You have not joined this event' });
    }

    event.joinedUsers = event.joinedUsers.filter(
      (id) => id.toString() !== userId.toString()
    );

    event.attendeeCount = Math.max(0, event.attendeeCount - 1);

    await event.save();

    res.json({ message: 'Left event successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to leave event', error: err.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.body.userId;

    const events = await Event.find({ owner: userId });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get your events', error: err.message });
  }
};

