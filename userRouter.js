const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


router.get('/', async(req, res) => {
    const user = await prisma.user.findMany();
    console.log('fetching user ', user);
    res.json(user);
})

router.post('/edit/:id', upload.single('editedProfileImage'), async(req, res) => {
    const { editedName, editedFirstName, editedLastName, editedPassword } = req.body;
    const userId = req.params.id;
    console.log('req.file', req.file)
    const editedImg = req.file.path;
    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: editedName,
            password: editedPassword,
            firstName: editedFirstName,
            lastName: editedLastName,
            profileImage: editedImg
        },
    })
    console.log('updated user ', updateUser);
    res.json(updateUser);
})
module.exports = router;