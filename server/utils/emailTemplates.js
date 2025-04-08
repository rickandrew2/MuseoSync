export const createInquiryEmailTemplate = (name, subject) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4a5568; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { text-align: center; margin-top: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for your inquiry regarding "${subject}". We have received your message and will get back to you as soon as possible.</p>
      <p>Our team typically responds within 24-48 hours during business days.</p>
      <p>This is an automated response, please do not reply to this email.</p>
    </div>
    <div class="footer">
      <p>Museo de Malaquing Tubig</p>
      <p>123 Heritage Street, San Jose, Malaquing Tubig</p>
    </div>
  </div>
</body>
</html>
`;

export const createBookingEmailTemplate = (name, date, time, referenceCode) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1a1a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px 20px; background-color: #ffffff; }
    .booking-details { background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .reference-code { background-color: #e9ecef; padding: 15px; text-align: center; margin: 20px 0; border-radius: 8px; }
    .reference-code h2 { color: #1a1a1a; margin: 0; font-size: 24px; }
    .important-info { border-left: 4px solid #ffd700; padding-left: 15px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa; color: #666; }
    .button { display: inline-block; padding: 12px 25px; background-color: #1a1a1a; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
    .qr-code { text-align: center; margin: 20px 0; }
    .social-links { margin-top: 20px; }
    .social-links a { margin: 0 10px; color: #666; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmation</h1>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for choosing to visit Museo de Malaquing Tubig. We're excited to welcome you!</p>
      
      <div class="booking-details">
        <h3>Your Visit Details:</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>

      <div class="reference-code">
        <p><strong>Your Reference Code:</strong></p>
        <h2>${referenceCode}</h2>
        <p>Please keep this code handy during your visit</p>
      </div>

      <div class="important-info">
        <h3>Important Reminders:</h3>
        <ul>
          <li>Please arrive 15 minutes before your scheduled time</li>
          <li>Bring a valid ID for verification</li>
          <li>Face masks are recommended</li>
          <li>Photography is allowed in designated areas</li>
          <li>Follow our health and safety protocols</li>
        </ul>
      </div>

      <div class="qr-code">
        <p>For contactless entry, save or print this email.</p>
      </div>

      <p>Need to modify your booking? Contact us at:</p>
      <ul>
        <li>Email: info@museodemalaquingtubig.com</li>
        <li>Phone: +63 (123) 456-7890</li>
      </ul>

      <center>
        <a href="https://museodemalaquingtubig.com/visit-guidelines" class="button">View Visitor Guidelines</a>
      </center>
    </div>

    <div class="footer">
      <p><strong>Museo de Malaquing Tubig</strong></p>
      <p>123 Heritage Street, San Jose, Malaquing Tubig</p>
      <div class="social-links">
        <a href="#">Facebook</a> |
        <a href="#">Instagram</a> |
        <a href="#">Twitter</a>
      </div>
      <p style="font-size: 12px; margin-top: 20px;">This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`; 