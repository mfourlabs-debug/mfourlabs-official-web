const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { Resend } = require('resend');
const { defineSecret } = require('firebase-functions/params');

const RESEND_API_KEY = defineSecret('RESEND_API_KEY');

// Initialize Firebase Admin
admin.initializeApp();

const FROM_EMAIL = 'noreply@mfourlabs.dev';

/**
 * Send Welcome Email when user registers
 */
exports.sendWelcomeEmail = onDocumentCreated(
  {
    document: 'mvf_cli_beta_access_users/{userId}',
    secrets: [RESEND_API_KEY],
  },
  async (event) => {
    const user = event.data.data();
    const LOGO_URL = 'https://mfourlabs.dev/logo.png';

    const resend = new Resend(RESEND_API_KEY.value());

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: user.email,
        subject: 'Irongrade Early Access – Registration Confirmed',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Irongrade Early Access – Registration Confirmed</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #0a0a0a;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', monospace;
            }
            table {
              border-spacing: 0;
              border-collapse: collapse;
            }
            a {
              color: #22c55e;
              text-decoration: none;
              font-weight: 500;
            }
            .container {
              width: 100%;
              max-width: 600px;
              border-collapse: collapse;
              background-color: #0f0f0f;
              border: 1px solid #27272a;
              overflow: hidden;
            }
            .status-card {
              background-color: #18181b;
              border: 1px solid #3f3f46;
              padding: 20px;
              margin-bottom: 24px;
            }
            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 11px;
              background-color: #22c55e;
              color: #000;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; padding: 40px 0;">
            <tr>
              <td align="center">
                <table role="presentation" class="container">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 32px; text-align: center; background-color: #0f0f0f; border-bottom: 1px solid #27272a;">
                      <img src="${LOGO_URL}" alt="MFOUR LABS" style="width: 64px; height: 64px; margin: 0 auto 20px; display: block;">
                      <h1 style="margin: 0; font-family: inherit; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Irongrade Access Request</h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px; background-color: #0f0f0f;">
                      <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5; color: #ffffff;">Hi <strong>${user.name}</strong>,</p>
                      
                      <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
                        Thank you for registering for early access to <strong style="color: #22c55e;">Irongrade</strong>. Your request has been received and is currently in the priority queue.
                      </p>
                      
                      <!-- Status Card -->
                      <div class="status-card">
                        <h2 style="margin: 0 0 12px; font-size: 16px; font-weight: 700; color: #22c55e;">Priority Access Queue</h2>
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d8;">
                          You have been successfully placed in the waitlist. We are currently provisioning environments for compliance-focused teams and enterprises.
                        </p>
                      </div>

                      <!-- Registration Details -->
                      <h2 style="margin: 32px 0 16px; font-size: 16px; font-weight: 700; color: #ffffff;">Registration Details</h2>
                      
                      <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 14px; font-family: monospace;">
                        <tr>
                          <td style="padding: 8px 0; width: 35%; color: #71717a; font-weight: 500;">Status:</td>
                          <td style="padding: 8px 0;">
                            <span class="status-badge">WAITLIST – CONFIRMED</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #71717a; font-weight: 500;">Next Step:</td>
                          <td style="padding: 8px 0; color: #d4d4d8;">Selected users will be notified via email.</td>
                        </tr>
                      </table>

                      <p style="margin: 40px 0 0; font-size: 15px; line-height: 1.5; color: #ffffff;">
                        Best regards,<br>
                        <strong>The MFOUR LABS Team</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px 40px; background-color: #09090b; border-top: 1px solid #27272a;">
                      <p style="margin: 0 0 10px; font-size: 11px; line-height: 1.5; color: #52525b; text-align: center; font-family: monospace;">
                        <strong>MFOUR LABS</strong> | AI Governance & Standards
                      </p>
                      <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #52525b; text-align: center;">
                        <a href="mailto:hq@mfourlabs.dev" style="color: #71717a; text-decoration: underline;">hq@mfourlabs.dev</a> | 

                        <a href="https://mfourlabs.dev" style="color: #71717a; text-decoration: underline;">mfourlabs.dev</a>

                      </p>
                      <p style="margin: 10px 0 0; font-size: 10px; line-height: 1.5; color: #3f3f46; text-align: center;">
                        © ${new Date().getFullYear()} MFOUR LABS. All rights reserved.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      });

      console.log(`✅ Welcome email sent to ${user.email}`);
    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
    }
  }
);

/**
 * Send Access Granted Email when admin approves user
 */
