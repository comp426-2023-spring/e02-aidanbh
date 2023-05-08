import express from 'express'
export const app = express.Router()

// parse URLEncoded and JSON req body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

import { rps, rpsls } from './lib/rpsls.js'

// main endpoint

app.get('/app/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.status(200).send("200 OK")
})

// single player functions

app.get('/app/rps/', (req, res) => {
 res.set('Content-Type', 'application/json')
 res.status(200).send(rps())
})

app.get('/app/rpsls/', (req, res) => {
 res.set('Content-Type', 'application/json')
 res.status(200).send(rpsls())
})

// POST multi-player methods

app.post('/app/rps/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rps(req.body.shot))
})

app.post('/app/rpsls/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rpsls(req.body.shot))
})

// GET urlencoded multi-player methods

app.get('/app/rps/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rps(req.query.shot))
})
  
app.get('/app/rpsls/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rpsls(req.query.shot))
})

// URL param multi-player methods

app.get('/app/rps/play/:shot', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rps(req.params.shot))
})

app.get('/app/rpsls/play/:shot', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rpsls(req.params.shot))
})

// handle requests not matching any route

app.use((req, res, next) => 
{
  res.set('Content-Type', 'text/plain')
  res.status(404).send("404 NOT FOUND")
})

export default app