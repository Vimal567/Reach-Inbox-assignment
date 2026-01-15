import "dotenv/config";
import { Worker } from "bullmq";
import { connection } from "../queue/emailQueue.js";
import EmailJob from "../models/EmailJob.model.js";
import nodemailer from "nodemailer";
import { connectDB } from "../config/db.js";

await connectDB();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.COMPANY_MAIL,
    pass: process.env.COMPANY_MAIL_AUTH
  }
});

new Worker(
  "emailQueue",
  async job => {

    const email = await EmailJob.findById(job.data.id);
    if (!email) return;

    try {
      await transporter.sendMail({
        from: '"ReachInbox" <no-reply@reachinbox.com>',
        to: email.to,
        subject: email.subject,
        text: email.body
      });

      email.status = "sent";
      email.sentAt = new Date();
      await email.save();
    } catch (err) {
      email.status = "failed";
      console.log(err)
      await email.save();
    }
  },
  { connection, concurrency: 5 }
);