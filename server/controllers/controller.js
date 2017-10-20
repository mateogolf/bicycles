const mongoose = require('mongoose');
//Import user and bicycle
const User = mongoose.model("User")
const Bicycle = mongoose.model("Bike")
module.exports = {
    //Users
    registration:(req,res)=>{
        console.log(req.body)
        let user = new User(req.body);
        user.save((err,newUser)=>{
            if(err) return res.status(500).json(user.errors)
            console.log(newUser)
            req.session._id = user._id;
            res.json(true);
        })
    },
    login:(req,res)=>{
        const { email, login_password } = req.body;
        User.findOne({ email}, (err, user)=> {
            if (err || !user) {
                console.log("Could not find", err)
                return res.status(500).json("Could not find match")
            }
            // user.login(login_password)
            //     .then(() => {
            //         req.session._id = user._id;
            //         res.json(true);
            //     })
            //     .catch(err => {
            //         res.status(500).json("Invalid email or password");
            //     })
            if (!user.match(req.body.password, user.password)) {
                res.status(500).json("Invalid email or password");
            }
            else {
                req.session._id = user._id;
                res.json(true);
            }
        });
    },
    getUser:(req,res)=>{
        let { _id } = req.session
        User.findById({ _id }, (err, user) => {
            if (err) {
                return res.status(500).json("cant find user")
            }
            // console.log(user)
            res.json(user)
        })
    },//use session
    logout:(req,res)=>{
        if (req.session._id) {
            req.session._id = undefined;
            console.log("Controller clearing session:", req.session._id)
            // return;
            res.json(true)
        }
        res.json(false)
    },//clear session
    //Bicycles
    create: (req, res) => {
        console.log("Controller",req.body)
        let { _id } = req.session;
        User.findById({_id},(err,user)=>{
            if (err) {return res.status(500).json("There is no user logged in!!!")}
            const bicycle = new Bicycle(req.body);
            bicycle._user = user;
            console.log("Controller",bicycle);
            bicycle.save((err) => {
                if (err) {
                    console.log(bicycle.errors);
                    return res.status(500).json(bicycle.errors)
                }
                console.log("USER AFTER BIKE SAVED:",user)
                // user.bikes.push(bicycle)
                // console.log(user)
                // user.save((err)=>{
                //     if (err) return res.status(500).json("Could not resave the currentUser")
                    res.json(true);
                // })
            })
        })
    },
    // showAll:(req,res)=>{},
    showAllByUser:(req,res)=>{
        let { _id } = req.session;
        // User.findById({ _id })
        // .populate('bikes')
        // .exec((err,user)=>{
        //     if (err) return res.status(500).json("User not found")
        //     res.json(user.bikes);
        // })
        Bicycle.find({ _user: req.session._id},(err,bicycles)=>{
            if (err) return res.status(500).json("User not found")
            res.json(bicycles);
        })
    },
    search:()=>{},
    showOne:(req,res)=>{},
    
    update: (req,res)=>{},
    delete: (req,res)=>{
        Bicycle.findOneAndRemove({ _id: req.params.id }, (err, result) => {
            if (err) return res.status(500).json("User not found")
            console.log("Deleted!") 
            res.json(result);
        })
    }
}