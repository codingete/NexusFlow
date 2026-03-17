export function generateForgotPasswordEmailTemplate(resetUrl) {
return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">

<!-- Header -->
<div style="text-align: center; margin-bottom: 20px;">
<h2 style="color: #1d4e16; margin: 0;">FYP SYSTEM - 🔒 Password Reset Request</h2>
<p style="font-size: 14px; color: #667280; margin: 5px 0 0;">Secure access to your learning journey</p>
</div>

<!-- Body -->
<p style="font-size: 16px; color: #374151;">Dear User,</p>
<p style="font-size: 16px; color: #374151;">
We received a request to reset your password. Please click the button below to set up a new one:
</p>

<!-- Button -->
<div style="text-align: center; margin: 30px 0;">
<a href="${resetUrl}"
style="display: inline-block; font-size: 16px; font-weight: bold; background-color: #1d4e16; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
Reset Password
</a>
</div>

<!-- Expiry & Fallback -->
<p style="font-size: 15px; color: #374351;">
If you did not request this, you can safely ignore this email. This link will expire in <b>15 minutes</b>.
</p>
<p style="font-size: 15px; color: #374351;">
If the button above doesn't work, copy and paste the following link into your browser:
</p>

<!-- Link (for clients that block buttons) -->
<p style="font-size: 14px; color: #3B82F6; word-wrap: break-word; text-align: center;">
${resetUrl}
</p>
<!-- Footer -->
<footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #6B7280;">
Thank you,<br><strong>FYP System Team</strong>
<p style="font-size: 12px; color: #9CA3AF;">This is an automated message. Please do not reply to this email.</p>
</footer>
</div>
`;
}
