// import express from "express";
// import {
//   deleteAppointment,
//   getAllAppointments,
//   getMyAppointments,
//   postAppointment,
//   updateAppointmentStatus,
// } from "../controller/appointmentController.js";
// import {
//   isAdminAuthenticated,
//   isPatientAuthenticated,
// } from "../middlewares/auth.js";

// const router = express.Router();

// router.post("/post", isPatientAuthenticated, postAppointment);
// router.get("/myappointments", isPatientAuthenticated, getMyAppointments);
// router.get("/getall", isAdminAuthenticated, getAllAppointments);
// router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
// router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

// export default router;


import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  getMyAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/myappointments", isPatientAuthenticated, getMyAppointments);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
