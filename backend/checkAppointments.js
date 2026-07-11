import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config({ path: "./Config/config.env" });

const checkAppointments = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB\n");

        // Get direct access to collections
        const usersCollection = mongoose.connection.collection("users");
        const appointmentsCollection = mongoose.connection.collection("appointments");

        // Get all patients
        const patients = await usersCollection.find({ role: "Patient" }).toArray();
        console.log("=== PATIENTS ===");
        patients.forEach((p, i) => {
            console.log(`${i + 1}. ${p.firstName} ${p.lastName} (${p.email})`);
            console.log(`   ID: ${p._id}`);
        });

        // Get all appointments
        const appointments = await appointmentsCollection.find({}).toArray();
        console.log("\n=== APPOINTMENTS ===");
        console.log(`Total appointments: ${appointments.length}`);

        appointments.forEach((app, i) => {
            console.log(`\n${i + 1}. Appointment ID: ${app._id}`);
            console.log(`   Patient: ${app.firstName} ${app.lastName}`);
            console.log(`   PatientId in DB: ${app.patientId}`);
            console.log(`   Department: ${app.department}`);
            console.log(`   Status: ${app.status}`);

            // Check if patientId matches any user
            const matchingPatient = patients.find(p => p._id.toString() === app.patientId?.toString());
            if (matchingPatient) {
                console.log(`   ✅ Matches patient: ${matchingPatient.email}`);
            } else {
                console.log(`   ❌ PatientId does NOT match any patient!`);
            }
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

checkAppointments();
