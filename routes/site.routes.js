const SiteInformation = require("../controllers/information.site.controller");
module.exports = app => {
  app.get("/api", (req,res) =>{
    res.statusCode = 200;
    res.render('api');
  })
  
  app.get('/add', (req,res) =>{
    res.render('addinformation', {message: null});
  });
  
  app.post('/add',SiteInformation.create);
  
  app.get('/view', SiteInformation.alldata);

  app.post('/view/delete', SiteInformation.delete);

  app.get('/view/:id', SiteInformation.findid);

  app.post('/view/:id', SiteInformation.updateid);
}