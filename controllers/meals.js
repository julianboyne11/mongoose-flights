import { Meal } from "../models/meal.js"

function newMeal(req, res) {
  Meal.find({})
  .then(meals => {
    res.render("meals/new", {
      title: "Add Meal",
      meals,
    })
  })
}

function create(req, res) {
  console.log(req.body);
  
}


export {
  newMeal as new,
  create,
}