const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export default function sendMail(email, templateId, templateVariables) {
  const sender = {
    email: "bookings@mylily.health",
    name: "Lily Health",
  };
  const recipients = [
    {
      email,
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      template_uuid: templateId,
      template_variables: templateVariables,
    })
    .then(console.log)
    .catch(console.error);
}
