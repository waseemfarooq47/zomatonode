var fs= require('fs');
var express = require("express");
var mongo =require("mongodb");
var MongoClient= mongo.MongoClient;

var app=express();
var dotenv=require("dotenv");
dotenv.config();
// var MongoUrl=process.env.mongoUrl 
// var MongoUrl=process.env.mongoLiveUrl 

/**in live we delete .enev file**/
var MongoUrl="mongodb+srv://testadd:test@cluster0.arhd2.mongodb.net/waseemdata?retryWrites=true&w=majority"
const bodyParser=require("body-parser")
const cors=require("cors")
var port = process.env.PORT || 4545

var db;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("this is express page for routing")
})



// app.get("/location",(req, res)=>{
//     fs.readFile("stock.json","utf-8",(err,data)=>{
//         if (err) throw err;
//         res.write(data)
//         res.end()
//     })
// })


//return a;ll the cities
app.get("/location",(req,res)=>{
    db.collection("location").find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//return all the mealtype

app.get("/mealtype",(req,res)=>{
    db.collection("mealtype").find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//return all the restaurants
/*app.get("/restaurants",(req,res)=>{
    db.collection("restaurants").find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})*/

//return all the restaurants wrt id
app.get("/restaurants/:id",(req,res)=>{
    var id=Number(req.params.id)
    db.collection("restaurants").find({"restaurant_id":id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//return all restaurants with query param example

app.get('/restaurants',(req,res)=>{
    var query={}
    // console.log(req.query)
    if(req.query.city){
        query={state_id:Number(req.query.city)}
    }
    db.collection("restaurants").find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//app wrt mealid   get data onbase mealid  and cuisineid and between highcost and lowcost
app.get("/filter/:mId",(req,res)=>{
    var mId=Number(req.params.mId)
    var query={"mealTypes.mealtype_id":mId}
    var sort={cost:1}

    if(req.query.sortKey){
        var sortKey=req.query.sortKey
        if(sortKey > 0 || sortKey < -1 || sortKey ==0){
            sortKey=1;
        }
        sort={cost:Number(sortKey)}
    }

    if( req.query.cuisine && req.query.lcost && req.query.hcost){
        var lcost=Number(req.query.lcost)
        var hcost= Number(req.query.hcost)
        query={$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mId,
        "cuisines.cuisine_id":Number(req.query.cuisine) }
    }

    else if(req.query.cuisine){
     query={"mealTypes.mealtype_id":mId,"cuisines.cuisine_id":Number(req.query.cuisine)}  
     //wecan use multiple
    //  query={"mealTypes.mealtype_id":mId,"cuisines.cuisine_id":{$in:[2,7]}}  
    }else if(req.query.lcost && req.query.hcost){
        var lcost=Number(req.query.lcost)
        var hcost= Number(req.query.hcost)
        query={$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mId, }
        
    }

    db.collection("restaurants").find(query).sort(sort).toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

app.get("/menu",(req,res)=>{
    var mrId=Number(req.params.id)
    db.collection("menu").find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})

// app.post('/menuItem',(req,res) => {
//     console.log(req.body);
//     db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })  
// })


app.post("/menuItem",(req,res)=>{
    console.log(req.body)
    db.collection("menu").find({menu_id:{$in:req.body}}).toArray((err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})

app.get("/menu/:id",(req,res)=>{
    var mrId=Number(req.params.id)
    db.collection("menu").find({"restaurant_id":mrId}).toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})




app.get("/orders",(req,res)=>{
    db.collection("orders").find().toArray((err,result)=>{
        if (err) throw err;
        res.send(result)
    })
})
app.put("/orderStatus/:id",(req,res)=>{
    var sid=Number(req.params.id);
    var status=req.body.status?req.body.status:"Pending"
    db.collection("orders").updateOne(
        {id:sid},
        {
            $set:{
                    "date":req.body.date,
                    "bank_status":req.body.bank_status,
                    "bank":req.body.bank,
                    "status":status
            }
        }
    )
    res.send("order updated")
})


app.post("/placeOrder",(req,res)=>{
    console.log(req.body)
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        // res.send(result)
        res.send("order placed!!!")
    })
})

app.delete("/deleteOrder",(req,res)=>{
    db.collection('orders').remove({},(err,result)=>{
    // db.collection('orders').remove({"id":2},(err,result)=>{
        if(err)throw err;
        // res.send(result)
        res.send("order deleted")
    })
})





MongoClient.connect(MongoUrl,(err,client)=>{
    if (err) console.log("error while connecting.")
    db=client.db("waseemdata")
    app.listen(port,()=>{
        console.log(`listening to port ${port}`)
    })
})


