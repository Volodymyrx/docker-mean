const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/config')
const errorHandler = require('../utils/errorhanler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate){
        // user  email exist
        const passCompareResult = passComprare(req.body.password,candidate.password)
        if (passCompareResult){
            // user verificated // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            },config.jwt,{expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // wrong password
            res.status(401).json({
                message: "Wrong password. Try again."
            })
        }
    } else {
        // user not exist no login - error
        res.status(404).json({
            message: "User with this email not found"
        })
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        //user exist - no need register - return error
        res.status(409).json({
            message: 'This email is occupate, Try another email, please!'
        })
    } else {
        // will register new user
        const user = new User({
            email: req.body.email,
            password: passHasher(req.body.password)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (error) {
            errorHandler(res,error)
        }
    }
}

const passHasher=(pass)=>{
    return bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
}
const passComprare=(pass, passHash) =>{
    return bcrypt.compareSync(pass,passHash)
}
