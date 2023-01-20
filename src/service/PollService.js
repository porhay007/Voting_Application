const { writeFile, readFile } = require('../utils/FileOpeator')
const pathname = `${__dirname}/../data/poll.json`
exports.readPoll = async function () {
  const polls = await readFile(pathname)
  return JSON.parse(polls)
}

exports.createNewPoll = function (newId, data) {
  return Object.assign({ id: newId }, data)
}
exports.writePoll = async function (data) {
  await writeFile(pathname, JSON.stringify(data))
}
