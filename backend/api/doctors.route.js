import express from "express"
import DoctorsController from "./doctors.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(DoctorsController.apiGetDoctors)
router.route("/id/:id").get(DoctorsController.apiGetDoctorById)
router.route("/city").get(DoctorsController.apiGetDoctorCities)
router.route("/type").get(DoctorsController.apiGetDoctorTypes)

router
    .route("/review")
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)

export default router



