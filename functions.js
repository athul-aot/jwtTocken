const jwt = require("jsonwebtoken");
const secretKey = "secret";

//uuid creation
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
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
  res.send(users);
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
  res.send("sucess");
};

//userLogin
const userLoginPost = (req,res) => {
    let userTaskList=[];
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


  const temp=tasks.filter(f=>currentUser.id==f.id);
  if(temp){
    userTaskList.push(temp)
    }
    
    console.log('podaaa',userTaskList);
    res.json({"tasks":userTaskList})

};

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
    res.status(400).send("user already exists");
  } else {
    next();
  }
};

const verifyTocken=(req,res,next)=>{
    const auth=req.headers.authorization;
    console.log("header:",auth);
    if (!auth) {
        return res.status(400).json({message:"tocken not found"}); 
    }
    //dont
    const tockenData=jwt.verify(auth,secretKey);
    console.log("tocken:",tockenData);
    if (!tockenData) {
        return res.status(400).json({message:"invalid tocken"});
        }
        req.user=tockenData;
    next();
}
module.exports = {
  userRegGet,
  userRegPost,
  userExistCheck,
  userLoginPost,
  taskAddPost,
  verifyTocken
};
