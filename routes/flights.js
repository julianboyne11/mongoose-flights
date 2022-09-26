import { Router } from 'express'
import * as fligthsCtrl from "../controllers/flights.js"

const router = Router()

/* GET users listing. */
router.get("/", fligthsCtrl.index)
router.get("/new", fligthsCtrl.new)
router.get("/:id", fligthsCtrl.show)
router.get("/:id/edit", fligthsCtrl.edit)
router.post("/", fligthsCtrl.create)
router.post("/:id/tickets", fligthsCtrl.createTicket)
router.delete("/:id", fligthsCtrl.delete)

export {
  router
}
