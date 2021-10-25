const mongoose = require('mongoose')
const [,, ...args] = process.argv
const Roles = [
    'ROLE_USER',
    'ROLE_ADMIN'
]
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
require('dotenv').config()

createUser(args).then(r => process.exit(1)).catch(err => process.exit(0))


async function createUser(args) {
    if (args.length < 5 || Roles.indexOf(args[4]) === -1) {
        console.log('ERROR: Use your command like this patern:\n' +
            '\tchange-role email firstname lastname password role\n\n' +
            'All of this roles is allowed: ROLE_USER, ROLE_ADMIN')
        return false
    }
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    await mongoose.connection.once('open',function(){
        console.log('Connected to Mongo')
    }).on('error',function(err) {
        console.log('Mongo Error', err)
    })
    const existUser = await User.findOne({ email: args[0] })
    if (existUser) {
        console.log('email already exist')
        return false
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(args[3], salt)
    await new User({
        email: args[0],
        firstname: args[1],
        lastname: args[2],
        password: hashPassword,
        role: args[4]
    }).save()
    console.log('user created')
    return true
}
