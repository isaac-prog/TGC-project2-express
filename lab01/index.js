// the first 3 are found in the node_modules
const express = require('express')
require('dotenv').config()
const MongoUtil = require('./MongoUtil')

// await needs async to work
async function expressSetup() {
    let app = express()
    // to wait for data to fully load when connecting to mongodb, and must be placed b4 route
    await MongoUtil.connect(process.env.MONGO_URI, 'computer_parts');

    // Read CPU
    app.get('/cpu', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("CPU").find().toArray();
        res.send(result)
    })

    // Do all the R first
    app.get('/case', async (req, res) => {
        let db = MongoUtil.getDB();
        let result1 = await db.collection("Case").find().toArray();
        res.send(result1)
    })

    app.get('/Cooler', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("Cooler").find().toArray();
        res.send(result)
    })

    app.get('/Graphics', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("Graphics").find().toArray();
        res.send(result)
    })

    app.get('/Memory', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("Memory").find().toArray();
        res.send(result)
    })

    app.get('/Motherboard', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("Motherboard").find().toArray();
        res.send(result)
    })

    app.get('/PSU', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("PSU").find().toArray();
        res.send(result)
    })

    app.get('/Storage', async (req, res) => {
        let db = MongoUtil.getDB();
        let result = await db.collection("Storage").find().toArray();
        res.send(result)
    })
    // Create CPU
    app.get('/cpu/create', (req, res) => {
        res.render(result)
    })
    app.post("/CPU/add",(req,res)=>{
        let {name, brand, clockspeed, over_clockspeed,description,core}=req.body;
        tags = tags || [];
        if (!Array.isArray(tags)) {
            tags = [tags];
          }
          db.collection("CPU").insertOne({
            name,
            brand,
            clockspeed,
            over_clockspeed,
            description,
            core
          });
          res.redirect('/CPU')  
    })

    // Delete
    app.delete("/CPU/:id", async (req, res) => {
        let results = await db.collection("CPU").remove({
          _id: ObjectId(req.params.id)
        });
        res.status(200);
        res.send({
          message: "OK"
        });
      });
    // Update

    app.listen(3000, () => {
        console.log("server has started")
    })
}
expressSetup();
