module.exports = {
  // Ultra Modern, No-Image Template wrapper
  wrapTemplate: (content, title = 'Notification') => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          color: #334155;
        }

        .wrapper {
          width: 100%;
          table-layout: fixed;
          background-color: #f8fafc;
          padding-bottom: 40px;
        }

        .container {
          max-width: 500px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .header {
          background-color: #ffffff;
          padding: 40px 40px 20px 40px;
          text-align: left;
          border-bottom: 1px solid #f1f5f9;
        }

        .brand {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.025em;
          margin-bottom: 8px;
          display: block;
        }

        .title {
            font-size: 16px;
            font-weight: 500;
            color: #64748b;
        }

        .content {
          padding: 40px;
          font-size: 15px;
          line-height: 1.7;
          color: #334155;
        }

        .footer {
          background-color: #f8fafc;
          padding: 24px 40px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }

        .btn {
          display: inline-block;
          background-color: #0f172a;
          color: #ffffff;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 6px;
          margin-top: 24px;
          font-weight: 600;
          font-size: 14px;
          text-align: center;
        }

        .btn:hover {
          background-color: #1e293b;
        }

        .info-box {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 20px;
          margin: 24px 0;
          border-radius: 8px;
        }

        .info-box.danger {
            background-color: #fef2f2;
            border-color: #fee2e2;
            color: #991b1b;
        }

        .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          display: block;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .value {
            font-family: monospace;
            background: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 14px;
        }

        .link-text {
            color: #2563eb;
            text-decoration: none;
            word-break: break-all;
        }

        p { margin-top: 0; margin-bottom: 1.5em; }

        .code-display {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-align: center;
            margin: 30px 0;
            color: #0f172a;
        }

        @media screen and (max-width: 600px) {
            .content, .header { padding: 24px; }
            .container { width: 100% !important; border-radius: 0; border: none; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
          <div style="height: 40px;"></div>
          <div class="container">
            <div class="header">
              <span class="brand">Whiz POS</span>
              <div class="title">${title}</div>
            </div>
            <div class="content">
              ${content}
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Whiz POS<br>
              Automated System Notification
            </div>
          </div>
      </div>
    </body>
    </html>
  `,

  approvalEmail: (data) => `
    <p>Hello ${data.name},</p>
    <p>Your account has been fully verified and approved. You now have access to the Back Office and Windows POS downloads.</p>

    <div class="info-box">
      <span class="label">Back Office Access</span>
      <div style="margin-bottom: 12px;"><a href="${data.backOfficeLink}" class="link-text">${data.backOfficeLink}</a></div>

      <span class="label">Username</span>
      <div style="margin-bottom: 12px;"><strong>${data.backOfficeUsername}</strong></div>

      <span class="label">Temporary Password</span>
      <div><span class="value">${data.backOfficePassword}</span></div>
    </div>

    <p><strong>Downloads:</strong></p>
    <p>
        <a href="${data.windowsLink}" class="link-text">Download Windows POS</a><br>
        <a href="${data.apkLink}" class="link-text">Download Mobile App</a>
    </p>

    <a href="${data.loginLink}" class="btn">Login to Dashboard</a>
  `,

  rejectionEmail: (data) => `
    <p>Hello ${data.name},</p>
    <p>Your account application has been reviewed and was not approved at this time.</p>

    <div class="info-box danger">
      <span class="label" style="color: #991b1b;">Reason for Rejection</span>
      <div>${data.reason}</div>
    </div>

    <p>You may login to your dashboard to review your application details and re-apply.</p>
    <a href="${data.loginLink}" class="btn">Login & Re-apply</a>
  `,

  resetPasswordEmail: (data) => `
    <p>We received a request to reset your password. Use the code below to complete the process.</p>

    <div class="code-display">${data.code}</div>

    <p>Alternatively, you can click the button below directly:</p>
    <a href="${data.resetLink}" class="btn">Reset Password</a>

    <p style="font-size: 13px; color: #94a3b8; margin-top: 40px;">If you did not request this change, please ignore this email. The link expires in 1 hour.</p>
  `,

  welcomeEmail: (data) => `
    <p>Welcome, ${data.name}!</p>
    <p>Thank you for registering with Whiz POS. We have received your request and it is currently pending review.</p>
    <p>You will receive a notification email once our team has processed your application.</p>
  `
};
