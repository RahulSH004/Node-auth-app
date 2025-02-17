const express  = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const staticRoutes = require('./routes/routes');
const JWT_SECRET = "USER_APP";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.use("/", staticRoutes);

app.post("/signup", (req, res) => {

    const {username, password} = req.body;
    users.push({username, password});

    res.send("User created successfully");
})
app.post("/signin", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user => user.username === username && user.password === password);
    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET); //convert their username to jwt token
        res.send({
            token: token
        });
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        });
    }
})
function auth(req, res, next){
    const token = req.headers.token;

    if(token){
        jwt.verify(token, JWT_SECRET, (err) => {
            if(err){
                res.status(403).send({
                    message: "Invalid token"
                })
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({
            message: "Token required"
        })
    }
}
app.get("/me", auth, (req, res) => {
    res.send({
        message: "You are authenticated"
    })
})
// app.get("/me", (req, res) => {
//     const token = req.headers.token; // jwt token
//     const decodedinfo = jwt.verify(token, JWT_SECRET);// {username}

//     const username = decodedinfo.username;
//     const founduser = users.find(user => user.username === username);

//     if(founduser){
//         res.json({
//             username: founduser.username,
//             password: founduser.password
//         })
//     }else{
//         res.json({
//             message: "token invalid"
//         })
//     }
// })

app.listen(5000);
