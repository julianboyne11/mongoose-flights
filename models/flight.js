import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema ({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0}
})

const flightSchema = new Schema({
  airline: String,
  airport: { 
    type: String,
    default: "DEN"
  },
  flightNo: Number,
  departs: Date,
  tickets: [ticketSchema],
},{
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export {
  Flight,
}