const { users } = require("../Helpers/userManagement");

const userExistCheck = (req, res, next) => {
    const { username } = req.body;
    if (users.find((f) => f.username == username)) {
      res.status(400).json({message:"user already exists"});
    } else {
      next();
    }
  };

module.exports={
    userExistCheck
}