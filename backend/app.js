import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Routes
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import departmentRouter from "./router/departmentRouter.js";
import newsRouter from "./router/newsRouter.js";

// Middlewares
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Load environment variables
config({ path: "./Config/config.env" });

const app = express();

// ======= CORS CONFIGURATION =======
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
      "https://hospital-management-system-using-mern-5ans.onrender.com",
      "https://hospital-management-system-using-mern-7sqr.onrender.com",
      "http://localhost:5175",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    optionsSuccessStatus: 200,
  })
);

// Handle preflight requests
app.options("*", cors());

// ======= MIDDLEWARES =======
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ======= ROUTES =======
app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

// API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/news", newsRouter);

// Duplicate routes for frontend compatibility
app.use("/message", messageRouter);
app.use("/user", userRouter);
app.use("/department", departmentRouter);
app.use("/news", newsRouter);

// ======= ERROR HANDLER =======
app.use(errorMiddleware);

// ✅ NOTE: REMOVE DB CONNECTION FROM APP.JS
// connectDB() must ONLY be called in server.js

export default app;
