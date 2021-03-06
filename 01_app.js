var express = require('express');
var app = express();
var util = require("util");
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
app.use(express.static('public'));
/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template
var util = require("util");
 const bodyParser= require('body-parser')
 app.use(bodyParser.urlencoded({extended: true}))

///////////////////////////////////// route accueil
app.get('/', (req, res) => {
 console.log('la route route get / = ' + req.url)
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
	 if (err) return console.log(err)
	 console.log('util = ' + util.inspect(resultat));
	 // transfert du contenu vers la vue index.ejs (renders)
	 // affiche le contenu de la BD
	 res.render('gabarit.ejs', {adresse: resultat})

 }) 
})

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
	if (err) return console.log(err)
	db = database.db('carnet_adresse')
	// lancement du serveur Express sur le port 8081
	app.listen(8081, () => {
	console.log('connexion à la BD et on écoute sur le port 8081')
	})
})

app.get('/adresse', (req, res) => {
 console.log('la route route get / = ' + req.url)
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('adresses.ejs', {adresses: resultat})
 }) 
})

app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/adresse')
 })
})

app.post('/modifier', (req, res) => {
 req.body._id=ObjectID(req.body._id)
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/adresse')
 })
})
/*
app.get('/detruire/:telephone', (req, res) => {

 db.collection('adresse')
 .findOneAndDelete( {'telephone': req.params.telephone} ,(err, resultat) => {
 if (err) return res.send(500, err)
 var cursor = db.collection('adresse').find().toArray(function(err, resultat){
 if (err) return console.log(err)
 res.render('gabarit.ejs', {adresse: resultat})
 })

}) 
})
*/

app.get('/detruire/:id', (req, res) => {
 var id = req.params.id 
// var critere = 'ObjectId("58bae3feaf5a674b240cfe53")'
// 58bae3feaf5a674b240cfe53
// var critere = ObjectID.createFromHexString(id)
var critere = ObjectID(req.params.id)
console.log(critere)
//console.log('util = ' + util.inspect(adresse));
console.log(id)
 db.collection('adresse')
 .findOneAndDelete({"_id": critere}, (err, resultat) => {

if (err) return console.log(err)
  res.redirect('/adresse')
 })
})
