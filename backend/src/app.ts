// // ================================================
// // src/app.ts
// // Express Application Configuration
// // ================================================

// import express, { Application, Request, Response, NextFunction } from "express";
// import cors from "cors";
// import path from "path";
// import ngoRoutes from "./routes/ngo.routes";

// // Import routes
// import authRoutes from "./routes/auth.routes";
// import mlRoutes from "./routes/ml.routes";
// import historyRoutes from "./routes/history.routes";

// // ================================================
// // Create Express Application
// // ================================================

// const createApp = (): Application => {
//   const app: Application = express();

//   // ====================================================
//   // MIDDLEWARE CONFIGURATION
//   // ====================================================

//   // CORS Configuration
//   app.use(
//     cors({
//       origin: "*",
//       credentials: true,
//       methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );

//   // Body Parsers
//   app.use(express.json({ limit: "10mb" }));
//   app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//   // Static File Serving - Serve uploaded images
//   app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//   // Request Logging Middleware
//   app.use((req: Request, res: Response, next: NextFunction) => {
//     const timestamp = new Date().toISOString();
//     console.log(`[${timestamp}] ${req.method} ${req.path}`);
//     next();
//   });

//   // ====================================================
//   // ROUTES
//   // ====================================================

//   // Health Check / Welcome Route
//   app.get("/", (req: Request, res: Response) => {
//     res.status(200).json({
//       success: true,
//       message: "🍽️ LeftOverChef API is running!",
//       version: "1.0.0",
//       endpoints: {
//         auth: "/api/auth",
//         ml: "/api/ml",
//         history: "/api/history",
//       },
//       timestamp: new Date().toISOString(),
//     });
//   });

//   // API Health Check
//   app.get("/health", (req: Request, res: Response) => {
//     res.status(200).json({
//       success: true,
//       status: "healthy",
//       uptime: process.uptime(),
//       timestamp: new Date().toISOString(),
//     });
//   });

//   // Add this import


//   // Add to API Routes section
//   app.use("/api/ngos", ngoRoutes);

//   // API Routes
//   app.use("/api/auth", authRoutes);
//   app.use("/api/ml", mlRoutes);
//   app.use("/api/history", historyRoutes);

//   // ====================================================
//   // ERROR HANDLING
//   // ====================================================

//   // 404 Handler - Route Not Found
//   app.use((req: Request, res: Response) => {
//     res.status(404).json({
//       success: false,
//       message: "Route not found",
//       path: req.path,
//       method: req.method,
//     });
//   });

//   // Global Error Handler
//   app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
//     console.error("❌ Error:", err.message);

//     // Handle Multer errors
//     if (err.name === "MulterError") {
//       if (err.code === "LIMIT_FILE_SIZE") {
//         res.status(400).json({
//           success: false,
//           message: "File size too large. Maximum size is 10MB.",
//         });
//         return;
//       }
//       if (err.code === "LIMIT_UNEXPECTED_FILE") {
//         res.status(400).json({
//           success: false,
//           message: 'Unexpected file field. Use "file" as the field name.',
//         });
//         return;
//       }
//     }

//     // Handle file type errors
//     if (err.message && err.message.includes("Invalid file type")) {
//       res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//       return;
//     }

//     // Handle MongoDB duplicate key errors
//     if (err.code === 11000) {
//       res.status(409).json({
//         success: false,
//         message: "Duplicate entry. This record already exists.",
//       });
//       return;
//     }

//     // Handle MongoDB validation errors
//     if (err.name === "ValidationError") {
//       res.status(400).json({
//         success: false,
//         message: "Validation error",
//         errors: Object.values(err.errors).map((e: any) => e.message),
//       });
//       return;
//     }

//     // Default error response
//     res.status(err.status || 500).json({
//       success: false,
//       message: err.message || "Internal server error",
//     });
//   });

//   return app;
// };

// export default createApp;


// ================================================
// src/app.ts
// Express Application Configuration
// ================================================

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose"; // Add this import

// Import routes
import authRoutes from "./routes/auth.routes";
import mlRoutes from "./routes/ml.routes";
import historyRoutes from "./routes/history.routes";
import ngoRoutes from "./routes/ngo.routes";

// ================================================
// Create Express Application
// ================================================

const createApp = (): Application => {
  const app: Application = express();

  // ====================================================
  // MIDDLEWARE CONFIGURATION
  // ====================================================

  // CORS Configuration - Updated with your origins
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:19006'
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );

  // Body Parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Static File Serving - Serve uploaded images
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  // Request Logging Middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No Origin'}`);
    next();
  });

  // ====================================================
  // ROUTES
  // ====================================================

  // Health Check / Welcome Route
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "🍽️ LeftOverChef API is running!",
      version: "1.0.0",
      environment: process.env.NODE_ENV,
      database: "Connected to Shared MongoDB",
      endpoints: {
        auth: "/api/auth",
        ml: "/api/ml",
        history: "/api/history",
        ngos: "/api/ngos",
      },
      timestamp: new Date().toISOString(),
    });
  });

  // API Health Check
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      status: "healthy",
      environment: process.env.NODE_ENV,
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected", // Fixed this line
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/ml", mlRoutes);
  app.use("/api/history", historyRoutes);
  app.use("/api/ngos", ngoRoutes);

  // ====================================================
  // ERROR HANDLING
  // ====================================================

  // 404 Handler - Route Not Found
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
      path: req.path,
      method: req.method,
    });
  });

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error("❌ Error:", err.message);

    // Handle Multer errors
    if (err.name === "MulterError") {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
          success: false,
          message: "File size too large. Maximum size is 10MB.",
        });
        return;
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).json({
          success: false,
          message: 'Unexpected file field. Use "file" as the field name.',
        });
        return;
      }
    }

    // Handle file type errors
    if (err.message && err.message.includes("Invalid file type")) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
      return;
    }

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
      res.status(409).json({
        success: false,
        message: "Duplicate entry. This record already exists.",
      });
      return;
    }

    // Handle MongoDB validation errors
    if (err.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(err.errors).map((e: any) => e.message),
      });
      return;
    }

    // Default error response
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  });

  return app;
};

export default createApp;