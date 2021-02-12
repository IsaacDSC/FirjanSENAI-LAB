const fs = require('fs')
const path = require('path')
const folder = path.resolve(__dirname + '', '../', 'public', 'images', 'profile')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file, cb)
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
        if (file.mimetype == isAccepted[0] || file.mimetype == isAccepted[1] || file.mimetype == isAccepted[2]) {
            cb(null, folder)
        } else {
            return false
        }
    },
    filename: function(req, file, cb) {
        //function para contar arquivos
        fs.readdir(folder, (err, paths) => {
            //def nomes do arquivos
            cb(null, 'profile.png')
        })
    }
})
const upload = multer({
    storage,
    fileFilter: (req, res, cb) => {
        cb(null, true)
    }
})


module.exports = { upload }



// const fs = require('fs')
// const path = require('path')
// const folder = path.resolve(__dirname + '', '../', 'public', 'images', 'profile')
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         // console.log(file, cb)
//         const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
//         if (isAccepted.includes(file.mimetype)) {
//             cb(null, folder)
//         } else {
//             cb(false, { "error": "Os arquivos permitidos são " + isAccepted.join(", ") })
//         }
//     },
//     filename: function(req, file, cb) {
//         //function para contar arquivos
//         fs.readdir(folder, (err, paths) => {
//             //def nomes do arquivos
//             cb(null, 'profile.png')
//         })
//     }
// })
// const upload = multer({
//     storage,
//     fileFilter: (req, res, cb) => {
//         cb(null, true)
//     }
// })


// module.exports = { upload }
