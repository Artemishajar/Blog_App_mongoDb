const express = require ('express')
const app = express();

const postrouter = require('./routes/postRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require('./routes/registerRouter.js');

app.use(express.json());
app.use(express.urlencoded())

const mongoose = require("mongoose");

const host = "localhost"
const port ="3000";

mongoose
    .connect("mongodb://localhost:27017/myposts")
    .then(() => console.log("connected to data base"))
    .catch((error) => console.log("Error", error));




app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.use("/", postrouter);






app.get("/", (req, res) =>{
    res.send("welcome to blog App");
})









app.listen(port, () => {
    console.log(`server is running on http://${host}:${port}`);
})
