import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple possible locations for .env
dotenv.config(); // try default
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // project root
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // server folder

// Debug logging to see if env variables are loaded
console.log('MongoDB Connection Variables:');
console.log('Username:', process.env.MONGO_USERNAME ? 'Set' : 'Not set');
console.log('Password:', process.env.MONGO_PASSWORD ? 'Set' : 'Not set');
console.log('Cluster:', process.env.MONGO_CLUSTER || 'Not set');
console.log('Database:', process.env.MONGO_DATABASE || 'Not set');

// MongoDB Connection
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const cluster = process.env.MONGO_CLUSTER;
const database = process.env.MONGO_DATABASE;

// Construct the connection URI
const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Variable to store the database connection
let dbConnection;

export const connectToServer = async function() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Connect to MongoDB
    await client.connect();
    
    // Get database reference (use sample_mflix database for user collection)
    dbConnection = client.db("sample_mflix");
    
    // Test the connection with a simple ping
    const pingResult = await dbConnection.command({ ping: 1 });
    console.log("MongoDB connection successful! Server is ready.");
    
    return dbConnection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

export const getDb = function() {
  if (!dbConnection) {
    console.error("No database connection established. Call connectToServer first.");
    return null;
  }
  return dbConnection;
};

export const closeConnection = async function() {
  if (client.topology && client.topology.isConnected()) {
    await client.close();
    console.log("MongoDB connection closed");
  }
};
