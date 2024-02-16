
// MODAL

modal = new bootstrap.Modal(document.getElementById('modal'));

// TOKEN

const url = 'https://api.github.com/repos/kyomahooin/Sakura/contents/';
const base = 'Z2l0aHViX3BhdF8xMUFFU01KTVkwdFZUbkRscldNaEtSXw==';
const cdn = 'https://cloud.fastshare.cz/share/download/';

var f;

// API GET

async function get_content(fn, tn) {
	console.error(fn);
	return await fetch(url + fn, {
		method: 'GET',
		headers: {'Authorization':'Bearer ' + atob(base) + tn}
	})
	.then(response => {
		if (response.ok) {
			return response.json();
		}
		return false;
	})
	.catch(error => {
		console.error(error);
		return false;
	});
}

// MOD

function mod(fn) {
	f = fn;
	modal.toggle();
}

// SUBMIT

async function submit() {
	t = document.getElementById('modal-token').value;
	ret = await get_content(f, t);
	if (!ret) {
		document.getElementById('modal-token').value = '失敗しました';
	} else {
		modal.toggle();
		const link = document.createElement("a");
		link.href = cdn + unescape(atob(ret['content']));
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}

