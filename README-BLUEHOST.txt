Bluehost + Next.js static site + PHPMailer (SMTP)
================================================

WHAT'S IN THIS ZIP
------------------
- contact.php           → your form endpoint (accepts POST, returns JSON)
- phpmailer/README.txt  → how to add PHPMailer files
- mail-test.php         → quick SMTP test helper

BEFORE YOU START
----------------
• Build your Next.js site as a static export on your computer:
    1) next.config.js → set:  output: 'export',  images: { unoptimized: true }
    2) package.json scripts: add "export": "next build && next export"
    3) Run: npm run export
    4) Upload everything inside the 'out/' folder to public_html/ on Bluehost.

• Upload this ZIP's files to the same public_html/ so paths are:
    public_html/contact.php
    public_html/mail-test.php
    public_html/phpmailer/README.txt

• Create an email mailbox in Bluehost (cPanel): e.g. no-reply@YOURDOMAIN.com

• Update SMTP settings inside contact.php:
    $SMTP_HOST = 'mail.YOURDOMAIN.com';
    $SMTP_USER = 'no-reply@YOURDOMAIN.com';
    $SMTP_PASS = 'YOUR_EMAIL_PASSWORD';
    $SMTP_PORT = 587;            // or 465 with 'ssl'
    $SMTP_SECURE = 'tls';        // or 'ssl'
    $TO_EMAIL   = 'info@MikesProHandyman.com';

• Add PHPMailer (recommended):
    - Download from https://github.com/PHPMailer/PHPMailer
    - Upload the `src/` folder into public_html/phpmailer/
    - Final paths must be:
        public_html/phpmailer/src/PHPMailer.php
        public_html/phpmailer/src/SMTP.php
        public_html/phpmailer/src/Exception.php

• DNS (deliverability):
    - In your domain DNS, add SPF and DKIM for the no-reply@YOURDOMAIN.com mailbox.
    - This helps keep messages out of spam.

TEST IT
-------
1) Visit: https://YOURDOMAIN.com/mail-test.php
   - You should see JSON from contact.php with { "ok": true } if the email sent.
   - If it fails, temporarily uncomment the debug line in contact.php to see SMTP errors.

2) From your website, your React form should POST to /contact.php:
   fetch("/contact.php", { method: "POST", body: formData })

FALLBACK (no PHPMailer)
-----------------------
If PHPMailer isn't present, contact.php will try PHP's mail() function.
It's less reliable on shared hosts, so PHPMailer+SMTP is strongly recommended.

NEED A CLASSIC FORM (no JS)?
----------------------------
Change your form element to:
  <form action="/contact.php" method="POST">
    ...
  </form>
And modify contact.php to redirect to a thank-you page instead of JSON if you prefer.

SUPPORT
-------
If you get a 500 error, check the PHP error log in Bluehost (cPanel → Errors) or
temporarily echo $mail->ErrorInfo in contact.php (do NOT leave it on production).
