module.exports.sendWelcomeMail = function(obj) {
  sails.hooks.email.send(
    "welcomeEmail",
    {
      Name: obj.username
    },
    {
      to: obj.email,
      subject: "Uspješna registracija na Posao.hr"
    },
    function(err) {
      console.log(err || "Mail Sent!");
    }
  );
}