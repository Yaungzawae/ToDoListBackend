function handleError(err, next, no , yes){
    if(!err){
        no();
        next();
    } else {
        yes();
    }
}

module.exports = handleError