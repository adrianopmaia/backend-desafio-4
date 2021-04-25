import mongoose from 'mongoose';

const gradesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
    min: 0,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});
//definindo modelo
const gradesModel = mongoose.model('grades', gradesSchema);

export { gradesModel };
