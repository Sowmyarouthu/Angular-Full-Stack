abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    
    this.model.find({},(err, docs) => {
      console.log("GetALL",err,docs);

      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }// 
 
  getcarsbyname = (req, res) => {
    console.log(req.params.name);
    this.model.find({make: req.params.name},(err, docs) => {
      console.log("GetALL",err,docs);

      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }// 

  getcarsbycategory = (req, res) => {
    console.log("Catergory=",req);
    this.model.find({make: req.body},(err, docs) => {
      console.log("GetCategoryList",err,docs);

      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }// 

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  }

  // Insert
  insert = (req, res) => {
    console.log(req.body);
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      console.log(item);
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }
}

export default BaseCtrl;
