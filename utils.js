
// Retruns the email from a google profile
function getEmail(profile) {
	var emails = profile.emails;
	for (var i = 0; i < emails.length; i++) {
		if(emails[i]['type'] === 'account') {
			return emails[i]['value'];
		}
 	};

 	// This should not happen.
 	return "bad";
 }

// Check if a array includes an element or not.
function exist(element, array) {
	for (var i = 0; i < array.length; i++) {
		if(element == array[i]) return true;
	};
	return false;
}

module.exports.exist = exist;
module.exports.getEmail = getEmail;