exports.sendAccessGrantedEmail = onDocumentUpdated(
  {
    document: 'mvf_cli_beta_access_users/{userId}',
    secrets: [RESEND_API_KEY],
  },
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    const LOGO_URL = 'https://mfourlabs.dev/logo.png';

    const resend = new Resend(RESEND_API_KEY.value());

    // Check if status changed to approved
    if (before.status !== 'approved' && after.status === 'approved') {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: after.email,
          subject: 'Access Granted: Irongrade Platform',
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Access Granted: Irongrade Platform</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background-color: #0a0a0a;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', monospace;
              }
              table {
                border-spacing: 0;
                border-collapse: collapse;
              }
              a {
                color: #22c55e;
                text-decoration: none;
                font-weight: 500;
              }
              .container {
                width: 100%;
                max-width: 600px;
                border-collapse: collapse;
                background-color: #0f0f0f;
                border: 1px solid #27272a;
                overflow: hidden;
              }
              .status-card {
                background-color: #14532d;
                border: 1px solid #22c55e;
                padding: 20px;
                margin-bottom: 24px;
              }
              .status-badge {
                display: inline-block;
                padding: 6px 12px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 11px;
                background-color: #22c55e;
                color: #000;
              }
              .cta-button {
                display: inline-block;
                padding: 14px 32px;
                background-color: #22c55e;
                color: #000;
                text-decoration: none;
                font-weight: 700;
                font-size: 15px;
                border: none;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table role="presentation" class="container">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 32px; text-align: center; background-color: #0f0f0f; border-bottom: 1px solid #27272a;">
                        <img src="${LOGO_URL}" alt="MFOUR LABS" style="width: 64px; height: 64px; margin: 0 auto 20px; display: block;">
                        <h1 style="margin: 0; font-family: inherit; font-size: 28px; font-weight: 700; color: #22c55e; letter-spacing: -0.5px;">Access Granted 🚀</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 40px; background-color: #0f0f0f;">
                        <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5; color: #ffffff;">Hi <strong>${after.name}</strong>,</p>
                        
                        <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #a1a1aa;">
                          Congratulations! Your access to <strong style="color: #22c55e;">Irongrade</strong> has been approved. You're now part of an exclusive group of teams implementing enterprise-grade AI governance.
                        </p>
                        
                        <!-- Access Approved Card -->
                        <div class="status-card">
                          <h2 style="margin: 0 0 12px; font-size: 16px; font-weight: 700; color: #22c55e;">Access Approved</h2>
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #dcfce7;">
                            Your Irongrade environment is now active. You can begin deploying AI governance policies and implementing compliance frameworks.
                          </p>
                        </div>

                        <!-- Getting Started -->
                        <h2 style="margin: 32px 0 16px; font-size: 16px; font-weight: 700; color: #ffffff;">Getting Started</h2>
                        
                        <ol style="margin: 0 0 24px; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #d4d4d8;">
                          <li style="margin-bottom: 8px;">Visit <a href="https://mfourlabs.dev" style="color: #22c55e; font-weight: 700;">mfourlabs.dev</a> for documentation</li>
                          <li style="margin-bottom: 8px;">Access the platform using your credentials</li>
                          <li style="margin-bottom: 8px;">Initialize your first AI governance policy</li>
                          <li style="margin-bottom: 0;">Join our community on <a href="https://x.com/mfourlabs" style="color: #22c55e; font-weight: 700;">X</a> and <a href="https://www.linkedin.com/company/mfourlabs" style="color: #22c55e; font-weight: 700;">LinkedIn</a></li>
                        </ol>

                        <!-- CTA Button -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                          <tr>
                            <td align="center">
                              <a href="https://mfourlabs.dev" class="cta-button">Enter Irongrade →</a>
                            </td>
                          </tr>
                        </table>

                        <!-- Account Details -->
                        <h2 style="margin: 32px 0 16px; font-size: 16px; font-weight: 700; color: #ffffff;">Account Details</h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 14px; font-family: monospace;">
                          <tr>
                            <td style="padding: 8px 0; width: 35%; color: #71717a; font-weight: 500;">Status:</td>
                            <td style="padding: 8px 0;">
                              <span class="status-badge">APPROVED – ACTIVE</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #71717a; font-weight: 500;">Access ID:</td>
                            <td style="padding: 8px 0; color: #d4d4d8; font-family: monospace;">${after.accessId}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #71717a; font-weight: 500;">Email:</td>
                            <td style="padding: 8px 0; color: #d4d4d8;">${after.email}</td>
                          </tr>
                        </table>

                        <p style="margin: 40px 0 0; font-size: 15px; line-height: 1.5; color: #ffffff;">
                          Welcome aboard,<br>
                          <strong>The MFOUR LABS Team</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px 40px; background-color: #09090b; border-top: 1px solid #27272a;">
                        <p style="margin: 0 0 10px; font-size: 11px; line-height: 1.5; color: #52525b; text-align: center; font-family: monospace;">
                          <strong>MFOUR LABS</strong> | AI Governance & Standards
                        </p>
                        <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #52525b; text-align: center;">
                          <a href="mailto:hq@mfourlabs.dev" style="color: #71717a; text-decoration: underline;">hq@mfourlabs.dev</a> | 
                          <a href="https://www.mfourlabs.dev" style="color: #71717a; text-decoration: underline;">mfourlabs.dev</a>
                        </p>
                        <p style="margin: 10px 0 0; font-size: 10px; line-height: 1.5; color: #3f3f46; text-align: center;">
                          © ${new Date().getFullYear()} MFOUR LABS. All rights reserved.
                        </p>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
        });

        console.log(`✅ Access granted email sent to ${after.email}`);
      } catch (error) {
        console.error('❌ Error sending access granted email:', error);
      }
    }
  }
);
