module.exports = (io) => {
    require('./create')(io)
    require('./join')(io)
    require('./history')(io)
    require('./msg')(io)
}