const PollService = require('../service/PollService')
const fs = require('fs')
const { Router } = require('express')
exports.getPolls = async (req, res) => {
  /// Read file from poll collection
  try {
    const polls = await PollService.readPoll()
    console.log(polls)
    res.status(200).json({
      status: 'OK',
      data: polls,
    })
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    })
  }
}

exports.createPoll = async (req, res) => {
  //// get poll data from body request
  const pollBody = req.body
  let newPoll
  let newId
  //// Read file from poll collection
  const polls = await PollService.readPoll()
  //// check if poll collection is empty
  if (polls.length === 0) {
    //// assert new poll with id by increamenting 1
    newId = 1
  } else {
    newId = polls[polls.length - 1].id + 1
  }
  newPoll = PollService.createNewPoll(newId, pollBody)
  /////push new poll to old poll
  polls.push(newPoll)

  ///// wrtie file to poll collection
  await PollService.writePoll(polls)
  res.status(201).json({
    status: 'OK',
    data: newPoll,
  })
}
exports.getPoll = async (req, res) => {
  try {
    //Step 1 : Get ID poll from params
    const searchPollId = req.params.pollId * 1
    //Step 2 : Check if Poll Id is exist in Poll collection
    const polls = await PollServices.readPoll()
    const foundPoll = polls.find(poll => poll.id === searchPollId)
    if (!foundPoll) {
      return res.status(404).json({
        message: 'Sorry this poll ID does not exist',
      })
    }
    res.status(200).json({
      status: 'OK',
      data: foundPoll,
    })
  } catch (err) {
    res.status(500).json({
      status: 'ERROR',
      message: err.message,
    })
  }
}
exports.updatePoll = async (req, res) => {
  const polls = await PollService.readPoll()
  const id = req.params.Id * 1

  try {
    const pollUpdate = polls.find(poll => poll.id === id)

    if (!pollUpdate) {
      return res.status(404).json({
        status: 'not Found',
      })
    }
    const newUpdate = polls.map(poll => {
      if (poll.id === id) {
        return {
          ...poll,
          question: req.body.question,
          options: req.body.options,
        }
      }
      return poll
    })
    console.log(newUpdate)
    fs.writeFileSync(
      `${__dirname}/../data/poll.json`,
      JSON.stringify(newUpdate),
    )

    res.send('hi')
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    })
  }
}

exports.deletePoll = async (req, res) => {
  try {
    const searchId = req.params.pollId * 1
    const poll = await PollService.readPoll()
    const selectPollId = poll.filter(poll => poll.id !== searchId)

    await PollService.writePoll(selectPollId)
    return res.status(204).json()
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    })
  }
}

exports.trendingVote = async (req, res) => {
  try {
    //Step 1 read data from vote
    const polls = await Pollservice.readPoll()
    //Step 2 total the votes
    const totalVotesPolls = poll.map(poll => ({
      ...poll,
      totalVotesPolls: poll.option.reduce((prev, curr) => prev + curr.count, 0),
    }))
    //Step 3 sort by accending the total vote
    const trendingPolls = totalVotesPolls.sort(
      (a, b) => b.totalVotes - a.totalVotes,
    )

    res.status(200).json({
      status: 'OK',
      data: trendingPolls,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    })
  }
}

exports.createVote = async (req, res) => {
  try {
    const topicId = req.params.pollId * 1
    const optionId = req.body.id
    //read data from poll collection
    const polls = await PollServices.readPoll()
    //Find topic is existed in poll colledction
    const foundTopic = polls.find(topic => topic.id === optionId)
    if (!foundTopic) {
      return res.status(404).json({
        status: 'failed',
        message: `Poll ${topicId} is not found`,
      })
    }
    //Find option is exited in the topic
    const foundOption = foundTopic.options.find(
      option => option.id === optionId,
    )
    if (!foundOption) {
      return res.status(404).json({
        status: 'failed',
        message: `Poll  is not found`,
      })
    }
    /// if option is exited in the topic count+1
    foundOption.count += 1

    //replace  poll with the new poll upadted
    polls.map(poll => {
      if (poll.id === foundTopic) {
        return foundOption
      }
      return poll
    })
    await PollService.writePoll(polls)

    res.status(201).json({
      status: 'ok',
      data: foundOption,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    })
  }
}
