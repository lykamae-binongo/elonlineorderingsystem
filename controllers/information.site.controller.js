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
        res.status(500).render('addinformation',{
          message:
            err.message || "Some error occurred while creating the Information."
        });
      else res.render('addinformation', {message: "Information Saved"});
    });
};

exports.alldata = (req,res) =>{
  Information.getAll((err,data)=>{
    res.render('viewinformation', {data : data});
  });
}

exports.delete = (req,res) => {
  Information.remove(req.body.itemid, (err,result) =>{
    res.status(302).redirect('/view');
  })
}

exports.findid = (req,res) => {
  Information.findById(req.params.id, (err, data) =>{
    if(err){
      res.status(404).render('404');
    }
    
    res.render('updateinformation', {data: data});
  })
}

exports.updateid = (req,res) =>{
  Information.updateById(req.params.id, new Information(req.body) ,(err,result) =>{
    res.status(302).redirect('/view');
  })
}