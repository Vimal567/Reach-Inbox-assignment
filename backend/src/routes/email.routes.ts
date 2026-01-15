
import { Router } from "express";
import EmailJob from "../models/EmailJob.model.js";
import { emailQueue } from "../queue/emailQueue.js";

const router = Router();

router.post("/schedule", async (req, res) => {
  const { to, subject, body, scheduledAt } = req.body;

  if (!to || !subject || !scheduledAt) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const job = await EmailJob.create({
    to,
    subject,
    body,
    scheduledAt,
    status: "scheduled"
  });

  await emailQueue.add(
    "send",
    { id: job._id },
    {
      delay: new Date(scheduledAt).getTime() - Date.now()
    }
  );

  res.json({ success: true });
});


router.get("/scheduled", async (_req, res) => {
  const emails = await EmailJob.find({
    status: { $in: ["scheduled", "failed"] }
  }).sort({
    scheduledAt: 1
  });

  res.json(emails);
});


router.get("/sent", async (_req, res) => {
  const emails = await EmailJob.find({ status: "sent" }).sort({
    sentAt: 1
  });
  res.json(emails);
});


export default router;
