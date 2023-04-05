// to create a character
db.character.insert({
  "object of character": "this should be given us from the client",
});
// api call is: Verb: POST, Endpt (path): "/api/character"
// header will contain method and endpt, body will contain a object (document)
// that we will simply insert into db with our command

// to get a character
// the object parameter will come from the client
db.character.findOne({ tag: "from cli" });
// api call is: Verb: GET, Endpt (path): "/api/character/:tag"
// header will contain method and path (tag will be used for our find)

// to get all the characters
db.character.find({});

// to update character
// data will sent by the client
// for health and shield
db.character.updateOne(
  { tag: "from cli" },
  { $set: { protection: "obj from cli" } }
);

// for inventory
db.character.updateOne(
  { tag: "from cli" },
  { $push: { inventory: "obj from cli" } }
);

// for delete
