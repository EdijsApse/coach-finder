const database = require("../database/connection");

async function index(req, res) {
  const coaches = await database.getDb().collection("coaches").find().toArray();
  
  res.json({
    data: coaches,
  });
}

module.exports = {
  index: index
}