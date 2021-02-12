const DATA = {
    username: '',
    logo: ''
}

const dataUser = (username, logo) => {
    DATA.username = username
    DATA.logo = logo
}



module.exports = { dataUser, DATA }