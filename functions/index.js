const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { Resend } = require('resend');
const { defineSecret } = require('firebase-functions/params'); // Adjusted import for newer SDKs

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
    const LOGO_URL = 'https://mfourlabs.dev/logo.png'; // Hosted logo URL

    // Initialize Resend INSIDE the function with the resolved secret
    const resend = new Resend(RESEND_API_KEY.value());

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: user.email,
        subject: 'Status Update: MVF Cloud Access',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Status Update: MVF Cloud Access</title>
          <style>
            /* General Styles */
            body {
              margin: 0;
              padding: 0;
              background-color: #f6f9fc;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            }
            table {
              border-spacing: 0;
              border-collapse: collapse;
            }
            a {
              color: #1a73e8;
              text-decoration: none;
              font-weight: 500;
            }

            /* Responsive Container */
            .container {
              width: 100%;
              max-width: 600px;
              border-collapse: collapse;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }

            /* Content Styling */
            .primary-text {
              color: #1a1a1a;
            }
            .secondary-text {
              color: #5f6368;
            }
            
            /* Status Highlighting */
            .status-card {
              background-color: #f8f9fa;
              border: 1px solid #e0e0e0;
              padding: 20px;
              border-radius: 6px;
              margin-bottom: 24px;
            }
            .status-badge {
              display: inline-block;
              padding: 6px 10px;
              font-weight: 600;
              border-radius: 4px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 12px;
              background-color: #e8f0fe;
              color: #1a73e8;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f6f9fc;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" class="container" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 32px; text-align: center; background-color: #ffffff;">
                      <img src="${LOGO_URL}" alt="MFOURLABS" style="width: 80px; height: 80px; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto; filter: brightness(0) invert(1);">
                      <h1 style="margin: 0; font-family: inherit; font-size: 28px; font-weight: 600; line-height: 1.3; color: #1a1a1a;">MVF Cloud Access Update</h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 0 40px 40px;">
                      <p style="margin: 0 0 16px; font-family: inherit; font-size: 16px; line-height: 1.5; color: #1a1a1a;">Hi <strong>${user.name}</strong>,</p>
                      
                      <p style="margin: 0 0 24px; font-family: inherit; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                        We are pleased to confirm your registration for MVF Cloud (Alpha). Your access details have been processed.
                      </p>
                      
                      <!-- Priority Access Status Card -->
                      <div class="status-card" style="background-color: #f8f9fa; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
                        <h2 style="margin: 0 0 12px; font-family: inherit; font-size: 18px; font-weight: 600; color: black;">Priority Queue Status</h2>
                        <p style="margin: 0; font-family: inherit; font-size: 15px; line-height: 1.6; color: #4a4a4a;">
                          You have been successfully placed in the Priority Access Queue. We are currently provisioning environments for the first cohort of "Standard-Compliant" teams.
                        </p>
                      </div>

                      <!-- Registration Details -->
                      <h2 style="margin: 32px 0 16px; font-family: inherit; font-size: 18px; font-weight: 600; color: #1a1a1a;">Registration Details</h2>
                      
                      <table role="presentation" style="width: 100%; border-collapse: collapse; font-family: inherit; font-size: 15px;">
                        <tr>
                          <td style="padding: 8px 0; width: 35%; color: #5f6368; font-weight: 500;">Status:</td>
                          <td style="padding: 8px 0; width: 65%;">
                            <span class="status-badge" style="display: inline-block; padding: 6px 10px; font-weight: 600; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; font-size: 12px; background-color: #e8f0fe; color: green;">
                              WAITLIST - CONFIRMED
                            </span>
                          </td>
                        </tr>
                        
                        <tr>
                          <td style="padding: 8px 0; color: #5f6368; font-weight: 500;">Next Step:</td>
                          <td style="padding: 8px 0; color: #1a1a1a;">Access is granted on a selective basis. Selected users will be notified.</td>
                        </tr>
                      </table>

                      <p style="margin: 40px 0 0 0; font-family: inherit; font-size: 16px; line-height: 1.5; color: #1a1a1a;">
                        Sincerely,
                      </p>
                      <p style="margin: 5px 0 0 0; font-family: inherit; font-size: 16px; line-height: 1.5; color: #1a1a1a; font-weight: 600;">
                        The MFOUR LABS Team
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                      <p style="margin: 0 0 10px; font-family: inherit; font-size: 12px; line-height: 1.5; color: #6c757d; text-align: center;">
                        **MFOUR LABS** | Research Governance & Standards Division
                      </p>
                      <p style="margin: 0; font-family: inherit; font-size: 12px; line-height: 1.5; color: #6c757d; text-align: center;">
                        <a href="mailto:research@mfourlabs.dev" style="color: #6c757d; text-decoration: underline;">research@mfourlabs.dev</a> | 
                        <a href="https://www.mfourlabs.dev" style="color: #6c757d; text-decoration: underline;">www.mfourlabs.dev</a>
                      </p>
                      <p style="margin: 10px 0 0; font-family: inherit; font-size: 11px; line-height: 1.5; color: #9aa0a6; text-align: center;">
                        © 2025 MFOUR LABS. All rights reserved.
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
    const LOGO_URL = 'https://mfourlabs.dev/logo.png'; // Hosted logo URL

    // Initialize Resend INSIDE the function with the resolved secret
    const resend = new Resend(RESEND_API_KEY.value());

    // Check if status changed to approved
    if (before.status !== 'approved' && after.status === 'approved') {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: after.email,
          subject: 'Access Granted: MVF Cloud (alpha)',
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Access Granted: MVF Cloud (alpha)</title>
            <style>
              /* General Styles */
              body {
                margin: 0;
                padding: 0;
                background-color: #f6f9fc;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
              }
              table {
                border-spacing: 0;
                border-collapse: collapse;
              }
              a {
                color: #1a73e8;
                text-decoration: none;
                font-weight: 500;
              }

              /* Responsive Container */
              .container {
                width: 100%;
                max-width: 600px;
                border-collapse: collapse;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              }

              /* Content Styling */
              .primary-text {
                color: #1a1a1a;
              }
              .secondary-text {
                color: #5f6368;
              }
              
              /* Status Highlighting */
              .status-card {
                background-color: #f8f9fa;
                border: 1px solid #e0e0e0;
                padding: 20px;
                border-radius: 6px;
                margin-bottom: 24px;
              }
              .status-badge {
                display: inline-block;
                padding: 6px 10px;
                font-weight: 600;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 12px;
                background-color: #d4edda;
                color: #155724;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f6f9fc;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" class="container" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 32px; text-align: center; background-color: #ffffff;">
                        <img src="${LOGO_URL}" alt="MFOURLABS" style="width: 80px; height: 80px; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto; filter: brightness(0) invert(1);">
                        <h1 style="margin: 0; font-family: inherit; font-size: 28px; font-weight: 600; line-height: 1.3; color: #1a1a1a;">Access Granted 🚀</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 0 40px 40px;">
                        <p style="margin: 0 0 16px; font-family: inherit; font-size: 16px; line-height: 1.5; color: #1a1a1a;">Hi <strong>${after.name}</strong>,</p>
                        
                        <p style="margin: 0 0 24px; font-family: inherit; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                          Congratulations! Your access to <strong>MVF Cloud (alpha)</strong> has been approved. You're now part of an exclusive group of engineers shaping the future of AI governance and first principles architecture.
                        </p>
                        
                        <!-- Access Approved Status Card -->
                        <div class="status-card" style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 6px; margin-bottom: 24px;">
                          <h2 style="margin: 0 0 12px; font-family: inherit; font-size: 18px; font-weight: 600; color: #155724;">Access Approved</h2>
                          <p style="margin: 0; font-family: inherit; font-size: 15px; line-height: 1.6; color: #155724;">
                            Your MVF Cloud (alpha) environment is now active. You can begin deploying AI governance kernels and implementing the MVF Protocol.
                          </p>
                        </div>

                        <!-- Getting Started -->
                        <h2 style="margin: 32px 0 16px; font-family: inherit; font-size: 18px; font-weight: 600; color: #1a1a1a;">Getting Started</h2>
                        
                        <ol style="margin: 0 0 24px; padding-left: 20px; font-family: inherit; font-size: 15px; line-height: 1.8; color: #4a4a4a;">
                          <li style="margin-bottom: 8px;">Visit <a href="https://mfourlabs.dev" style="color: #1a73e8; text-decoration: none; font-weight: 600;">mfourlabs.dev</a> for documentation</li>
                          <li style="margin-bottom: 8px;">Access the platform using your credentials</li>
                          <li style="margin-bottom: 8px;">Initialize your first AI governance kernel</li>
                          <li style="margin-bottom: 0;">Join our community on <a href="https://x.com/mfourlabs" style="color: #1a73e8; text-decoration: none; font-weight: 600;">X</a> and <a href="https://www.linkedin.com/company/mfourlabs" style="color: #1a73e8; text-decoration: none; font-weight: 600;">LinkedIn</a></li>
                        </ol>

                        <!-- CTA Button -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                          <tr>
                            <td align="center">
                              <a href="https://mfourlabs.dev" style="display: inline-block; padding: 14px 32px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 6px; font-family: inherit; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Enter The Lab →</a>
                            </td>
                          </tr>
                        </table>

                        <!-- Account Details -->
                        <h2 style="margin: 32px 0 16px; font-family: inherit; font-size: 18px; font-weight: 600; color: #1a1a1a;">Account Details</h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse; font-family: inherit; font-size: 15px;">
                          <tr>
                            <td style="padding: 8px 0; width: 35%; color: #5f6368; font-weight: 500;">Status:</td>
                            <td style="padding: 8px 0; width: 65%;">
                              <span class="status-badge" style="display: inline-block; padding: 6px 10px; font-weight: 600; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; font-size: 12px; background-color: #d4edda; color: #155724;">
                                APPROVED - ACTIVE
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #5f6368; font-weight: 500;">Access ID:</td>
                            <td style="padding: 8px 0; color: #1a1a1a; font-family: monospace;">${after.accessId}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #5f6368; font-weight: 500;">Email:</td>
                            <td style="padding: 8px 0; color: #1a1a1a;">${after.email}</td>
                          </tr>
                        </table>

                        <p style="margin: 40px 0 0 0; font-family: inherit; font-size: 16px; line-height: 1.5; color: #1a1a1a;">
                          Welcome aboard,
                        </p>
                        <p style="margin: 5px 0 0 0; font-family: inherit; font-size: 16px; line-height: 1.5; color: #1a1a1a; font-weight: 600;">
                          The MFOUR LABS Team
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0 0 10px; font-family: inherit; font-size: 12px; line-height: 1.5; color: #6c757d; text-align: center;">
                          **MFOUR LABS** | Research Governance & Standards Division
                        </p>
                        <p style="margin: 0; font-family: inherit; font-size: 12px; line-height: 1.5; color: #6c757d; text-align: center;">
                          <a href="mailto:research@mfourlabs.dev" style="color: #6c757d; text-decoration: underline;">research@mfourlabs.dev</a> | 
                          <a href="https://www.mfourlabs.dev" style="color: #6c757d; text-decoration: underline;">www.mfourlabs.dev</a>
                        </p>
                        <p style="margin: 10px 0 0; font-family: inherit; font-size: 11px; line-height: 1.5; color: #9aa0a6; text-align: center;">
                          © 2025 MFOUR LABS. All rights reserved.
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
