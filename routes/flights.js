import { Router } from 'express'
import * as fligthsCtrl from "../controllers/flights.js"

const router = Router()

/* GET users listing. */
router.get("/new", fligthsCtrl.new)

export {
  router
}
