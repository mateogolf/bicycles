const mongoose = require('mongoose');
const controller = require('../controllers/controller');
const path = require("path");
module.exports = function (app) {
    // //Users
    app.post('/api/registration',controller.registration);
    app.post('/api/login',controller.login);
    app.get('/api/user',controller.getUser);
    app.get('/api/logout', controller.logout);
    // //Bicycles
    // showAll:(req,res)=>{},
    // app.get('/api/bicycles',controller.showAll);
    // showAllByUser:(req,res)=>{},
    app.get('/api/bicycles/listings',controller.showAllByUser)
    // // search:()=>{},
    // create: (req,res)=>{},
    app.post('/api/bicycles/new',controller.create)
    // update: (req,res)=>{},
    // delete: (req,res)=>{}

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    });
}
