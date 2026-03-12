import { envs } from "../../config";
import { MongoDatabase } from "../mongodb/mongo-database";

(async() => {

  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDatabase.disconnect();

})();

async function main() {
  
}