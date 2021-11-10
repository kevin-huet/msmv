const mongoose = require('mongoose')
const [,, ...args] = process.argv
const Roles = [
    'ROLE_USER',
    'ROLE_ADMIN'
]
const User = require('../models/user.model')
require('dotenv').config()

changeRole(args).then(r => process.exit(1)).catch(err => process.exit(0))


async function changeRole(args) {
    if (!args[0] || !args[1] || Roles.indexOf(args[1]) === -1) {
        console.log('ERROR: Use your command like this patern:\n' +
            '\tchange-role yourEmail@mail.com ROLE_\n\n' +
            'All of this roles is allowed: ROLE_USER, ROLE_ADMIN')
        return false
    }
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    await mongoose.connection.once('open',function(){
        console.log('Connected to Mongo')
    }).on('error',function(err) {
        console.log('Mongo Error', err)
    })
    await User.findOneAndUpdate({ email: args[0] }, { role: args[1] })
    console.log('role changed')
    return true
}
