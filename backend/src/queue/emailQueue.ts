import { Queue } from "bullmq";
import { Redis } from "ioredis";

export const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null
});

export const emailQueue = new Queue("emailQueue", { connection });
