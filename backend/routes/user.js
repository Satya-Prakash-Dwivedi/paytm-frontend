const express = require ("express")
const { get } = require("mongoose")
const {authMiddleware } = require("./middleware")

const userRouter = express.Router()

const zod = require("zod")
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

const signUpBody = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

userRouter.post("/signup", async(req, res) => {
    const {success}  = signUpBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "Email already taken/incorrrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "Email already taken/incorrect inputs."
        })
    }

    const user = await User.create({
        Username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })
    const userId = user._id

    /// create new account

    await Account.create({
        userId,
        balance: 1+ Math.random() * 10000
    })

    /// ------------------

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message : "User created successfully",
        token : token
    })
})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

userRouter.post("/signin", async(req, res) => {
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : "Email already taken / incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(user){
        const token = jwt.sign({
            UserId : user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional()
})

userRouter.put("/", authMiddleware, async(req, res) => {
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        })
    }
    
    await User.updateOne({_id: req.userId}, req.body)

    res.json({
        message : "Updated successfully"
    })
})

userRouter.get("/bulk", async(req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or : [{
            firstname : {
                "$regex" : filter
            },
            lastname: {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user : users.map( user => ({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id : user._id
        }))
    })
})

// The above code snippet gets the user details from backend using mongodb operator, either the firtname or lastname should match using the or operator with $regex, $regex in MongoDB is like a search tool that helps you find text patterns in your data, making it easier to locate information without needing the exact match.

module.exports = userRouter
/*
 validation = uses safeparse from zod to validate the request body. If validation fails it responds with a 411 status and an error message.

 check for existing user

 Create user

 Generate jwt = after creating the user, it generates a jwt using the user's ID and the secret key.

*/ 