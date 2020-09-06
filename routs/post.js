const router = require('express').Router()
const checkToken = require('./checkToken')
const Post = require('../model/post')
const User = require('../model/user')
const user = require('../model/user')
const multer = require('multer')
const { file } = require('googleapis/build/src/apis/file')

// const uploadLogo = multer({dest: 'logos/'})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './logos/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })

// const storageLogo = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'logos/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }


// }

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// })

// const uploadLogo = multer({
//     storage: storageLogo,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// })


router.get('/', async (req, res) => {
    try {
        const data = await Post.find().populate('userId', 'name email date _id')
        res.send(data);
    } catch (error) {
        res.send({ message: 'Something went wrong' })
    }
})

router.get('/post/:id', async (req, res) => {
    const id = req.params.id

    try {
        const data = await Post.findById(id).populate('userId', 'name email date _id')
        res.send(data);
    } catch (error) {
        res.send({ message: 'Something went wrong' })
    }
})

// random by fonts and numbers
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.post('/add', checkToken,/* upload.single('imgUrl'), uploadLogo.single('imgLogo'),*/ async (req, res) => {
    // console.log(req.file);
    const post = new Post({
        title: req.body.title,
        textArea: req.body.textArea,
        astxik: req.body.astxik,
        // imgUrl: req.file.path,
        // imgLogo: req.file.path,
        imgUrl: req.body.imgUrl,
        imgLogo: req.body.imgLogo,
        level: req.body.level,
        value: 1,
        questKey: makeid(7),
        userId: req.user
    })
    // var ids = await User.find().updateMany({userId: "5f460e44e7811b46c887ccb2"}, { $set: { doing: bonusIds }})
    // var ids = await zz.find({userId: "5f460e44e7811b46c887ccb2"}).select("userId value")  
    // var ids = await Post.find({userId: "5f460e44e7811b46c887ccb2"})
    // var ids = await User.updateMany({ doing: ids})

    try {
        const data = await post.save()
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
        // console.log(error);
        res.status(400).send({ message: 'Please try again' })

    }
    var ids = await Post.find({userId: "5f4723b6d3c68e001708f1d1"}).select('title userId value')
    var ids = await User.updateMany({ doing: ids})
})

router.delete('/del/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Post.findByIdAndDelete(id)
        // const data = Post.findOneAndDelete({title:""})
        res.send(data)

    } catch (error) {
        res.send({ message: 'Something went wrong' })

    }
})


//tnayin chi 
router.get('/user/:userId', checkToken, async (req, res) => {
    const userId = req.params.userId
    try {
        const data = await Post.find({ userId: userId }).populate('userId', 'name email date _id')
        res.send(data)
    } catch (error) {
        res.send({ message: 'Something went wrong' })
        console.log(error);
    }
})

router.get('/profile', checkToken, async (req, res) => {
    try {
        const data = await Post.find({ userId: req.user }).populate('userId', "name email _id date")
        res.send(data)
    }
    catch (error) {
        res.status(400).send({ message: "Plase try again" })
        console.log(error)
    }
})

router.patch('/update/:id', async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    try {
        const data = await Post.findOneAndUpdate({ _id: id }, { $set: { title: title } })

        res.send(data)
    } catch (error) {
        res.send({ message: 'Something went wrong' })
        console.log(error);
    }
})


// router.patch('/changeValue/:id', async (req, res) => {
//     const id = req.params.id
//     const value = req.body.value
//     try {
//         const data = await Post.findOneAndUpdate({ _id: id }, { $set: { value: value } })
//         res.send(data)
//     } catch (error) {
//         res.send({ message: 'Something went wrong' })
//         console.log(error);
//     }
// })

module.exports = router