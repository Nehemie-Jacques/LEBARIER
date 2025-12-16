import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface SendPasswordResetEmailParams {
  to: string;
  firstName: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  to,
  firstName,
  resetUrl,
}: SendPasswordResetEmailParams) {
  try {
    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@lebarbier.cm',
        name: process.env.SENDGRID_FROM_NAME || 'LE BARBIER',
      },
      subject: 'Réinitialisation de votre mot de passe - LE BARBIER',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Inter', Arial, sans-serif;
              line-height: 1.6;
              color: #2D2D2D;
              background-color: #FAFAF8;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #FFFFFF;
              border: 4px solid #C9A961;
            }
            .header {
              background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);
              padding: 40px;
              text-align: center;
            }
            .logo {
              font-family: 'Playfair Display', serif;
              font-size: 36px;
              font-weight: bold;
              color: #C9A961;
            }
            .content {
              padding: 40px;
            }
            h1 {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              color: #1A1A1A;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background-color: #C9A961;
              color: #1A1A1A;
              text-decoration: none;
              padding: 16px 32px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin: 20px 0;
            }
            .warning-box {
              background-color: #FFF3CD;
              border-left: 4px solid #B8860B;
              padding: 15px;
              margin: 20px 0;
            }
            .footer {
              background-color: #1A1A1A;
              color: #999999;
              padding: 30px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">LE BARBIER</div>
            </div>

            <div class="content">
              <h1>Réinitialisation du mot de passe</h1>
              
              <p>Bonjour ${firstName},</p>
              
              <p>Vous avez demandé à réinitialiser le mot de passe de votre compte LE BARBIER.</p>

              <p>Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>

              <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>

              <div class="warning-box">
                <strong>⚠️ Important :</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Ce lien est valable pendant <strong>1 heure</strong></li>
                  <li>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email</li>
                  <li>Pour des raisons de sécurité, ce lien ne peut être utilisé qu'une seule fois</li>
                </ul>
              </div>

              <p style="font-size: 14px; color: #6B6B6B; margin-top: 30px;">
                Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>
                <a href="${resetUrl}" style="color: #C9A961; word-break: break-all;">${resetUrl}</a>
              </p>

              <p style="margin-top: 30px;">
                Cordialement,<br>
                <strong style="color: #C9A961;">L'équipe LE BARBIER</strong>
              </p>
            </div>

            <div class="footer">
              <p>
                LE BARBIER<br>
                Bastos, Yaoundé, Cameroun<br>
                +237 6XX XXX XXX<br>
                contact@lebarbier.cm
              </p>
              <p style="margin-top: 20px; font-size: 11px;">
                © ${new Date().getFullYear()} LE BARBIER. Tous droits réservés.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Réinitialisation du mot de passe - LE BARBIER

Bonjour ${firstName},

Vous avez demandé à réinitialiser le mot de passe de votre compte.

Cliquez sur ce lien pour créer un nouveau mot de passe :
${resetUrl}

⚠️ Important :
- Ce lien est valable pendant 1 heure
- Si vous n'avez pas demandé cette réinitialisation, ignorez cet email

Cordialement,
L'équipe LE BARBIER
      `,
    };

    await sgMail.send(msg);
    console.log('✅ Email de reset password envoyé à:', to);
  } catch (error) {
    console.error('❌ Erreur envoi email reset:', error);
    throw error;
  }
}