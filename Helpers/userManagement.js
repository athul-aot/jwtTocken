//uuid creation
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const uuidNumber = () => {
  const uuid = uuidv4();
  let uuidNum = (parseInt(uuid.replace(/-/g, ""), 16) % 80000) + 1;
  return crypto.randomInt(uuidNum);
};

//user and task array
let users = [];
let tasks=[];

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


module.exports={
    userRegPost,
    users,
    tasks
}