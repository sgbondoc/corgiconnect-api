// require statements
const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')


router.post('/register', (request,response) => {
    const { name, email, password } = request.body
    if (!name || !email || !password) {
        return response.status(422).json({
            error: "Please enter a name, email, and password"})
    } 

    User.findOne({ email: email })
    .then((savedUser) => {
        if (savedUser) {
            return response.status(422).json({
                error: "A user with that email already exists"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                name,
                email,
                password: hashedpassword
            })
            user.save()
            .then(user => {
                response.json({message: "Saved successfully"})
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})        
      
    

module.exports = router