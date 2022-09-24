import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function create(req, res) {
  console.log(req.body);
  Flight.create(req.body)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(error => {
    console.log(error);
    res.redirect("/flights/new")
  })
}

function index(req, res) {
  Flight.find({})
  .then(flight => {
    res.render("flights/index", {
      title: "All Flights",
      flights: flight
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render("flights/show", {
      title: "Flight Detail",
      flight: flight
    })
  })
  .catch(error => {
    console.log(error);
    res.redirect("/flights")
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
}
