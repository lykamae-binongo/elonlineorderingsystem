const Information = require("../models/information.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Information
    const information = new Information({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        address : req.body.address,
        number : req.body.number,
        email : req.body.email,
        birthdate : req.body.birthdate,
        birthplace : req.body.birthplace,
    });
  
    Information.create(information, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Information."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Information.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Information."
        });
      else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Information.findById(req.params.informationId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Information with id ${req.params.informationId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Information with id " + req.params.informationId
          });
        }
      } else res.send(data);
    });
  };

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    Information.updateById(
        req.params.informationId,
        new Information(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Information with id ${req.params.informationId}.`
            });
            } else {
            res.status(500).send({
                message: "Error updating Information with id " + req.params.informationId
            });
            }
        } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Information.remove(req.params.informationId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Information with id ${req.params.informationId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Information with id " + req.params.informationId
          });
        }
      } else res.send({ message: `Information was deleted successfully!` });
    });
  };

exports.deleteAll = (req, res) => {
    Information.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Information."
        });
      else res.send({ message: `All Information were deleted successfully!` });
    });
  };