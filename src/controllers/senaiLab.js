class SenaiLab {
    index(req, res) {
        res.render('SenaiLab/senaiLab', { layout: 'senaiLab.hbs' })
    }
    schedule(req, res){
        res.render('SenaiLab/schedule', { layout: 'senaiLab.hbs' })
    }
    register(req, res){
        
    }
    profile(req, res){
        res.render('profile/profile')
    }

}


module.exports = new SenaiLab