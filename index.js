require('dotenv').config();
const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
const port = 3000
const passport = require('passport');
const cors = require('cors');
const bcrypt = require('bcrypt')
app.use(express.json());
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOptions))
const userRouter = require('./userRouter')


// ...

app.use('/users', userRouter);

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: jwt_payload.sub,
            },
        });
        if (user) {
            console.log('user found')
            return done(null, user);
        } else {
            console.log('creating new user');
            return done(null, false);
        }
    } catch (e) {
        console.log('error finding user ', e.message);
        return done(e, false);
    }


}));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/signup', async(req, res) => {
    console.log('signup', req.body);
    const { name, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                username: name,
                password: hashedPassword,
            },
        })
        console.log('user registered successfully');
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({ message: 'Error signing up user ' });
    }


})


app.post('/login', async(req, res) => {
    console.log('login', req.body);
    const { name, password, id } = req.body;
    console.log('user id', id);
    const user = await prisma.user.findUnique({
        where: {
            id: req.body.userId
        },
    });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
    res.json({ message: 'Logged In successfully', token, user })

})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})