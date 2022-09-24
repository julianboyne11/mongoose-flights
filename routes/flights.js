import { Router } from 'express'
import * as fligthsCtrl from "../controllers/flights.js"

const router = Router()

/* GET users listing. */
router.get("/", fligthsCtrl.index)
router.get("/new", fligthsCtrl.new)
router.post("/", fligthsCtrl.create)

export {
  router
}
