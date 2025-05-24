//
// GitHub REST API R/W
//

const api_token='Z2l0aHViX3BhdF8xMUFFU01KTVkwajM4dGtTTEVpTlloX1M0QXpmWXJiSjhrWkNQSlh4VGFjYWhIWnU3NGxreEFvY3lWVlIzWW4yVHRWREhNT040V2FqTEt1UnNUCg==';
const url='https://api.github.com/repos/KyomaHooin/octopad/contents/README.md';
var current_sha='';

var spinner = document.getElementById('spinner');
var modal = new bootstrap.Modal(document.getElementById('modal'));
var note = document.getElementById('note');

// get content + SHA
async function get_content() {
	return await fetch(url, {
		method: 'GET',
		headers: {'Authorization':'Bearer ' + atob(api_token)}
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

async function display_content() {
	const ret = await get_content();
	if (ret) {
		note.value = unescape(atob(ret['content']));
		current_sha = ret['sha'];
	} else {
		modal.toggle();
	}
}

// Write content
async function put_content(text) {
	payload={
		'message': 'note',
		'committer': {
			'name': 'KyomaHooin',
			'email': 'kyomahooin@gmail.com'
		},
		'content': btoa(escape(text)),
		'sha': current_sha
	}

	return await fetch(url, {
		method: 'PUT',
		headers: {'Authorization':'Bearer ' + atob(api_token)},
		body: JSON.stringify(payload)
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

async function commit() {
	spinner.removeAttribute('hidden');
	const ret = await put_content(note.value);
	spinner.setAttribute('hidden', '');
	if (!ret) {
		modal.toggle();
	} else {
		current_sha = ret['content']['sha'];
	}
}

// init
display_content();

