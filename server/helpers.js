const nodemailer = require('nodemailer');

const makeid = () => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

const sendEmail = (email, password) => {
	return new Promise((resolve, reject) => {
	  var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	      user: 'dungeonbuddiesdmscribe@gmail.com',
	      pass: 'hackreactoratx31'
	    }
	  });

	  var mailOptions = {
	    from: 'dungeonbuddiesdmscribe@gmail.com',
	    to: email,
	    subject: 'Sending Email using Node.js',
	    text: 'your new password is ' + password
	  };

	  transporter.sendMail(mailOptions, function(error, info){
	    if (error) {
	      reject(error)
	    } else {
	      resolve('Email sentto: ' + email)
	    }
	  });
	})
}

exports.makeid = makeid;
exports.sendEmail = sendEmail;