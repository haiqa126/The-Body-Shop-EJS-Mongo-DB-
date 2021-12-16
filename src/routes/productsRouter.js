const express = require('express');
const { MongoServerClosedError } = require('mongodb');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const productsRouter = express.Router();
//const Body_Creams_Schema = require('./Body_Creams_Schema');
const mongoClient = require('mongodb').MongoClient;
const debug = require('debug')('app:bookRoutes');
const ObjectID = require('mongodb').ObjectID;
var bodyParser=require("body-parser");

productsRouter.use(bodyParser.urlencoded({extended:true}));



productsRouter.route('/').get((req, res) => {

    res.render('index');

});

productsRouter.route('/admin').get((req, res) => {

    res.render('admin');

});

productsRouter.route('/aboutus').get((req, res) => {

    res.render('about');

});

//to display all the products from mongo db database
productsRouter.route('/bodycreams').get((req,res)=>{

    const url = "mongodb+srv://noor:noor123@cluster0.snaf2.mongodb.net/";
    const dbname = 'Skin_Care';

    (async function mongo(){
        let client;
        try{
            client = await mongoClient.connect(url);
            //console.log('connected to mongo db server ');   
            
            
            const db= client.db(dbname);

            
             const col= await db.collection('Body_Creams');
             const Body_Creams= await col.find().toArray();
             //console.log('i got the dataaaaaaaaaaaaaaaaaaaaaa')

             res.render('bodycreams.ejs',{Body_Creams});
             console.log(Body_Creams);
            }
catch(err){
    debug(err.stack);
}
client.close();
    }());
});

productsRouter.route('/add').post((req, res) => {


    console.log("I am inside the form route")

     const url = "mongodb+srv://noor:noor123@cluster0.snaf2.mongodb.net/";
    const dbname = 'Skin_Care';

    (async function mongo(){
        let client;
        try{
            client = await mongoClient.connect(url);
            console.log('connected to mongo db server ');   
            console.log(dbname);  
            
            //to check the output of the form
          console.log(req.body.creamName);
          console.log(req.body.creamUrl);
          console.log(req.body.creamDescription);
           
          const db= client.db(dbname);
          const t=await db.collection('Body_Creams').insertOne({name:req.body.creamName,image:req.body.creamUrl,decription:req.body.creamDescription});
           console.log("Added to database successfully");
            
           //res.end(JSON.stringify(req.body));
        //to help render the products page successfully
           const col= await db.collection('Body_Creams');
             const Body_Creams= await col.find().toArray();
           res.render('bodycreams.ejs',{Body_Creams});
           console.log(Body_Creams);
        
            }
catch(err){
    debug(err.stack);
}
client.close();
    }());
});





//For the delete button 
productsRouter.route('/:id').get((request, response) => {
    
    console.log("I am inside the route")

    const cream = request.params.id;
    console.log(cream);

     const url = "mongodb+srv://noor:noor123@cluster0.snaf2.mongodb.net/";
    const dbname = 'Skin_Care';

    (async function mongo(){
        let client;
        try{
            client = await mongoClient.connect(url);
            console.log('connected to mongo db server ');   
            console.log(dbname);  

            const db= client.db(dbname);
            console.log("we are connected");
            const col=await db.collection('Body_Creams');
            const list= await col.find().toArray();
            console.log("we will now print the list ");
            console.log(list);
            
            
            const w=await col.deleteOne({_id:new ObjectID(cream)});

            console.log("we have deleted the item ");

            console.log("we printed the list after deleting ");
            console.log(list);
           

            //lets create another list to pass for rendering
            const Body_Creams=await db.collection('Body_Creams').find().toArray();
            
             response.redirect('/bodycreams',{Body_Creams});
        
            }
catch(err){
    debug(err.stack);
}
client.close();
    }());
});



//For the add data form 



module.exports = productsRouter;