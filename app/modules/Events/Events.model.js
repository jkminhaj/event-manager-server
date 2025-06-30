import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    EventName: { type: String, required: true },
});

const Event = mongoose.model("Event", EventSchema);
export default Event;