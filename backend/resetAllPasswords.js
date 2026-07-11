import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config({ path: "./Config/config.env" });

// Since we can't import User (it has pre-save hook), we need to update directly
const resetAllPasswords = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Get direct access to the collection
        const usersCollection = mongoose.connection.collection("users");

        // Get all users
        const users = await usersCollection.find({}).toArray();
        console.log(`Found ${users.length} users in database`);

        if (users.length === 0) {
            console.log("No users found in database.");
            process.exit(0);
        }

        // List all users
        console.log("\nCurrent users:");
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.email} (${user.role}) - Password will be reset to: "Password@123"`);
        });

        // Reset all passwords to a default plain text password
        const defaultPassword = "Password@123";

        for (const user of users) {
            await usersCollection.updateOne(
                { _id: user._id },
                { $set: { password: defaultPassword } }
            );
            console.log(`Reset password for: ${user.email}`);
        }

        console.log("\n✅ All passwords have been reset to: Password@123");
        console.log("You can now login with any user using this password.");

    } catch (error) {
        console.error("Error resetting passwords:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

resetAllPasswords();
