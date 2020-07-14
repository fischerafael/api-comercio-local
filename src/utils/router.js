const { Router } = require('express')
const verifyToken = require('../middleware/verifyToken')

const UserController = require('../controllers/UserController')
const UsersController = require('../controllers/UsersController')
const SessionController = require('../controllers/SessionController')
const UserInfoController = require('../controllers/UserInfoController')
const ProductController = require('../controllers/ProductController')

const router = Router()

router.post('/user', UserController.create)
router.put('/user/:user_id', verifyToken, UserController.update)
router.delete('/user/:user_id', verifyToken, UserController.delete)

router.get('/users', UsersController.read)
router.get('/user/:user_id', UserController.read)

router.post('/session', SessionController.create)

router.post('/userinfo/:user_id', verifyToken, UserInfoController.create)
router.put('/userinfo/:user_id', verifyToken, UserInfoController.update)
router.get('/userinfo/:user_id', UserInfoController.read)

router.post('/user/:user_id/product', ProductController.create)


module.exports = router
