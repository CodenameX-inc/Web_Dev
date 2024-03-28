import oracledb from ('oracledb');
const bcrypt = require('bcryptjs');

const userSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
};

// Match user entered password to hashed password in database
userSchema.matchPassword = async function (enteredPassword) {
  const connection = await oracledb.getConnection();
  const result = await connection.execute(
    `SELECT password FROM users WHERE email = :email`,
    [this.email]
  );
  const hashedPassword = result.rows[0][0];
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

module.exports = userSchema;