const { Product, User, Transaction } = require('../models')

class ProductController {
    static showProducts(req, res) {
        // console.log(req.session.username)
        Product.findAll({
            order: [['name', 'ASC']]
        })
            .then(data => {
                // console.log(data)
                // res.send(data)
                res.render('products', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    static buyProduct(req, res) {
        let id = +req.params.product_id
        let username = req.session.username
        let userId = +req.session.userId
        let inputTransaction = {
            UserId: userId, 
            ProductId: id, 
        }
        
        let productData
        Product.findByPk(id)
            .then(data => {
                // res.send(data)
                let newStock = data.stock - 1
                productData = data
                return Product.update({ 
                    stock: newStock
                }, {
                    where: { id }
                })
            })
            .then(data => {
                // res.redirect('/products')
                return Transaction.create(inputTransaction, productData)
            })
            .then(data =>{
                // res.send(data)
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteProduct(req, res) {
        let id = +req.params.product_id
        Product.destroy({ 
            where: { id }
        })
            .then(data =>{
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static transaction(req, res) {
        let UserId = req.session.userId
        Transaction.findAll({
            where: { UserId },
            include: [ Product ]
        })
            .then(data => {
                // console.log(data)
                // res.send(data)
                res.render('transactions', { data })
            })
            .catch(err => {
                res.send(err)
            })
    } 


    static logout(req, res) {
        req.session.destroy(err => {
            if(err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })   
    }

}

module.exports = ProductController