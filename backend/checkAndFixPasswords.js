import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config({ path: "./Config/config.env" });

const checkAndFixPasswords = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Get direct access to the collection
        const usersCollection = mongoose.connection.collection("users");

        // Get all users
        const users = await usersCollection.find({}).toArray();
        console.log(`Found ${users.length} users in database\n`);

        if (users.length === 0) {
            console.log("No users found in database.");
            process.exit(0);
        }

        // Show current state and fix passwords
        console.log("Current users and their passwords:");
        console.log("================================");

        for (const user of users) {
            console.log(`\nEmail: ${user.email}`);
            console.log(`Role: ${user.role}`);
            console.log(`Current Password: ${user.password}`);

            // Check if password looks like bcrypt hash
            const isBcryptHash = user.password && user.password.startsWith('$2');
            console.log(`Is Encrypted: ${isBcryptHash ? 'YES - Will fix' : 'NO - Already plain text'}`);

            if (isBcryptHash) {
                // Reset to plain text password
                await usersCollection.updateOne(
                    { _id: user._id },
                    { $set: { password: "Password@123" } }
                );
                console.log(`✅ Password reset to: Password@123`);
            }
        }

        // Verify the fix
        console.log("\n\n=== VERIFICATION ===");
        const updatedUsers = await usersCollection.find({}).toArray();
        for (const user of updatedUsers) {
            console.log(`${user.email}: ${user.password}`);
        }

        console.log("\n✅ All passwords are now plain text!");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

checkAndFixPasswords();
