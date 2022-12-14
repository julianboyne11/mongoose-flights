import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

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
    res.redirect(`flights/${flight._id}`)
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
  .populate("meals")
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(foods => {
      res.render("flights/show", {
        title: "Flight Detail",
        flight: flight,
        foods: foods
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
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

function update(req, res) {
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
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

function deleteTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.remove({_id:req.params.ticketId})
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

function addToMeals(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.meals.push(req.body.foodId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  deleteTicket,
  addToMeals,
}
