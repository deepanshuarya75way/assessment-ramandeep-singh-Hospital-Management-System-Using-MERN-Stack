// userRouter.js
import express from "express";
import {
    addNewAdmin,
    addNewDoctor,
    getAllDoctors,
    getPatientDetails,
    getUserDetails,
    login,
    logoutAdmin,
    logoutPatient,
    patientRegister,
    getAllPatients,
    getAllUsers,
    updateUser,
    deleteUser,
    updateDoctor,
    getUserStats,
    updateUserProfile,
    changePassword
} from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated, isFrontendAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);

// Routes for admin
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);

// Routes for doctors - public so patients can see available doctors for appointments
router.get("/doctors", getAllDoctors);

// Route to get patient details
router.get("/patient/me", isPatientAuthenticated, getPatientDetails);

// Route to get current user details (works for both Patient and Doctor)
router.get("/me", isFrontendAuthenticated, getUserDetails);

// Log-Out for Admin
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

// Log-Out for User
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

// Flexible logout for frontend (Patient or Doctor)
router.get("/logout", isFrontendAuthenticated, async (req, res) => {
  const isDoctor = req.user.role === "Doctor";
  const cookieName = isDoctor ? "adminToken" : "patientToken";
  
  res
    .status(200)
    .cookie(cookieName, "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `${req.user.role} logged out successfully!`,
    });
});

// Add New Doctor for User
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

// CRUD Routes for Admin Management
router.get("/patients", isAdminAuthenticated, getAllPatients);
router.get("/users", isAdminAuthenticated, getAllUsers);
router.get("/stats", isAdminAuthenticated, getUserStats);
router.put("/user/:id", isAdminAuthenticated, updateUser);
router.delete("/user/:id", isAdminAuthenticated, deleteUser);
router.put("/doctor/:id", isAdminAuthenticated, updateDoctor);

// Patient profile management routes
router.put("/update/:id", isPatientAuthenticated, updateUserProfile);
router.put("/change-password/:id", isPatientAuthenticated, changePassword);

export default router;
