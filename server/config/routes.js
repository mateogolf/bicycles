const mongoose = require('mongoose');
const controller = require('../controllers/controller');
const path = require("path");
module.exports = function (app) {
    // //Users
    app.post('/api/registration',controller.registration);
    app.post('/api/login',controller.login);
    app.get('/api/user',controller.getUser);
    app.get('/api/logout', controller.logout);
    app.get('/api/contacts/:id',controller.contactUser);
    // //Bicycles "/api/bicycles/search"
    // showAll:(req,res)=>{},
    app.get('/api/bicycles',controller.showAll);
    // showAllByUser:(req,res)=>{},
    app.get('/api/bicycles/listings',controller.showAllByUser)
    // // search:()=>{},
    app.get("/api/bicycles/:search", controller.search)
    // create: (req,res)=>{},
    app.post('/api/bicycles/new',controller.create)
    // update: (req,res)=>{},
    app.put('/api/bicycles/:id', controller.update)
    // delete: (req,res)=>{}
    app.delete('/api/bicycles/:id',controller.delete)

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    });
}
