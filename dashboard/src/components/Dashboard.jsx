import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaUsers, FaUserMd, FaUserShield, FaUserInjured } from "react-icons/fa";
import API from "../api"; // ✅ use central API instance

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalDoctors: 0,
    totalAdmins: 0,
    recentPatients: 0,
    recentLogins: 0,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await API.get("/api/v1/appointment/getall");
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error(error.response?.data?.message || "Failed to fetch appointments");
        setAppointments([]);
      }
    };

    const fetchStats = async () => {
      try {
        const { data } = await API.get("/api/v1/user/stats");
        setStats(data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchAppointments();
    fetchStats();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await API.put(
        `/api/v1/appointment/update/${appointmentId}`,
        { status }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success("Appointment status updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      {/* Welcome Banner */}
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Welcome,</p>
              <h5>
                Dr. {admin && `${admin.firstName} ${admin.lastName}`}
              </h5>
            </div>
            <p>
              Manage your appointments efficiently. Review patient details, 
              accept or reject appointments with ease.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>My Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Pending</p>
          <h3>{appointments.filter(a => a.status === "Pending").length}</h3>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="banner">
        <h5>My Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    {`${appointment.firstName} ${appointment.lastName}`}
                  </td>
                  <td>{new Date(appointment.appointment_date).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</td>
                  <td>{appointment.department}</td>
                  <td>
                    <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accept</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{textAlign: "center", padding: "2rem"}}>No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
