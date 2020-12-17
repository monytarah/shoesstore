function authentication(req, res, next) {
    if (req.session.username){
        next()
    } else {
        res.send(`You need to login first`)
    }
}
module.exports = authentication