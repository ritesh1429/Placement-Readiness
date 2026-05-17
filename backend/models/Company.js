import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: String,
  type: String,
  difficulty: String,
  question: String,
  hint: String
});

const resourceSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String
});

const phaseSchema = new mongoose.Schema({
  title: String,
  items: [String]
});

const companySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  logo: String,
  color: String,
  roadmap: {
    phases: [phaseSchema],
    tips: [String]
  },
  resources: [resourceSchema],
  questions: [questionSchema]
});

const Company = mongoose.model('Company', companySchema);
export default Company;
