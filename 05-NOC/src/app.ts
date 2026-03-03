import { envs } from "./config/plugins/envs.plugin.js";
import { MongoDatabase } from "./data/mongodb/index.js";
import { prisma } from "./lib/prisma.js";

(async () => {
  main();
})();

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const newLog = await prisma.logModel.create({
    data: {
      level: 'HIGH',
      message: 'Test message',
      origin: 'App.ts',
    }
  });

  console.log(newLog);

  // Server.start();

}