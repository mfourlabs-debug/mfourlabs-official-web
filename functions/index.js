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
    document: 'lab_early_access_users/{userId}',
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
        subject: 'Welcome to MFOURLABS Early Access',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f6f9fc;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  
                  <!-- Header with Logo -->
                  <tr>
                    <td style="padding: 40px 40px 32px; text-align: center; background-color: #ffffff;">
                      <img src="${LOGO_URL}" alt="MFOURLABS" style="width: 80px; height: 80px; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto;">
                      <h1 style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 28px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">Welcome to MFOURLABS</h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 0 40px 40px;">
                      <p style="margin: 0 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 16px; line-height: 1.5; color: #1a1a1a;">Hi <strong>${user.name}</strong>,</p>
                      
                      <p style="margin: 0 0 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 16px; line-height: 1.6; color: #4a4a4a;">Thank you for joining <strong>MFOURLABS Early Access</strong>. We're building a first principles engineering research lab, and you're now part of this journey.</p>
                      
                      <!-- Referral Code Box -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                        <tr>
                          <td style="padding: 24px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                            <p style="margin: 0 0 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 12px; font-weight: 600; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Your Referral Code</p>
                            <div style="padding: 16px; background-color: #ffffff; border-radius: 6px; text-align: center; border: 1px solid #dee2e6;">
                              <code style="font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace; font-size: 24px; font-weight: 600; color: #1a1a1a; letter-spacing: 2px;">${user.referralCode}</code>
                            </div>
                            <p style="margin: 16px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 14px; line-height: 1.5; color: #6c757d; text-align: center;">Share this code with friends to help them join the lab</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- What's Next Section -->
                      <h2 style="margin: 32px 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 20px; font-weight: 600; color: #1a1a1a;">What's Next?</h2>
                      <ul style="margin: 0; padding-left: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 15px; line-height: 1.8; color: #4a4a4a;">
                        <li style="margin-bottom: 8px;">We'll notify you when your access is approved</li>
                        <li style="margin-bottom: 8px;">Follow us on X for updates</li>
                        <li style="margin-bottom: 8px;">Connect with us on LinkedIn</li>
                      </ul>
                      
                      <!-- Access ID -->
                      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 13px; color: #6c757d;">
                          <strong>Access ID:</strong> ${user.accessId}
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                      <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 13px; line-height: 1.5; color: #6c757d; text-align: center;">© 2025 MFOURLABS. All rights reserved.</p>
                      <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 12px; line-height: 1.5; color: #adb5bd; text-align: center;">First Principles Engineering Research Lab</p>
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
    document: 'lab_early_access_users/{userId}',
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
          subject: '🚀 Your MFOURLABS Access Has Been Approved',
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f6f9fc;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    
                    <!-- Success Header with Logo -->
                    <tr>
                      <td style="padding: 48px 40px; text-align: center; background: linear-gradient(135deg, #00C853 0%, #00E676 100%);">
                        <img src="${LOGO_URL}" alt="MFOURLABS" style="width: 80px; height: 80px; margin-bottom: 24px; display: block; margin-left: auto; margin-right: auto; filter: brightness(0) invert(1);">
                        <h1 style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Access Granted! 🚀</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 40px 40px 32px;">
                        <h2 style="margin: 0 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 24px; font-weight: 600; color: #1a1a1a;">Congratulations, ${after.name}!</h2>
                        
                        <p style="margin: 0 0 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 16px; line-height: 1.6; color: #4a4a4a;">Your early access to <strong>MFOURLABS</strong> has been approved. You're now part of an exclusive group building the future of first principles engineering.</p>
                        
                        <!-- Getting Started Box -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                          <tr>
                            <td style="padding: 24px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #00C853;">
                              <h3 style="margin: 0 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 18px; font-weight: 600; color: #1a1a1a;">🎯 Getting Started</h3>
                              <ol style="margin: 0; padding-left: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 15px; line-height: 1.8; color: #4a4a4a;">
                                <li style="margin-bottom: 8px;">Visit <a href="https://mfourlabs.dev" style="color: #00C853; text-decoration: none; font-weight: 600;">mfourlabs.dev</a></li>
                                <li style="margin-bottom: 8px;">Click "Lab Access" and use your credentials</li>
                                <li style="margin-bottom: 8px;">Complete your profile setup</li>
                                <li style="margin-bottom: 0;">Explore the platform and start learning</li>
                              </ol>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- CTA Button -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                          <tr>
                            <td align="center">
                              <a href="https://mfourlabs.dev" style="display: inline-block; padding: 16px 40px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 16px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Enter The Lab →</a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Access Details -->
                        <div style="margin-top: 32px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                          <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 13px; color: #6c757d;">
                            <strong style="color: #1a1a1a;">Your Access ID:</strong> ${after.accessId}
                          </p>
                          <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 13px; color: #6c757d;">
                            <strong style="color: #1a1a1a;">Email:</strong> ${after.email}
                          </p>
                        </div>
                        
                        <!-- Help Text -->
                        <p style="margin: 24px 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 14px; line-height: 1.5; color: #6c757d; text-align: center;">Need help? Reply to this email or reach out on X.</p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0 0 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 13px; line-height: 1.5; color: #6c757d; text-align: center;">© 2025 MFOURLABS. All rights reserved.</p>
                        <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; font-size: 12px; line-height: 1.5; color: #adb5bd; text-align: center;">First Principles Engineering Research Lab</p>
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
