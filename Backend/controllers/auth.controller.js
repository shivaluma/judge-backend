const User = require('../model/Users');

exports.postLogin = (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const savedUser = user.save();
    }catch(err){
        res.status(400).send(err);
    }
}