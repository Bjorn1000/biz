const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    repeats: {
        type: String,
        required: true
    },
    repeatEvery: {
        type: Number,
        required: true
    },
    repeatDays: {
        type: Array,
        required: true
    },
    startsOn: {
        type: Date,
        required: true
    },
    endsOn: {
        type: Object,
        required: true
    }
})

module.exports = Schdule = mongoose.model('schedule', ScheduleSchema);