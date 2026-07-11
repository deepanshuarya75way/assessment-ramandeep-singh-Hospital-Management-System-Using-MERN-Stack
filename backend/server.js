import dotenv from "dotenv";
import app from "./app.js";
import cloudinary from "cloudinary";
import connectDB from "./database/dbConnection.js";

// Load environment variables
dotenv.config({ path: "./Config/config.env" });

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB, then start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
