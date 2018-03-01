module.exports.email = {
  service: "Mailgun",
  auth: {
    user: "postmaster@sandbox85aaf2478e5b4627b55613bcde2a7080.mailgun.org",
    pass: "709f7788a80ab95bd8f180fb535cb1cb"
  },
  templateDir: "api/emailTemplates",
  from: "info@gaussdev.hr",
  testMode: false,
  ssl: true
};