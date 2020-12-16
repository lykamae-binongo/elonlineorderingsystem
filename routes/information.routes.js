module.exports = app =>{
    const information = require("../controllers/information.controller.js");

    // Create a new Information
  app.post("/api/information", information.create);

  // Retrieve all Information
  app.get("/api/information",information.findAll);

  // Retrieve a single Information with informationId
  app.get("/api/information/:informationId", information.findOne);

  // Update a Information with informationId
  app.put("/api/information/:informationId", information.update);

  // Delete a Information with informationId
  app.delete("/api/information/:informationId", information.delete);

  // Create a new Information
  app.delete("/api/information", information.deleteAll);
}