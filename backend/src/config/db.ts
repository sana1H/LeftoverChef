// // ================================================
// // src/config/db.ts
// // MongoDB Database Connection Configuration
// // ================================================

// import mongoose from "mongoose";

// /**
//  * Connect to MongoDB database
//  */
// export const connectDB = async (): Promise<void> => {
//   try {
//     const mongoURI = process.env.MONGO_URI;

//     if (!mongoURI) {
//       throw new Error("MONGO_URI is not defined in environment variables.");
//     }

//     const conn = await mongoose.connect(mongoURI, {
//       tls: true, // FIX: Proper TLS initialization
//       tlsAllowInvalidCertificates: true, // FIX: Certificate chain issue on Windows
//     });

//     console.log(`✅ MongoDB Connected Successfully`);
//     console.log(`   Host: ${conn.connection.host}`);
//     console.log(`   Database: ${conn.connection.name}`);
//   } catch (error: any) {
//     console.error("❌ MongoDB Connection Error:");
//     console.error(`   Message: ${error.message}`);

//     if (error.message.includes("ENOTFOUND")) {
//       console.error("   💡 Hint: Check if your MongoDB URI is correct");
//     }
//     if (error.message.includes("Authentication failed")) {
//       console.error("   💡 Hint: Check your database username and password");
//     }
//     if (error.message.includes("ETIMEDOUT")) {
//       console.error(
//         "   💡 Hint: Ensure your IP is whitelisted in MongoDB Atlas"
//       );
//     }

//     process.exit(1);
//   }
// };

// // ================================================
// // Connection Event Handlers
// // ================================================

// mongoose.connection.on("connected", () => {
//   console.log("📡 Mongoose connected to database");
// });

// mongoose.connection.on("error", (err) => {
//   console.error("❌ Mongoose connection error:", err.message);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("⚠️  Mongoose disconnected from database");
// });

// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("🔌 Mongoose connection closed due to app termination");
//   process.exit(0);
// });

// src/config/db.ts
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      // Remove deprecated options, use modern MongoDB driver
    });

    console.log('✅ MongoDB Connected Successfully');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    
  } catch (error: any) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('💡 Tips:');
    console.log('   - Check if MongoDB Atlas IP whitelist includes your IP');
    console.log('   - Verify username/password in connection string');
    console.log('   - Check network connectivity');
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

export { connectDB };