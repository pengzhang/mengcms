var Sequelize = require("sequelize");
var sequelize = require('../models')
var User = require('../models/user/user.js')


sequelize.sync().then(function(data) {
    console.log(data)
    User.create({
        'username': 'test',
        'nickname': 'test'
    }).then(function(created) {
        console.log(created)
        User.findOne({
            where: { id: 1 }
        }).then(function(results) {
            console.log(results)
        }).catch(function(err) {
            console.error(err)
        })
    }).catch(function(err) {
        console.error(err)
    })


})