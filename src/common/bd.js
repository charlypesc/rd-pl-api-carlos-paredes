import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://radiodeportes_development:rnSnehS3kLZn0A9k@cluster-development.f5jk38h.mongodb.net/?appName=cluster-development";

const client = new MongoClient(URI);
export default client;
