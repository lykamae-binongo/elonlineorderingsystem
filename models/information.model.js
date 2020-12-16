const sql = require('./database.js');

const Information = function(information){
    this.firstname = information.firstname;
    this.lastname = information.lastname;
    this.address = information.address;
    this.number = information.number;
    this.email = information.email;
    this.birthdate = information.birthdate;
    this.birthplace = information.birthplace;
}

Information.create = (newInformation, result) =>{
    sql.query("INSERT INTO information SET ?", newInformation, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log('Created Information: ', {id: res.insertId, ...newInformation});
        result(null,{id: res.insertId, ...newInformation});
    });
};

Information.findById = (informationId, result) => {
    sql.query(`select * from information where id = ${informationId}`, (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        if (res.length) {
            console.log("found Information: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Information.getAll = result =>{
    sql.query('select * from information', (err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        console.log('Information: ',res);
        result(null, res);
    })
};

Information.updateById = (id, information, result) => {
    sql.query('update information set firstname = ? , lastname = ?, address=?, number=?, email=?, birthdate=?, birthplace=?',[information.firstname,information.lastname,information.address,information.number,information.email,information.birthdate,information.birthplace],(err,res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated information: ", { id: id, ...information });
        result(null, { id: id, ...information });
    })
};

Information.remove = (id, result) => {
    sql.query("DELETE FROM information WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted information with id: ", id);
      result(null, {result: 'success'});
    });
  };

  Information.removeAll = result => {
    sql.query("DELETE FROM information", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} information `);
      result(null, res);
    });
  };

  module.exports = Information;