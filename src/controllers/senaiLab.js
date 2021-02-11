class SenaiLab {
    index(req, res) {
        res.render('SenaiLab/senaiLab', { layout: 'senaiLab.hbs' })
    }
}


module.exports = new SenaiLab