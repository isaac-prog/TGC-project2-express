// the first 3 are found in the node_modules
const express = require('express')
require('dotenv').config()
const MongoUtil = require('./MongoUtil')
var cors = require('cors')
const { ObjectID } = require('bson')
var app = express()
app.use(express.json())
MongoUtil.connect(process.env.MONGO_URI, 'computer_parts');

app.use(cors())

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 3000')
})

// await needs async to work
async function expressSetup() {
  // to wait for data to fully load when connecting to mongodb, and must be placed b4 route

  // Read
  app.get('/cpu', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("CPU").find().toArray();
    res.send(result)
  })

  app.get('/case', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Case").find().toArray();
    res.send(result)
  })

  app.get('/cooler', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Cooler").find().toArray();
    res.send(result)
  })

  app.get('/graphics', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Graphics").find().toArray();
    res.send(result)
  })

  app.get('/memory', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Memory").find().toArray();
    res.send(result)
  })

  app.get('/motherboard', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Motherboard").find().toArray();
    res.send(result)
  })

  app.get('/psu', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("PSU").find().toArray();
    res.send(result)
  })

  app.get('/storage', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Storage").find().toArray();
    res.send(result)
  })

// individual id
    app.get('/case/:caseid', async (req, res) => {
      let db = MongoUtil.getDB();
      let result = await db.collection("Case").findOne({
        _id:ObjectID(req.params.caseid)
      });
      res.send(result)
    })

// create
  app.get('/tasks/create',async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("tasks").find().toArray();
    res.send(result)
  })
  
  app.post("/tasks/create", async (req, res) => {
    console.log(req.body);
    let {  description, done } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("tasks").insertOne({
      description,done 
    });
    res.send("task added")
  })


  app.get('/case/create',async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("case").find().toArray();
    res.send(result)
  })
  
  app.post("/case/create", async (req, res) => {
    console.log(req.body);
    let {  name,type,color,description,brand, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Case").insertOne({
      name,type,color,description,brand, image  
    });
    res.send("case added")
  })

  // Delete
  app.post("/case/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Case').remove({
      _id:ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  // Update
  app.get('/case/:caseid/edit', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Case").findOne({
      _id:ObjectID(req.params.caseid)
    });
    res.send(result)
  })

  app.post("/case/:caseid/edit", async (req, res) => {
    let db = MongoUtil.getDB();
    let {_id} = req.body;
    let CPUid = req.params.CPUid;
    await db.collection('Case').updateOne({
      _id: new ObjectId(_id)
    }
  )})

  //   app.listen(3000, () => {
  //     console.log("server has started")
  // })



}
expressSetup();
