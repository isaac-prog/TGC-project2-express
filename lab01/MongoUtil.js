const MongoClient = require('mongodb').MongoClient;
let _db;

// useUnifiedTopology ignores whatever mongo version so that i can use any version for the project
async function connect(url,dbname){
    let client = await MongoClient.connect(url,{
        useUnifiedTopology: true
    })
    _db=client.db(dbname)
    console.log("Database connected")
}
function getDB(){
    return _db;
}

// export aka share the connect & getDB function with other file
module.exports={
    connect,getDB
}

