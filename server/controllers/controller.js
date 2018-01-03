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
    contactUser: (req, res) => {
        console.log("currentUser in Controller:",req.session._id)
        console.log("Param passed Controller:",req.params.id)// === req.session._id)
        if (req.params.id!=req.session._id){
            User.findById({ _id: req.params.id }, (err, user) => {
                if (err) {
                    return res.status(500).json("cant find user")
                }
                // console.log(user)
                const contacts={
                    name:user.first_name + " " + user.last_name,
                    email:user.email
                }
                res.json(contacts)//user);
            })
        }
    },
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
        // let { _id } = req.session;
        User.findOne({_id:req.session._id},(err,user)=>{
            if (err) {return res.status(500).json("There is no user logged in!!!")}
            var bicycle = new Bicycle(req.body);
            bicycle._user = user._id;
            console.log("Controller2",bicycle);
            bicycle.save((err) => {
                if (err) {
                    console.log(bicycle.errors);
                    return res.status(500).json(bicycle.errors)
                }
                console.log("USER PRE RESAVE:",user)
                // user.bicycles.push(bicycle)
                // console.log(user)
                // user.save((err)=>{
                //     if (err) return res.status(500).json("Could not resave the currentUser")
                //     console.log("POST SAVE USER:",user)
                    res.json(user);
                // })
            })
        })
    },
    showAll:(req,res)=>{
        Bicycle.find({}, (err, bicycles) => {
            if (err) return res.status(500).json("ALL BIKES???in controller")
            res.json(bicycles);
        })
    },
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
    search:(req,res)=>{
        console.log("CONTROLLER:",req.params.search)
        // Bicycle.find({ title: req.params.search }, (err, bicycles) => {
        Bicycle.find({ $text: { $search: req.params.search } }, (err, bicycles) => {
        // Bicycle.textSearch(req.params.search, (err, bicycles) => {
            if (err) return res.status(500).json("Bicycles not found")
            res.json(bicycles);
        })
    },
    // showOne:(req,res)=>{},
    
    update: (req,res)=>{
        Bicycle.findOne({ _id: req.params.id },(err,bike)=>{
            if (err) return res.status(500).json("User not found")
            bike.title = req.body.title;
            bike.description = req.body.description;
            bike.price = req.body.price;
            bike.location = req.body.location;
            bike.image_url = req.body.image_url;
            bike.save((err)=>{
                if (err) return res.status(500).json(bike.errors)
                res.json(bike)
            })
        })
    },
    delete: (req,res)=>{
        Bicycle.findOneAndRemove({ _id: req.params.id }, (err, result) => {
            if (err) return res.status(500).json("User not found")
            console.log("Deleted!") 
            res.json(result);
        })
    }
}