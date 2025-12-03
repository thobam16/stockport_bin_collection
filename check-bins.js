const nodemailer = require("nodemailer");

// 1. Setup the email sender
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 2. SCHEDULE DATA HERE
const schedule = [
    // April 2025
    { date: "2025-04-01", bins: ["blue", "green"] },
    { date: "2025-04-08", bins: ["black", "green"] },
    { date: "2025-04-15", bins: ["blue", "brown", "green"] },
    { date: "2025-04-22", bins: ["black", "green"] },
    { date: "2025-04-29", bins: ["blue", "green"] },
    // May 2025
    { date: "2025-05-06", bins: ["black", "green"] },
    { date: "2025-05-13", bins: ["blue", "brown", "green"] },
    { date: "2025-05-20", bins: ["black", "green"] },
    { date: "2025-05-27", bins: ["green"] },
    // June 2025
    { date: "2025-06-03", bins: ["black", "green"] },
    { date: "2025-06-10", bins: ["blue", "brown", "green"] },
    { date: "2025-06-17", bins: ["black", "green"] },
    { date: "2025-06-24", bins: ["green"] },
    // July 2025
    { date: "2025-07-01", bins: ["black", "green"] },
    { date: "2025-07-08", bins: ["blue", "brown", "green"] },
    { date: "2025-07-15", bins: ["black", "green"] },
    { date: "2025-07-22", bins: ["green"] },
    { date: "2025-07-29", bins: ["black", "green"] },
    // August 2025
    { date: "2025-08-05", bins: ["blue", "brown", "green"] },
    { date: "2025-08-12", bins: ["black", "green"] },
    { date: "2025-08-19", bins: ["green"] },
    { date: "2025-08-26", bins: ["black", "green"] },
    // September 2025
    { date: "2025-09-02", bins: ["blue", "brown", "green"] },
    { date: "2025-09-09", bins: ["black", "green"] },
    { date: "2025-09-16", bins: ["green"] },
    { date: "2025-09-23", bins: ["black", "green"] },
    { date: "2025-09-30", bins: ["blue", "brown", "green"] },
    // October 2025
    { date: "2025-10-07", bins: ["black", "green"] },
    { date: "2025-10-14", bins: ["green"] },
    { date: "2025-10-21", bins: ["black", "green"] },
    { date: "2025-10-28", bins: ["blue", "brown", "green"] },
    // November 2025
    { date: "2025-11-04", bins: ["black", "green"] },
    { date: "2025-11-11", bins: ["green"] },
    { date: "2025-11-18", bins: ["black", "green"] },
    { date: "2025-11-25", bins: ["blue", "brown", "green"] },
    // December 2025
    { date: "2025-12-02", bins: ["black", "green"] },
    { date: "2025-12-09", bins: ["green"] },
    { date: "2025-12-16", bins: ["black", "green"] },
    { date: "2025-12-23", bins: ["blue", "brown", "green"] },
    { date: "2025-12-30", bins: ["black"] },
    // January 2026
    { date: "2026-01-06", bins: ["green"] },
    { date: "2026-01-13", bins: ["black", "green"] },
    { date: "2026-01-20", bins: ["blue", "brown", "green"] },
    { date: "2026-01-27", bins: ["black", "green"] },
    // February 2026
    { date: "2026-02-03", bins: ["green"] },
    { date: "2026-02-10", bins: ["black", "green"] },
    { date: "2026-02-17", bins: ["blue", "brown", "green"] },
    { date: "2026-02-24", bins: ["black", "green"] },
    // March 2026
    { date: "2026-03-03", bins: ["green"] },
    { date: "2026-03-10", bins: ["black", "green"] },
    { date: "2026-03-17", bins: ["blue", "brown", "green"] },
    { date: "2026-03-24", bins: ["black", "green"] },
    { date: "2026-03-31", bins: ["green"] },
    // April 2026
    { date: "2026-04-07", bins: ["black", "green"] },
    { date: "2026-04-14", bins: ["blue", "brown", "green"] },
    { date: "2026-04-21", bins: ["black", "green"] },
    { date: "2026-04-28", bins: ["green"] },
    // May 2026
    { date: "2026-05-05", bins: ["black", "green"] },
    { date: "2026-05-12", bins: ["blue", "brown", "green"] },
    { date: "2026-05-19", bins: ["black", "green"] },
    { date: "2026-05-26", bins: ["green"] },
    // June 2026
    { date: "2026-06-02", bins: ["black", "green"] },
    { date: "2026-06-09", bins: ["blue", "brown", "green"] },
    { date: "2026-06-16", bins: ["black", "green"] },
    { date: "2026-06-23", bins: ["green"] },
    { date: "2026-06-30", bins: ["black", "green"] },
    // July 2026
    { date: "2026-07-07", bins: ["blue", "brown", "green"] },
    { date: "2026-07-14", bins: ["black", "green"] },
    { date: "2026-07-21", bins: ["green"] },
    { date: "2026-07-28", bins: ["black", "green"] },
    // August 2026
    { date: "2026-08-04", bins: ["blue", "brown", "green"] },
    { date: "2026-08-11", bins: ["black", "green"] },
    { date: "2026-08-18", bins: ["green"] },
    { date: "2026-08-25", bins: ["black", "green"] },
    // September 2026
    { date: "2026-09-01", bins: ["blue", "brown", "green"] },
    { date: "2026-09-08", bins: ["black", "green"] }
];

async function checkAndSend() {
    // Calculate "Tomorrow"
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD to match the schedule
    const dateStr = tomorrow.toISOString().split('T')[0];
    
    console.log(`Checking for collection on: ${dateStr}`);

    const collection = schedule.find(item => item.date === dateStr);

    if (collection) {
        console.log("Collection found!");
        const binColors = collection.bins.map(b => b.toUpperCase()).join(" and ");
        
        const mailOptions = {
            from: `"Bin Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Sending to yourself
            subject: `🗑️ Bin Reminder: ${binColors} bins tomorrow!`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #333;">Bin Collection Tomorrow</h2>
                    <p style="font-size: 16px;">Don't forget to put out the following bins for <strong>${dateStr}</strong>:</p>
                    <ul style="font-size: 18px; font-weight: bold; color: #0077be;">
                        ${collection.bins.map(b => `<li style="text-transform: capitalize;">${b} Bin</li>`).join('')}
                    </ul>
                    <p style="font-size: 12px; color: #666;">Sent automatically from GitHub Actions.</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully.");
        } catch (error) {
            console.error("Error sending email:", error);
            process.exit(1); // Fail the action if email fails
        }
    } else {
        console.log("No collection scheduled for tomorrow.");
    }
}

checkAndSend();
