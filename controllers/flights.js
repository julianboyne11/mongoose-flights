import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(error => {
    console.log(error);
    res.redirect("/")
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
    res.redirect("/")
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect("/flights")
  })
  .catch(error => {
    console.log(error);
    res.redirect("/")
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render("flights/edit", {
      flight,
      title: "Edit Flight"
    })
  })
  .catch(error => {
    console.log(error);
    res.redirect("/")
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error);
      res.redirect("/")
    })
  })
  .catch(error => {
    console.log(error);
    res.redirect("/")
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  createTicket,
}
