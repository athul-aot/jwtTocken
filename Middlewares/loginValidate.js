const jwt = require("jsonwebtoken");
const secretKey = "secret";

const { users, tasks } = require("../Helpers/userManagement");

//userLogin
const userLoginPost = (req, res) => {
  const { username, password } = req.body;
  const currentUser = users.find(
    (f) => f.username == username && f.password == password
  );
  if (!currentUser) {
    //the reason of writing return is we dont need to write an else part
    return res.status(400).json({ message: "invalid credentials" });
  }
  const tocken = generateToken({
    id: currentUser.id,
    username: currentUser.username,
    fullname: currentUser.fullname,
  });
  console.log("json tocken", tocken);
  res.json({ tocken: tocken });
};

//userLoginGet
const userLoginGet = (req, res) => {
  const id = req.user.user.id;
  const userTasks = tasks.filter((t) => t.id == id).map((t)=>t.title);
  console.log("login dataa", userTasks);
  res.json({ message: "user logged in sucessfully", tasks: userTasks });
};

const verifyTocken = (req, res, next) => {
  console.log("kooiii", req.headers);
  const auth = req.headers.authorization;
  console.log("header:", auth);
  if (!auth) {
    return res.status(400).json({ message: "tocken not found" });
  }
  //dont
  // const token = auth.split(" ")[1];

  jwt.verify(auth, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("vhbsvscd", decoded);
    req.user = decoded; // Set decoded user data to req.user
    next();
  });
};


const generateToken = (user) => {
    console.log("userdata :",user);
    return jwt.sign({ user }, secretKey);
    };

module.exports={
    userLoginPost,
    userLoginGet,
    verifyTocken,
    generateToken
}