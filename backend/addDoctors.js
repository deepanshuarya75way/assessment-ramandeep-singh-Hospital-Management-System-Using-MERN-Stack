import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config({ path: "./Config/config.env" });

const addDoctors = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Get direct access to the users collection
        const usersCollection = mongoose.connection.collection("users");

        // Check if doctors already exist
        const existingDoctors = await usersCollection.countDocuments({ role: "Doctor" });
        console.log(`Found ${existingDoctors} existing doctors in database`);

        // Define 12 doctors with different departments
        const doctors = [
            {
                firstName: "Rajesh",
                lastName: "Kumar",
                email: "rajesh.kumar@hospital.com",
                phone: "98765432101",
                password: "Doctor@123",
                gender: "Male",
                dob: new Date("1975-03-15"),
                aadhar: "111122223333",
                role: "Doctor",
                doctorDepartment: "Cardiology",
                docAvatar: {
                    public_id: "doctor_1",
                    url: "https://randomuser.me/api/portraits/men/1.jpg"
                }
            },
            {
                firstName: "Priya",
                lastName: "Sharma",
                email: "priya.sharma@hospital.com",
                phone: "98765432102",
                password: "Doctor@123",
                gender: "Female",
                dob: new Date("1980-07-22"),
                aadhar: "111122224444",
                role: "Doctor",
                doctorDepartment: "Pediatrics",
                docAvatar: {
                    public_id: "doctor_2",
                    url: "https://randomuser.me/api/portraits/women/2.jpg"
                }
            },
            {
                firstName: "Amit",
                lastName: "Patel",
                email: "amit.patel@hospital.com",
                phone: "98765432103",
                password: "Doctor@123",
                gender: "Male",
                dob: new Date("1978-11-08"),
                aadhar: "111122225555",
                role: "Doctor",
                doctorDepartment: "Orthopedics",
                docAvatar: {
                    public_id: "doctor_3",
                    url: "https://randomuser.me/api/portraits/men/3.jpg"
                }
            },
            {
                firstName: "Sunita",
                lastName: "Verma",
                email: "sunita.verma@hospital.com",
                phone: "98765432104",
                password: "Doctor@123",
                gender: "Female",
                dob: new Date("1982-05-30"),
                aadhar: "111122226666",
                role: "Doctor",
                doctorDepartment: "Dermatology",
                docAvatar: {
                    public_id: "doctor_4",
                    url: "https://randomuser.me/api/portraits/women/4.jpg"
                }
            },
            {
                firstName: "Vikram",
                lastName: "Singh",
                email: "vikram.singh@hospital.com",
                phone: "98765432105",
                password: "Doctor@123",
                gender: "Male",
                dob: new Date("1970-09-12"),
                aadhar: "111122227777",
                role: "Doctor",
                doctorDepartment: "Neurology",
                docAvatar: {
                    public_id: "doctor_5",
                    url: "https://randomuser.me/api/portraits/men/5.jpg"
                }
            },
            {
                firstName: "Anita",
                lastName: "Gupta",
                email: "anita.gupta@hospital.com",
                phone: "98765432106",
                password: "Doctor@123",
                gender: "Female",
                dob: new Date("1985-01-25"),
                aadhar: "111122228888",
                role: "Doctor",
                doctorDepartment: "Gynecology",
                docAvatar: {
                    public_id: "doctor_6",
                    url: "https://randomuser.me/api/portraits/women/6.jpg"
                }
            },
            {
                firstName: "Suresh",
                lastName: "Reddy",
                email: "suresh.reddy@hospital.com",
                phone: "98765432107",
                password: "Doctor@123",
                gender: "Male",
                dob: new Date("1976-04-18"),
                aadhar: "111122229999",
                role: "Doctor",
                doctorDepartment: "Oncology",
                docAvatar: {
                    public_id: "doctor_7",
                    url: "https://randomuser.me/api/portraits/men/7.jpg"
                }
            },
            {
                firstName: "Meena",
                lastName: "Iyer",
                email: "meena.iyer@hospital.com",
                phone: "98765432108",
                password: "Doctor@123",
                gender: "Female",
                dob: new Date("1983-08-05"),
                aadhar: "111133331111",
                role: "Doctor",
                doctorDepartment: "ENT",
                docAvatar: {
                    public_id: "doctor_8",
                    url: "https://randomuser.me/api/portraits/women/8.jpg"
                }
            },
            {
                firstName: "Ramesh",
                lastName: "Nair",
                email: "ramesh.nair@hospital.com",
                phone: "98765432109",
                password: "Doctor@123",
                gender: "Male",
                dob: new Date("1972-12-20"),
                aadhar: "111133332222",
                role: "Doctor",
                doctorDepartment: "Gastroenterology",
                docAvatar: {
                    public_id: "doctor_9",
                    url: "https://randomuser.me/api/portraits/men/9.jpg"
                }
            },
            {
                firstName: "Kavita",
                lastName: "Joshi",
                email: "kavita.joshi@hospital.com",
                phone: "98765432110",
                password: "Doctor@123",
                gender: "Female",
                dob: new Date("1979-06-14"),
                aadhar: "111133333333",
                role: "Doctor",
                doctorDepartment: "Psychiatry",
                docAvatar: {
                    public_id: "doctor_10",
                    url: "https://randomuser.me/api/portraits/women/10.jpg"
                }
            },
            {
                firstName: "Arun",
                lastName: "Menon",
                email: "arun.menon@hospital.com",
                phone: "98765432111",
                password: "Doctor@123",
                gender: "Male",
                dob: new Date("1981-02-28"),
                aadhar: "111133334444",
                role: "Doctor",
                doctorDepartment: "Urology",
                docAvatar: {
                    public_id: "doctor_11",
                    url: "https://randomuser.me/api/portraits/men/11.jpg"
                }
            },
            {
                firstName: "Deepa",
                lastName: "Rao",
                email: "deepa.rao@hospital.com",
                phone: "98765432112",
                password: "Doctor@123",
                gender: "Female",
                dob: new Date("1984-10-10"),
                aadhar: "111133335555",
                role: "Doctor",
                doctorDepartment: "Ophthalmology",
                docAvatar: {
                    public_id: "doctor_12",
                    url: "https://randomuser.me/api/portraits/women/12.jpg"
                }
            }
        ];

        // Add timestamps to each doctor
        const now = new Date();
        const doctorsWithTimestamps = doctors.map(doc => ({
            ...doc,
            createdAt: now,
            updatedAt: now,
            lastLogin: now
        }));

        // Insert doctors (skip if email already exists)
        let addedCount = 0;
        let skippedCount = 0;

        for (const doctor of doctorsWithTimestamps) {
            const exists = await usersCollection.findOne({ email: doctor.email });
            if (exists) {
                console.log(`⏭️  Skipped: ${doctor.firstName} ${doctor.lastName} (${doctor.email}) - already exists`);
                skippedCount++;
            } else {
                await usersCollection.insertOne(doctor);
                console.log(`✅ Added: Dr. ${doctor.firstName} ${doctor.lastName} - ${doctor.doctorDepartment}`);
                addedCount++;
            }
        }

        console.log(`\n========================================`);
        console.log(`📊 Summary:`);
        console.log(`   Added: ${addedCount} doctors`);
        console.log(`   Skipped: ${skippedCount} doctors (already existed)`);
        console.log(`   Total doctors in database: ${existingDoctors + addedCount}`);
        console.log(`========================================`);

        // List all doctors
        console.log(`\n📋 All Doctors in Database:`);
        const allDoctors = await usersCollection.find({ role: "Doctor" }).toArray();
        allDoctors.forEach((doc, index) => {
            console.log(`${index + 1}. Dr. ${doc.firstName} ${doc.lastName} - ${doc.doctorDepartment} (${doc.email})`);
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

addDoctors();
