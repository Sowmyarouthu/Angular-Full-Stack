import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  modelname: String,
  year: Number,
  power: Number,
  color:String,
  make: String,
  category: []
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
