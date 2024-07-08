const { tasks } = require("./userManagement");

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

module.exports={
    taskAddPost
}