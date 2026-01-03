//
// OATH JavaScript code by "gbraad"  https://gist.github.com/gbraad/2885828
// SHA-1/HMAC library by "Caligatio" https://github.com/Caligatio/jsSHA
//

const git_secret='VVBZKIJ65FDZPA44';
const proton_secret='G3EJWXRJDZ26RV4757TDP4NLIFFJTZH4';
const lab_secret='RXEFYPZXM3CCXYVYAOZCVR2BP7L4QGNI';

function dec2hex(s) {
	return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

function hex2dec(s) {
	return parseInt(s, 16);
}

function base32tohex(base32) {
	var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	var bits = "";
	var hex = "";

	for (var i = 0; i < base32.length; i++) {
		var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
		bits += leftpad(val.toString(2), 5, '0');
	}

	for (var i = 0; i+4 <= bits.length; i+=4) {
		var chunk = bits.substr(i, 4);
		hex = hex + parseInt(chunk, 2).toString(16) ;
	}
	return hex;
}

function leftpad(str, len, pad) {
	if (len + 1 >= str.length) {
		str = Array(len + 1 - str.length).join(pad) + str;
	}
	return str;
}

function oath_totp(secret) {            
	var key = base32tohex(secret);
	var epoch = Math.round(new Date().getTime() / 1000.0);
	var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, '0');

	var hmacObj = new jsSHA('SHA-1', 'HEX');
	hmacObj.setHMACKey(key, 'HEX');
	hmacObj.update(time);
	var hmac = hmacObj.getHMAC('HEX', 'SHA-1', "HEX");

	var offset = hex2dec(hmac.substring(hmac.length - 1));
	var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
	
	return (otp).substr(otp.length - 6, 6);
}

function gen_token(token) {
	switch(token) {
		case 'git':
			document.getElementById('git').textContent = oath_totp(git_secret)
		break;
		case 'proton':
			document.getElementById('proton').textContent = oath_totp(proton_secret)
		break;
		case 'lab':
			document.getElementById('lab').textContent = oath_totp(lab_secret)
		break;
	}
}

function clip(service) {
	var range = document.createRange();
	range.selectNode(document.getElementById(service));
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}

