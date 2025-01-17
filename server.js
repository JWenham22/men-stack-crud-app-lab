
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', function(){
    console.log('Express has establised a connection with MongoDB.')
})

app.use(express.urlencoded({ extended: true }))

const Team = require('./models/team.js')

const teamSchema = new mongoose.Schema({
  name: String,
  isFavoriteTeam: Boolean,
})

const Teams = mongoose.model('Teams', teamSchema)
module.exports = Teams

const TeamModel = require('./models/team')

app.get('/', function(req, res){
    res.render('index.ejs')
})

app.get('/teams', async function(req, res){
	const allTeamDocs = await TeamModel.find({})
	console.log(allTeamDocs)

	res.render('teams/index.ejs', {teamDocs: allTeamDocs})
})

app.get('/teams/new', function(req, res){
    res.render('teams/new.ejs')
})

app.post('/teams', async function(req, res){

	
	console.log(req.body, " <- body of our request")
	if(req.body.isFavoriteTeam === 'on'){
		req.body.isFavoriteTeam = true
	} else {
		req.body.isFavoriteTeam = false
	}
	
	const teamDoc = await TeamModel.create(req.body)
	console.log(teamDoc)
	res.redirect('/teams')
})


app.listen(3000, function(){
    console.log('Listening on Port 3000')
})