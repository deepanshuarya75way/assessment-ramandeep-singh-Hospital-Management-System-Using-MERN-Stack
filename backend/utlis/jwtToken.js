export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    // Admin and Doctor use adminToken for dashboard, Patient uses patientToken
    const cookieName = (user.role === "Admin" || user.role === "Doctor") ? "adminToken" : "patientToken";

    // Set CORS-compatible cookie options (default 7 days if COOKIE_EXPIRE not set)
    const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE) || 7;
    const cookieOptions = {
        expires: new Date(
            Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-site cookies in production
    };

    res.status(statusCode)
        .cookie(cookieName, token, cookieOptions)
        .json({
            success: true,
            message,
            user,
            token,
        });
};