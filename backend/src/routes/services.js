const express = require('express')
const dashboardController = require('../controllers/dashboardController')

const router = express.Router()
router.post('/', dashboardController.createService)
router.put('/:id/status', dashboardController.updateServiceStatus)
router.put('/:id', dashboardController.updateService)
router.put('/:id/review/', dashboardController.updateServiceReview)
router.put('/:id/date-charge/', dashboardController.updateServiceDate_Charge)

module.exports = router