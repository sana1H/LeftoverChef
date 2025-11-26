// // ================================================
// // src/middlewares/upload.middleware.ts
// // Multer Configuration for File Uploads
// // ================================================

// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // ================================================
// // Upload Directory Setup
// // ================================================

// // Define upload directory path (relative to project root)
// const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// // Create uploads directory if it doesn't exist
// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
//   console.log("📁 Created uploads directory:", UPLOAD_DIR);
// }

// // ================================================
// // Storage Configuration
// // ================================================

// /**
//  * Disk Storage Configuration
//  * Defines where and how files are stored on disk
//  */
// const storage = multer.diskStorage({
//   /**
//    * Destination - where to save files
//    */
//   destination: (req, file, cb) => {
//     cb(null, UPLOAD_DIR);
//   },

//   /**
//    * Filename - how to name the saved files
//    * Format: timestamp-randomNumber.extension
//    * Example: 1704067200000-123456789.jpg
//    */
//   filename: (req, file, cb) => {
//     // Generate unique filename
//     const timestamp = Date.now();
//     const randomNum = Math.round(Math.random() * 1e9);
//     const extension = path.extname(file.originalname).toLowerCase();

//     const filename = `${timestamp}-${randomNum}${extension}`;

//     cb(null, filename);
//   },
// });

// // ================================================
// // File Filter
// // ================================================

// /**
//  * File Filter Function
//  * Only accepts JPEG, PNG, and WEBP images
//  */
// const fileFilter = (
//   req: Express.Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   // Allowed MIME types
//   const allowedMimeTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//   ];

//   // Allowed file extensions
//   const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

//   // Get file extension
//   const extension = path.extname(file.originalname).toLowerCase();

//   // Check both MIME type and extension
//   const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);
//   const isExtensionValid = allowedExtensions.includes(extension);

//   if (isMimeTypeValid && isExtensionValid) {
//     // Accept the file
//     cb(null, true);
//   } else {
//     // Reject the file with error message
//     cb(
//       new Error(
//         "Invalid file type. Only JPEG, PNG, and WEBP images are allowed. " +
//           `Received: ${file.mimetype} (${extension})`
//       )
//     );
//   }
// };

// // ================================================
// // Multer Configuration Export
// // ================================================

// /**
//  * Multer Upload Configuration
//  *
//  * Usage in routes:
//  * - Single file: upload.single('file')
//  * - Multiple files: upload.array('files', maxCount)
//  *
//  * @example
//  * router.post('/upload', upload.single('file'), controller.handleUpload);
//  */
// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     // Maximum file size: 10MB (configurable via env)
//     fileSize: parseInt(process.env.MAX_FILE_SIZE_MB || "10") * 1024 * 1024,
//     // Maximum number of files per request
//     files: 1,
//     // Maximum number of non-file fields
//     fields: 10,
//   },
// });

// // ================================================
// // Helper Functions
// // ================================================

// /**
//  * Delete uploaded file
//  * Removes a file from the uploads directory
//  *
//  * @param filename - Name of file to delete
//  * @returns Promise<boolean> - true if deleted, false if error
//  */
// export const deleteUploadedFile = async (
//   filename: string
// ): Promise<boolean> => {
//   try {
//     const filePath = path.join(UPLOAD_DIR, filename);

//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       console.log(`🗑️  Deleted file: ${filename}`);
//       return true;
//     }

//     console.log(`⚠️  File not found: ${filename}`);
//     return false;
//   } catch (error) {
//     console.error(`❌ Error deleting file ${filename}:`, error);
//     return false;
//   }
// };

// /**
//  * Get file path for an uploaded file
//  *
//  * @param filename - Name of the file
//  * @returns Full path to the file
//  */
// export const getFilePath = (filename: string): string => {
//   return path.join(UPLOAD_DIR, filename);
// };

// /**
//  * Get URL path for serving uploaded file
//  *
//  * @param filename - Name of the file
//  * @returns URL path (e.g., /uploads/filename.jpg)
//  */
// export const getFileUrl = (filename: string): string => {
//   return `/uploads/${filename}`;
// };


import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "food-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req: any, file: any, cb: any) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Create multer instance with your file size limit
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE_MB || "10") * 1024 * 1024, // 10MB default
  },
  fileFilter: fileFilter,
});