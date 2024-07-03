const jwt = require("jsonwebtoken");
const secretKey = "secret";

//uuid creation
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { log } = require("console");
const uuidNumber = () => {
  const uuid = uuidv4();
  let uuidNum = (parseInt(uuid.replace(/-/g, ""), 16) % 80000) + 1;
  return crypto.randomInt(uuidNum);
};

let users = [];
let tasks=[];

//jsontocken generation
const generateToken = (user) => {
    console.log("userdata :",user);
    return jwt.sign({ user }, secretKey);
    };



//testing users
const userRegGet = (req, res) => {
  res.send(tasks);
};

//userRegistration
const userRegPost = (req, res) => {
  const { username, fullname, phone, password } = req.body;
  const id = uuidNumber();
  const data = {
    id,
    username,
    fullname,
    phone,
    password,
  };
  users.push(data);
  console.log("dataa", username);
  res.json({message:"user registred sucessfully"})
};

//userLogin
const userLoginPost = (req,res) => {
  const { username, password } = req.body;
  const currentUser=users.find(f=>f.username==username&& f.password==password);
  if (!currentUser) {
    //the reason of writing return is we dont need to write an else part
    return res.status(400).json({message:"invalid credentials"});
  }
  const tocken = generateToken({
    id:currentUser.id,
    username:currentUser.username,
    fullname:currentUser.fullname,
  });
  console.log("json tocken",tocken)
  res.json({"tocken":tocken})

};

//userLoginGet
const userLoginGet = (req, res) => {
  const id=req.user.user.id;
  const userTasks=tasks.filter(t=>t.id==id)
  console.log("login dataa",userTasks);
  res.json({message:"user logged in sucessfully","tasks":userTasks})
}

//task add
const taskAddPost = (req, res) => {
    const {title,description} = req.body;
    const id=req.user.user.id;
    console.log("meeee",id);
    const data = {
        id,
        title,
        description
    }
    tasks.push(data);
    // console.log(data);
    res.json({"dataa ":tasks});
}



//middlewares
const userExistCheck = (req, res, next) => {
  const { username } = req.body;
  if (users.find((f) => f.username == username)) {
    res.status(400).json({message:"user already exists"});
  } else {
    next();
  }
};

const verifyTocken=(req,res,next)=>{
  console.log("kooiii",req.headers);
    const auth=req.headers.authorization;
    console.log("header:",auth);
    if (!auth) {
        return res.status(400).json({message:"tocken not found"}); 
    }
    //dont
    // const token = auth.split(" ")[1];
  
    jwt.verify(auth, secretKey, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: "Invalid token" });
      }
      console.log('vhbsvscd',decoded)
      req.user = decoded; // Set decoded user data to req.user
      next();
  });
}
module.exports = {
  userRegGet,
  userRegPost,
  userExistCheck,
  userLoginPost,
  taskAddPost,
  verifyTocken,
  userLoginGet
};
