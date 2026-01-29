const bcrypt = require('bcrypt');
const { pool } = require('../config/database');
const { use } = require('../routes/dashboard');

exports.resetPassword = async (req, res) => {
  try {
    const { username, password, confirmedPassword } = req.body;

    // Find user by email OR phone number
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1',
      [username, username]
    );

    if (users.length === 0) {
      return res.json({ 
        success: false, 
        message: 'Login failed. Please try again.' 
      });
    }

    const user = users[0];
    if (password !== confirmedPassword) {
      return res.json({ 
        success: false, 
        message: 'Password reset failed. Mismatch found in password and confirmed password. Please try again.'
      });
    }
    if (!validatePassword(password)) {
      return res.json({ 
              success: false, 
              message: 'Password must contain uppercase, lowercase, numbers, special characters, and be at least 8 characters long.' 
          });
    }
    await pool.execute(
            `UPDATE parent_care_services.users SET password = ? WHERE  email = ? OR phone = ?`,
            [ await bcrypt.hash(password, 10), username, username])
    
    // password reset successful
    return res.json({ 
      success: true, 
      message: 'password reset successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('password reset error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Password reset failed. Please try again.' 
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by email OR phone number
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1',
      [username, username]
    );

    if (users.length === 0) {
      return res.json({ 
        success: false, 
        message: 'Login failed. Please try again.' 
      });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ 
        success: false, 
        message: 'Login failed. Please try again.' 
      });
    }

    // Login successful
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    });
  }
};
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
}
