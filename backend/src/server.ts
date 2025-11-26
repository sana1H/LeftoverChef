// // ================================================
// // src/server.ts
// // Server Entry Point
// // ================================================

// import dotenv from "dotenv";
// import createApp from "./app";
// import { connectDB } from "./config/db";

// // ================================================
// // Load Environment Variables
// // ================================================

// // Load .env file (must be called before accessing process.env)
// dotenv.config();

// // ================================================
// // Server Startup Function
// // ================================================

// /**
//  * Initialize and start the server
//  */
// const startServer = async (): Promise<void> => {
//   try {
//     // ====== Step 1: Connect to MongoDB ======
//     console.log("");
//     console.log("🔄 Connecting to MongoDB...");
//     await connectDB();

//     // ====== Step 2: Create Express App ======
//     const app = createApp();

//     // ====== Step 3: Get Port from Environment ======
//     const PORT = process.env.PORT || 8000;

//     // ====== Step 4: Start Server ======
//     const server = app.listen(PORT, () => {
//       console.log("");
//       console.log(
//         "╔════════════════════════════════════════════════════════════╗"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "║   🍽️  LeftOverChef Backend Server                          ║"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "╠════════════════════════════════════════════════════════════╣"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         `║   📡 Server running on port: ${PORT}                         ║`
//       );
//       console.log(
//         `║   🌐 Local: http://localhost:${PORT}                         ║`
//       );
//       console.log(
//         `║   📝 Environment: ${(process.env.NODE_ENV || "development").padEnd(
//           27
//         )}║`
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "╠════════════════════════════════════════════════════════════╣"
//       );
//       console.log(
//         "║   📚 API Endpoints:                                        ║"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "║   Authentication:                                          ║"
//       );
//       console.log(
//         "║   • POST   /api/auth/register    Register new user         ║"
//       );
//       console.log(
//         "║   • POST   /api/auth/login       Login user                ║"
//       );
//       console.log(
//         "║   • GET    /api/auth/me          Get current user          ║"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "║   ML Predictions:                                          ║"
//       );
//       console.log(
//         "║   • POST   /api/ml/predict       Upload & predict          ║"
//       );
//       console.log(
//         "║   • GET    /api/ml/formats       Supported formats         ║"
//       );
//       console.log(
//         "║   • GET    /api/ml/health        Service health            ║"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "║   History:                                                 ║"
//       );
//       console.log(
//         "║   • GET    /api/history          Get all predictions       ║"
//       );
//       console.log(
//         "║   • GET    /api/history/:id      Get single prediction     ║"
//       );
//       console.log(
//         "║   • DELETE /api/history/:id      Delete prediction         ║"
//       );
//       console.log(
//         "║   • GET    /api/history/stats    Get statistics            ║"
//       );
//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "╠════════════════════════════════════════════════════════════╣"
//       );

//       // Check ML API configuration
//       const mlApiUrl = process.env.ML_API_URL;
//       if (!mlApiUrl || mlApiUrl === "https://mock-ml-api.example.com/predict") {
//         console.log(
//           "║   ⚠️  WARNING: ML_API_URL not configured!                  ║"
//         );
//         console.log(
//           "║   Using mock predictions for development.                 ║"
//         );
//         console.log(
//           "║   Replace ML_API_URL in .env with your real ML endpoint.  ║"
//         );
//       } else {
//         console.log(
//           "║   ✅ ML API configured                                     ║"
//         );
//       }

//       console.log(
//         "║                                                            ║"
//       );
//       console.log(
//         "╚════════════════════════════════════════════════════════════╝"
//       );
//       console.log("");
//     });

//     // ====== Graceful Shutdown Handler ======
//     const gracefulShutdown = (signal: string) => {
//       console.log("");
//       console.log(`📴 ${signal} received. Shutting down gracefully...`);

//       server.close(() => {
//         console.log("✅ HTTP server closed");
//         process.exit(0);
//       });

//       // Force close after 10 seconds
//       setTimeout(() => {
//         console.error(
//           "❌ Could not close connections in time, forcefully shutting down"
//         );
//         process.exit(1);
//       }, 10000);
//     };

//     // Listen for termination signals
//     process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
//     process.on("SIGINT", () => gracefulShutdown("SIGINT"));
//   } catch (error: any) {
//     console.error("");
//     console.error(
//       "╔════════════════════════════════════════════════════════════╗"
//     );
//     console.error(
//       "║   ❌ Failed to start server                                ║"
//     );
//     console.error(
//       "╚════════════════════════════════════════════════════════════╝"
//     );
//     console.error("");
//     console.error("Error:", error.message);
//     console.error("");

