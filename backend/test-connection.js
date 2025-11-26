require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("🧪 Testing MongoDB Connection...");
    console.log(
      "URI:",
      process.env.MONGO_URI?.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")
    );

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📊 Existing Collections:");
    collections.forEach((col) => console.log("   -", col.name));

    await mongoose.disconnect();
    console.log("✅ Test completed successfully!");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    process.exit(1);
  }
}

testConnection();
