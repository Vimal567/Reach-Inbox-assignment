import { Schema, model } from "mongoose";

const EmailJobSchema = new Schema({
  to:String,
  subject:String,
  body:String,
  scheduledAt:Date,
  status:{type:String,default:"scheduled"},
  sentAt:Date
},{timestamps:true});

export default model("EmailJob",EmailJobSchema);
