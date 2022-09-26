import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0}, 
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: String,
  airport: { 
    type: String,
    default: "DEN"
  },
  flightNo: {type: Number, match: /[1-9999]\d?/},
  departs: Date,
  tickets: [ticketSchema],
},{
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight,
}