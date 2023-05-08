import express from 'express'
export const app = express.Router()

// parse URLEncoded and JSON req body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

import { rps, rpsls } from './rpsls.js'

// main endpoint

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.status(200).send("200 OK")
})

// single player functions

app.get('/rps/', (req, res) => {
 res.set('Content-Type', 'application/json')
 res.status(200).send(rps())
})

app.get('/rpsls/', (req, res) => {
 res.set('Content-Type', 'application/json')
 res.status(200).send(rpsls())
})

// POST multi-player methods

app.post('/rps/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rps(req.body.shot))
})

app.post('/rpsls/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rpsls(req.body.shot))
})

// GET urlencoded multi-player methods

app.get('/rps/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rps(req.query.shot))
})
  
app.get('/rpsls/play/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rpsls(req.query.shot))
})

// URL param multi-player methods

app.get('/rps/play/:shot', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.status(200).send(rps(req.params.shot))
})

app.get('/rpsls/play/:shot', (req, res) => {
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