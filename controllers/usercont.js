const User = require("../models/user");
const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
const bcrypt = require("bcrypt");
const user = require("../models/user");

//logging function and hashing password
async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).send({ msg: "User not found" });
  }

  const ScryptedPassword = await bcrypt.compareSync(password, user.password);
  if(!ScryptedPassword){
    return res.status(400).send("Invalid password");
  }

  const btoken = jwt.sign({ email: email}, secret_key, {
    expiresIn: "2h",
  });
  let token = "Bearer " + btoken;

  res.send(token);
}
function loginPage(req, res) {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="POST">
        <label for="EMAIL">Email:</label>
        <input type="email" name="email" required>
        <label for="password">password:</label>
        <input type="password" name="password" required>
        <input type="submit" value="Login">
    </form>
    `);
}

function registerPage(req, res) {
  res.send(`
    <h2>SignUp</h2>
    <form action="/register" method="POST">
        <label for="name">Name :</label>
        <input type="text" id="name" name="name" required>
        <label for="EMAIL">Email:</label>
        <input type="email" name="email" required>
        <label for="password">password:</label>
        <input type="password" name="password" required>
        <input type="submit" value="Login">
    </form>
    `);
}

async function register(req, res) {
  
  const { name, email, password } = req.body;
  const userExists =await user.findOne({email: email});
  if(userExists){
   return res.status(400).send("email already used");
  }
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
     

    return  res.status(400).send(err);
    } else{

   
      const newUser = new User({
        name,
        email,
        password: hash,
      });

      newUser
        .save()
        .then(() => {
          const btoken = jwt.sign({ email: req.body.email }, secret_key, {
            expiresIn: "2h",
          });
          let token = "Bearer " + btoken;
          res.send(token);
        })
        .catch((err) => {
          res.send(err.message);
        });
      }
});

}

module.exports = { login, loginPage, register, registerPage };
