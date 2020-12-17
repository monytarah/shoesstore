const { User, Transaction, Product } = require('../models')
const { compare } = require('../helpers/bcrypt')
const nodemailer = require('nodemailer')

class HomeController {
    static home(req, res) {
        res.render('home')
    } 

    static registerForm(req, res) {
        res.render('registerForm')
    }

    static register(req, res) {
        // res.send(req.body)
        let input = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email, 
            name: req.body.name
        }
        User.create(input)
            .then(data => {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'nodemailer05@gmail.com',
                      pass: 'testnodemailer'
                    }
                });
                let mailOptions = {
                    from: 'nodemailer05@gmail.com',
                    to: input.email,
                    subject: 'Registration Success',
                    text: 'Congratulations, your account has been succesfully created'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });


                res.redirect('/login')
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    let errors = []
                    for (let i = 0; i < err.errors.length; i++) {
                        errors.push(err.errors[i].message)
                    }
                    res.send(errors)
                } else {
                    res.send(err.errors[0].message)
                }
            })
    }

    static loginForm(req, res) {
        res.render('loginForm')
    }

    static login(req, res) {
        // res.send(req.body)
        let username = req.body.username
        let password = req.body.password
        User.findOne({ where: { username }})
            .then(data=> {
                // res.send(data)
                if (data) {
                    if (compare(password, data.password)) {
                        // res.send('Logged in successfully')
                        req.session.username = data.username
                        req.session.userId = data.id
                        res.redirect('/products')
                    } else {
                        res.send('Invalid password')
                    }
                } else {
                    res.send(`Can not find username.\nYou have to register first.`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = HomeController