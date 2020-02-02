const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
      await user.save();
      res.status(201).send({user})
    }catch(e){
      res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
  try{
    const users = await User.find({})
    res.status(201).send(users)
  }catch(e){
    res.status(400).send(e)
  }
})

router.get('/users/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("User not found")
    res.send(user)
  }catch(e){
    res.status(400).send(e)
  }
})

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperarion = updates.every((update) => allowedUpdates.includes(update))
  if(!isValidOperarion) return res.status(404).send({error: "Invalid updates"})
  try{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("User not found")
    updates.forEach((a) => user[a] = req.body[a])
    await user.save()
    res.send(user)
  }catch(e){
    res.status(400).send(e)
  }
})

router.delete('/users/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("User not found")
    await user.remove()
    res.send(user)
  }catch(e){
    res.status(500).send(e)
  }
})

module.exports = router