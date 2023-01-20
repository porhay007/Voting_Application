const express = require('express')
const PollController = require('../controller/PollController')
const router = express.Router()

//Sub routes
router.route('/').get(PollController.getPolls).post(PollController.createPoll)
router
  .route('/:pollId')
  .get(PollController.getPoll)
  .delete(PollController.deletePoll)
router.route('/:Id').patch(PollController.updatePoll)
router.route('/pollId/vote').post(PollController.createVote)
module.exports = router
