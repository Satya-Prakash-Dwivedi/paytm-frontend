import userRouter from "./user";
const express = require("express")
const router = express.Router();

router.use("/user", userRouter)

module.exports = router;


/*
 router is an instance of express Router , it is now a mini express application that can be used to handle routes. It allows to define routes in a separate file and then use them in main application file.
*/


