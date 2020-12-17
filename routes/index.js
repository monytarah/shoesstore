const HomeController = require('../controllers/HomeController')
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.get('/', HomeController.home)
router.get('/register', HomeController.registerForm)
router.post('/register', HomeController.register)

router.get('/login', HomeController.loginForm)
router.post('/login', HomeController.login)

router.use(authentication)

router.get('/products', ProductController.showProducts)
router.get('/products/buy/:product_id', ProductController.buyProduct)
router.get('/products/delete/:product_id', ProductController.deleteProduct)

router.get('/transactions', ProductController.transaction)
router.get('/logout', ProductController.logout)

module.exports = router