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
  app.get('/cpu/:cpuid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("CPU").findOne({
      _id: ObjectID(req.params.cpuid)
    });
    res.send(result)
  })

  app.get('/case/:caseid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Case").findOne({
      _id: ObjectID(req.params.caseid)
    });
    res.send(result)
  })

  app.get('/cooler/:coolerid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Cooler").findOne({
      _id: ObjectID(req.params.cpuid)
    });
    res.send(result)
  })

  app.get('/graphics/:graphicsid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Graphics").findOne({
      _id: ObjectID(req.params.graphicsid)
    });
    res.send(result)
  })

  app.get('/memory/:memoryid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Memory").findOne({
      _id: ObjectID(req.params.memoryid)
    });
    res.send(result)
  })

  app.get('/mobo/:moboid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Motherboard").findOne({
      _id: ObjectID(req.params.moboid)
    });
    res.send(result)
  })

  app.get('/psu/:psuid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("PSU").findOne({
      _id: ObjectID(req.params.psuid)
    });
    res.send(result)
  })

  app.get('/storage/:storageid', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Storage").findOne({
      _id: ObjectID(req.params.storageid)
    });
    res.send(result)
  })

  // create
  app.get('/cpu/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("CPU").find().toArray();
    res.send(result)
  })

  app.post("/cpu/create", async (req, res) => {
    console.log(req.body);
    let { name, brand, clockspeed, over_clockspeed, description, core, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("CPU").insertOne({
      name, brand, clockspeed, over_clockspeed, description, core, image
    });
    res.send("cpu added")
  })

  app.get('/case/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("case").find().toArray();
    res.send(result)
  })

  app.post("/case/create", async (req, res) => {
    console.log(req.body);
    let { name, type, color, description, brand, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Case").insertOne({
      name, type, color, description, brand, image
    });
    res.send("case added")
  })

  app.get('/cooler/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Cooler").find().toArray();
    res.send(result)
  })

  app.post("/cooler/create", async (req, res) => {
    console.log(req.body);
    let { name, brand, type, noise_level, description, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Cooler").insertOne({
      name, brand, type, noise_level, description, image
    });
    res.send("cooler added")
  })

  app.get('/graphics/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Graphics").find().toArray();
    res.send(result)
  })

  app.post("/graphics/create", async (req, res) => {
    console.log(req.body);
    let { name, brand, clockspeed, over_clockspeed, memory, description, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Graphics").insertOne({
      name, brand, clockspeed, over_clockspeed, memory, description, image 
    });
    res.send("graphics added")
  })

  app.get('/memory/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Memory").find().toArray();
    res.send(result)
  })

  app.post("/memory/create", async (req, res) => {
    console.log(req.body);
    let { name, ddr_speed, speed, CAS, brand, Ram_Size,description, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Memory").insertOne({
      name, ddr_speed, speed, CAS, brand, Ram_Size,description, image  
    });
    res.send("memory added")
  })

  app.get('/mobo/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Motherboard").find().toArray();
    res.send(result)
  })

  app.post("/mobo/create", async (req, res) => {
    console.log(req.body);
    let { name, brand, form_factor, socket, max_memory, memory_slot,description, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Motherboard").insertOne({
      name, brand, form_factor, socket, max_memory, memory_slot,description, image  
    });
    res.send("mobo added")
  })

  app.get('/psu/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("PSU").find().toArray();
    res.send(result)
  })

  app.post("/psu/create", async (req, res) => {
    console.log(req.body);
    let { name, form_factor, efficiency, wattage, description, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("PSU").insertOne({
      name, form_factor, efficiency, wattage, description, image   
    });
    res.send("psu added")
  })

  app.get('/storage/create', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Storage").find().toArray();
    res.send(result)
  })

  app.post("/storage/create", async (req, res) => {
    console.log(req.body);
    let { name, type, storage, brand, description, image } = req.body;
    let db = MongoUtil.getDB();
    await db.collection("Storage").insertOne({
      name, type, storage, brand, description, image   
    });
    res.send("storage added")
  })

  // Delete
  app.post("/cpu/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('CPU').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/case/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Case').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/cooler/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Cooler').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/graphics/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Graphics').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/memory/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Memory').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/mobo/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Motherboard').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/psu]/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('PSU').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  app.post("/storage/delete", async (req, res) => {
    console.log(req.body);
    let db = MongoUtil.getDB();
    let { _id } = req.body;
    await db.collection('Storage').remove({
      _id: ObjectID(_id)
    });
    res.send(_id + "deleted")
  })

  // Update
  // cpu
  app.get('/cpu/:cpuid/edit', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("CPU").findOne({
      _id: ObjectID(req.params.cpuid)
    });
    res.send(result)
  })

  app.post("/cpu/:cpuid/edit", async (req, res) => {
    let db = MongoUtil.getDB();
    let {
      _id,
      name,
      brand,
      clockspeed,
      over_clockspeed,
      description,
      core,
      image
    } = req.body;

    console.log(_id);
    try {
      await db.collection('CPU').updateOne({
        _id: ObjectID(_id)
      }, {
        $set: {
          "name": name,
          "brand":brand,
          "clockspeed":clockspeed,
          "over_clockspeed":over_clockspeed,
          "description":description,
          "core":core,
          "image":image
        }
      })
      res.send("working")
    } catch (e) {
      res.send("case updated");
    }})

    // case
  app.get('/case/:caseid/edit', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Case").findOne({
      _id: ObjectID(req.params.caseid)
    });
    res.send(result)
  })

  app.post("/case/:caseid/edit", async (req, res) => {
    let db = MongoUtil.getDB();
    let {
      _id,
      name,
      type,
      color,
      description,
      brand,
      image
    } = req.body;
    console.log(_id);
    try {
      await db.collection('Case').updateOne({
        _id: ObjectID(_id)
      }, {
        $set: {
          "name": name,
          "type": type,
          "color": color,
          "description": description,
          "brand": brand,
          "image": image
        }
      })
      res.send("working")
    } catch (e) {
      res.send("case updated");
    }})

  // cooler

    app.get('/cooler/:coolerid/edit', async (req, res) => {
      let db = MongoUtil.getDB();
      let result = await db.collection("Cooler").findOne({
        _id: ObjectID(req.params.coolerid)
      });
      res.send(result)
    })
  
    app.post("/cooler/:coolerid/edit", async (req, res) => {
      let db = MongoUtil.getDB();
      let {
        _id,
        name,
        brand,
        type,
        noise_level,
        description,
        image
      } = req.body;
      console.log(_id);
      try {
        await db.collection('Cooler').updateOne({
          _id: ObjectID(_id)
        }, {
          $set: {
            "name": name,
            "brand":brand,
            "type":type,
            "noise_level":noise_level,
            "description":description,
            "image":image
          }
        })
        res.send("working")
      } catch (e) {
        res.send("Cooler updated");
      }
  })

  // graphics

  app.get('/graphics/:graphicsid/edit', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Graphcis").findOne({
      _id: ObjectID(req.params.graphicsid)
    });
    res.send(result)
  })

  app.post("/graphics/:graphicsid/edit", async (req, res) => {
    let db = MongoUtil.getDB();
    let {
      _id,
      name,
      brand,
      clockspeed,
      over_clockspeed,
      memory,
      description,
      image
    } = req.body;
    console.log(_id);
    try {
      await db.collection('Graphics').updateOne({
        _id: ObjectID(_id)
      }, {
        $set: {
          "name": name,
          "brand":brand,
          "clockspeed":clockspeed,
          "over_clockspeed":over_clockspeed,
          "memory":memory,
          "description":description,
          "image":image
        }
      })
      res.send("working")
    } catch (e) {
      res.send("graphics updated");
    }})

    // memory
    app.get('/memory/:memoryid/edit', async (req, res) => {
      let db = MongoUtil.getDB();
      let result = await db.collection("Memory").findOne({
        _id: ObjectID(req.params.memoryid)
      });
      res.send(result)
    })
  
    app.post("/memory/:memoryid/edit", async (req, res) => {
      let db = MongoUtil.getDB();
      let {
        _id,
        name,
        ddr_speed,
        speed,
        CAS,
        brand,
        Ram_Size,
        description,
        image
      } = req.body;
      console.log(_id);
      try {
        await db.collection('Memory').updateOne({
          _id: ObjectID(_id)
        }, {
          $set: {
            "name": name,
            "ddr_speed":ddr_speed,
            "speed":speed,
            "CAS":CAS,
            "brand":brand,
            "Ram_Size":Ram_Size,
            "description":description,
            "image":image
          }
        })
        res.send("working")
      } catch (e) {
        res.send("memory updated");
      }})

  // mobo
  app.get('/mobo/:moboid/edit', async (req, res) => {
    let db = MongoUtil.getDB();
    let result = await db.collection("Motherboard").findOne({
      _id: ObjectID(req.params.moboid)
    });
    res.send(result)
  })

  app.post("/mobo/:moboid/edit", async (req, res) => {
    let db = MongoUtil.getDB();
    let {
      _id,
      name,
      brand,
      form_factor,
      socket,
      max_memory,
      memory_slot,
      description,
      image
    } = req.body;
    console.log(_id);
    try {
      await db.collection('Motherboard').updateOne({
        _id: ObjectID(_id)
      }, {
        $set: {
          "name": name,
          "brand":brand,
          "form_factor":form_factor,
          "socket":socket,
          "max_memory":max_memory,
          "memory_slot":memory_slot,
          "description":description,
          "image":image
        }
      })
      res.send("working")
    } catch (e) {
      res.send("mobo updated");
    }})

    // PSU
    app.get('/psu/:psuid/edit', async (req, res) => {
      let db = MongoUtil.getDB();
      let result = await db.collection("PSU").findOne({
        _id: ObjectID(req.params.psuid)
      });
      res.send(result)
    })
  
    app.post("/psu/:psuid/edit", async (req, res) => {
      let db = MongoUtil.getDB();
      let {
        _id,
        name,
        form_factor,
        efficiency,
        wattage,
        description,
        image
      } = req.body;
      console.log(_id);
      try {
        await db.collection('PSU').updateOne({
          _id: ObjectID(_id)
        }, {
          $set: {
            "name": name,
            "form_factor":form_factor,
            "efficiency":efficiency,
            "wattage":wattage,
            "description":description,
            "image":image
          }
        })
        res.send("working")
      } catch (e) {
        res.send("psu updated");
      }})

// storage

app.get('/storage/:storageid/edit', async (req, res) => {
  let db = MongoUtil.getDB();
  let result = await db.collection("Storage").findOne({
    _id: ObjectID(req.params.storageid)
  });
  res.send(result)
})

app.post("/storage/:storageid/edit", async (req, res) => {
  let db = MongoUtil.getDB();
  let {
    _id,
    name,
    type,
    storage,
    brand,
    description,
    image
  } = req.body;
  console.log(_id);
  try {
    await db.collection('Storage').updateOne({
      _id: ObjectID(_id)
    }, {
      $set: {
        "name": name,
        "type":type,
        "storage":storage,
        "brand":brand,
        "description":description,
        "image":image
      }
    })
    res.send("working")
  } catch (e) {
    res.send("storage updated");
 }})

  //   app.listen(3000, () => {
  //     console.log("server has started")
  // })
}
expressSetup();
