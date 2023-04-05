// Express app to handle api endpoints for our gaming data server

const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;

const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

try {
  const database = client.db("cis445");
  const cters = database.collection("characters");

  app.use(express.json());

  // to get a character
  // api call is: Verb: GET, Endpt (path): "/api/character/:tag"
  // header will contain method and path (tag will be used for our find)
  app.get("/api/character/:tag", async (req, res) => {
    const gamerTag = req.params.tag;
    res.writeHead(200);
    console.log(`The client sent us: ${gamerTag} as the gamerTag`);
    // db.characters.findOne({ name: "almond_milk" }); // This does work
    const r = await cters.findOne({ name: gamerTag });

    res.end(JSON.stringify(r));
    //res.end('{"characterTag": "' + gamerTag + '"}'); // alternative string creation

    // the object parameter will come from the client
  });

  app.post("/api/formdata/", (req, res) => {
    res.writeHead(200);
    res.end();
  });

  // api call is: Verb: POST, Endpt (path): "/api/character"
  // header will contain method and endpt, body will contain a object (document)
  // that we will simply insert into db with our command
  app.post("/api/character/", async (req, res) => {
    //const otherData = req.params.somedatahere;
    const characterData = req.body;
    console.log(
      `Character data from the req body: ${JSON.stringify(characterData)}`
    );

    // I'll program this later when I figure out how to do the mongo driver
    await cters.insertOne(characterData);

    res.writeHead(200);
    res.end(`{"data": "we inserted that data"}`);
  });

  app.use(express.static("public"));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
}
