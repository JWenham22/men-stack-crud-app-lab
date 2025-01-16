
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', function(){
    console.log('Express has establised a connection with MongoDB.')
})

const Team = require('./models/team.js')

const teamSchema = new mongoose.Schema({
  name: String,
  isFavoriteTeam: Boolean,
})

const Teams = mongoose.model('Teams', teamSchema)
module.exports = Teams

app.get('/', function(req, res){
    res.render('index.ejs')
})

app.get('/teams/new', function(req, res){
    res.render('teams/new.ejs')
})

app.post('/teams', async function(req, res){

	
	console.log(req.body, " <- body of our request")
	if(req.body.isReadyToEat === 'on'){
		req.body.isReadyToEat = true
	} else {
		req.body.isReadyToEat = false
	}
	
	const teamDoc = await TeamModel.create(req.body)
	console.log(teamDoc)
	res.send('teams post route')
})


app.listen(3000, function(){
    console.log('Listening on Port 3000')
})