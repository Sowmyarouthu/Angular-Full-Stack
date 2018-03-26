import * as mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  modelname: String,
  year: Number,
  power: Number,
  color:String,
  make: String,
  category: []
});

const Car = mongoose.model('Car', carSchema);

export default Car;
