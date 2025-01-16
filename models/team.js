
const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
  })
  
  const Team = mongoose.model('Team', teamSchema)
  module.exports = Team