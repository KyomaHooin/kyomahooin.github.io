
// TOKEN

const url = 'https://api.github.com/repos/kyomahooin/Sakura/contents/';
const token_base = 'Z2l0aHViX3BhdF8xMUFFU01KTVkwdFZUbkRscldNaEtSXw==';
var file = '';

// API GET CONTENT

async function get_content(fn, token) {
	console.error(url + fn);
	console.error(token_base + token);
	//return await fetch(url + fn, {
	return await fetch(url + 'README.md', {
		method: 'GET',
		headers: {
			'Authorization':'Bearer ' + atob(token_base) + token,
			'Accept':'application/vnd.github.raw'
		}
	})
	.then(response => {
		if (response.ok) {
			return response.blob();
		}
		return false;
	})
	.catch(error => {
		console.error(error);
		return false;
	});
}

// MODAL

modal = new bootstrap.Modal(document.getElementById('modal'));

function mod(fn) {
	modal.toggle();
	file = fn;
}

async function on_confirm() {
	token = document.getElementById('modal-token').value;
	const ret = await get_content(file, token);
	if (!ret) {
		document.getElementById('modal-token').value = '失敗しました';
	} else {
		modal.toggle();
		var a = document.createElement("a");
		a.style = "display: none";
		document.body.appendChild(a);
		var f = window.URL.createObjectURL(ret);
		a.href = f;
		a.download = file;
		a.click();
		window.URL.revokeObjectURL(f);
	}
}

