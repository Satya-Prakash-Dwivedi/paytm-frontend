const express = require("express");
const rootRouter = require("./routes/index")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const app = express();

app.use("/api/v1", rootRouter)

app.listen(3000, () => {
    console.log("App is listening on 3000")
})


/*
The above code imports the express module, then requires the rootRouter which will export express router, routes and handlers.

then it creates an instance of express application called app. which will be used to configure the server, define routes, and listen for incoming requests.

Then the last line defines that any request that comes to rootRouter will be prefixed with /api/v1

for example as /users , it will be /api/v1/users
*/

/* 
CORS = cross origin resource sharing is a security feature implemented by web browsers.

let say you have a website www.myweb.com and it needs to fetch data from www.mybankapi, so if only www.mybankapi allows the data sharing through cors then only www.myweb.com will be able to look at get the data, else not.
*/
