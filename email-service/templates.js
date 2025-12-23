module.exports = {
  // Beautiful UI Template wrapper
  wrapTemplate: (content, title = 'Notification') => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .header { background-color: #2563eb; color: #ffffff; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; color: #374151; line-height: 1.6; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
        .btn { display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; }
        .btn:hover { background-color: #1d4ed8; }
        .info-box { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .label { font-weight: bold; color: #4b5563; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${process.env.LOGO_URL ? `<img src="${process.env.LOGO_URL}" alt="Logo" style="max-height: 50px; margin-bottom: 10px;">` : ''}
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Whiz POS. All rights reserved.<br>
          <a href="#" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #9ca3af; text-decoration: none;">Support</a>
        </div>
      </div>
    </body>
    </html>
  `,

  approvalEmail: (data) => `
    <p>Dear ${data.name},</p>
    <p>We are pleased to inform you that your account has been <strong>approved</strong>.</p>

    <div class="info-box">
      <p><strong>Back Office Access:</strong></p>
      <p><span class="label">Link:</span> <a href="${data.backOfficeLink}">${data.backOfficeLink}</a></p>
      <p><span class="label">Username:</span> ${data.backOfficeUsername}</p>
      <p><span class="label">Password:</span> ${data.backOfficePassword}</p>
    </div>

    <div class="info-box">
      <p><strong>Downloads:</strong></p>
      <p><a href="${data.windowsLink}">Download Windows POS</a></p>
      <p><a href="${data.apkLink}">Download Mobile App (APK)</a></p>
    </div>

    <p>You can now log in to the dashboard using your credentials.</p>
    <a href="${data.loginLink}" class="btn">Login to Dashboard</a>
  `,

  rejectionEmail: (data) => `
    <p>Dear ${data.name},</p>
    <p>We regret to inform you that your account application has been <strong>rejected</strong>.</p>

    <div class="info-box" style="border-left-color: #ef4444; background-color: #fef2f2;">
      <p><strong>Reason for Rejection:</strong></p>
      <p>${data.reason}</p>
    </div>

    <p>You have the option to address these issues and re-apply for review.</p>
    <a href="${data.loginLink}" class="btn">Login to Review & Re-apply</a>
  `,

  resetPasswordEmail: (data) => `
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>

    <p>Click the button below to reset your password:</p>
    <a href="${data.resetLink}" class="btn">Reset Password</a>

    <p style="margin-top: 20px;">Or use this code if prompted: <strong>${data.code}</strong></p>

    <p style="font-size: 12px; margin-top: 20px;">This link/code will expire in 1 hour.</p>
  `,

  welcomeEmail: (data) => `
    <p>Welcome, ${data.name}!</p>
    <p>Thank you for registering with Whiz POS. Your account is currently under review by our administrators.</p>
    <p>You will receive another email once your account status has been updated.</p>
  `
};
