function loginRequired(req,res,next){
    console.log(req)
    if(req.isAuthenticated()){
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports = loginRequired;