const { connection } = require("../database/database.js");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

async function insertOTP(email, otp) {
  let db;
  try {
    db = await connection();
    const sql = `
      INSERT INTO MCSC.OTP (email, otp)
      VALUES (:email, :otp)
    `;
    const binds = { email, otp };
    await db.execute(sql, binds);
    console.log("OTP inserted successfully");
  } catch (err) {
    console.error("Error inserting OTP: ", err);
    throw err;
  } finally {
    if (db) {
      try {
        await db.close();
      } catch (err) {
        console.error("Error closing OracleDB db: ", err);
      }
    }
  }
}

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

// Example function to save an OTP and send an email
async function saveAndSendOTP(email, otp) {
  await insertOTP(email, otp);
  await sendVerificationEmail(email, otp);
}

// Example function to get OTP by email
async function getOTPByEmail(email) {
  let db;
  try {
    db = await connection();
    const sql = `
      SELECT otp_id, email, otp, created_at, expires_at
      FROM MCSC.OTP
      WHERE email = :email
    `;
    const binds = { email };
    const result = await db.execute(sql, binds);
    return result.rows;
  } catch (err) {
    console.error("Error fetching OTP: ", err);
    throw err;
  } finally {
    if (db) {
      try {
        await db.close();
      } catch (err) {
        console.error("Error closing OracleDB db: ", err);
      }
    }
  }
}

module.exports = {
  saveAndSendOTP,
  getOTPByEmail
};
