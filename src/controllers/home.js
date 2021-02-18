class home{
    index(req, res){
        res.render('dashboard/home')
    }
    redirect(req, res){
        res.redirect('/SENAILAB')
    }
}


module.exports = new home