//     // Provide helpful hints
//     if (error.message.includes("MONGO")) {
//       console.error("💡 Hint: Check your MongoDB connection string in .env");
//     }
//     if (error.message.includes("JWT")) {
//       console.error("💡 Hint: Make sure JWT_SECRET is set in .env");
//     }

//     process.exit(1);
//   }
// };

// // ================================================
// // Global Error Handlers
// // ================================================

// /**
//  * Handle Unhandled Promise Rejections
//  */
// process.on("unhandledRejection", (reason: any) => {
//   console.error("");
//   console.error("❌ Unhandled Promise Rejection:");
//   console.error(reason);
//   console.error("");
//   // Don't exit the process, let it continue running
// });

// /**
//  * Handle Uncaught Exceptions
//  */
// process.on("uncaughtException", (error: Error) => {
//   console.error("");
//   console.error("❌ Uncaught Exception:");
//   console.error(error);
//   console.error("");
//   // Exit the process for uncaught exceptions
//   process.exit(1);
// });

// // ================================================
// // Start the Server
// // ================================================

// startServer();


// src/server.ts
import dotenv from "dotenv";
import createApp from "./app";
import { connectDB } from "./config/db";

// Load environment variables first
dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    // ====== Step 1: Connect to Shared MongoDB ======
    console.log("");
    console.log("🔄 Connecting to Shared MongoDB...");
    await connectDB();

    // ====== Step 2: Create Express App ======
    const app = createApp();

    // ====== Step 3: Get Port from Environment ======
    const PORT = process.env.PORT || 8000;

    // ====== Step 4: Start Server ======
    const server = app.listen(PORT, () => {
      console.log("");
      console.log("╔════════════════════════════════════════════════════════════╗");
      console.log("║                                                            ║");
      console.log("║   🍽️  LeftOverChef Backend Server (Shared DB)             ║");
      console.log("║                                                            ║");
      console.log("╠════════════════════════════════════════════════════════════╣");
      console.log("║                                                            ║");
      console.log(`║   📡 Server running on port: ${PORT}                         ║`);
      console.log(`║   🌐 Local: http://localhost:${PORT}                         ║`);
      console.log(`║   📝 Environment: ${(process.env.NODE_ENV || "development").padEnd(27)}║`);
      console.log(`║   🗄️  Database: Shared MongoDB Atlas                        ║`);
      console.log("║                                                            ║");
      console.log("╠════════════════════════════════════════════════════════════╣");
      console.log("║   ✅ Connected to Friend's Database                        ║");
      console.log("║   👥 Users & Predictions are shared between apps           ║");
      console.log("║   🔐 JWT tokens work across both applications              ║");
      console.log("║                                                            ║");
      console.log("╚════════════════════════════════════════════════════════════╝");
      console.log("");
    });

    // ====== Graceful Shutdown Handler ======
    const gracefulShutdown = (signal: string) => {
      console.log("");
      console.log(`📴 ${signal} received. Shutting down gracefully...`);

      server.close(() => {
        console.log("✅ HTTP server closed");
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error("❌ Could not close connections in time, forcefully shutting down");
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  } catch (error: any) {
    console.error("");
    console.error("╔════════════════════════════════════════════════════════════╗");
    console.error("║   ❌ Failed to start server                                ║");
    console.error("╚════════════════════════════════════════════════════════════╝");
    console.error("");
    console.error("Error:", error.message);
    
    // Provide specific MongoDB connection help
    if (error.message.includes("Mongo")) {
      console.error("");
      console.error("💡 MongoDB Connection Help:");
      console.error("   - Check if your IP is whitelisted in MongoDB Atlas");
      console.error("   - Verify the username/password in MONGO_URI");
      console.error("   - Ensure network connectivity to MongoDB Atlas");
      console.error("   - Check if the database cluster is running");
    }

    process.exit(1);
  }
};

// ================================================
// Global Error Handlers
// ================================================

/**
 * Handle Unhandled Promise Rejections
 */
process.on("unhandledRejection", (reason: any) => {
  console.error("");
  console.error("❌ Unhandled Promise Rejection:");
  console.error(reason);
  console.error("");
});

/**
 * Handle Uncaught Exceptions
 */
process.on("uncaughtException", (error: Error) => {
  console.error("");
  console.error("❌ Uncaught Exception:");
  console.error(error);
  console.error("");
  process.exit(1);
});

// ================================================
// Start the Server
// ================================================

startServer();