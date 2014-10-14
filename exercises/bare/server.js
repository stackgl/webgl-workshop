module.exports = function createServer(answersDirectory) {
  return function requestHandler(req, res) {
    res.end('sample exercise')
  }
}
