//
// GitHub REST API R/W
//

const api_token='Z2l0aHViX3BhdF8xMUFFU01KTVkwajM4dGtTTEVpTlloX1M0QXpmWXJiSjhrWkNQSlh4VGFjYWhIWnU3NGxreEFvY3lWVlIzWW4yVHRWREhNT040V2FqTEt1UnNUCg==';
const url='https://api.github.com/repos/KyomaHooin/octopad/contents/README.md';
var current_sha='';

var spinner = document.getElementById('spinner');
var modal = new bootstrap.Modal(document.getElementById('modal'));

// Get content + SHA
async function get_content() {
	return await fetch(url, {
		method: 'GET',
		headers: {'Authorization':'Bearer ' + atob(api_token)}
	})
	.then(response => response.json())
	.then(data => {
		 return data;
	})
	.catch(error => {
		console.error(error);
		return false;
	});
}

async function display_content() {
	const ret = await get_content();
	if (ret.length !== 0) {
		document.getElementById('note').value = unescape(atob(ret['content']));
		current_sha = ret['sha'];
	}
}

display_content();

// Write content
async function put_content(text) {
	payload={
		'message':'note',
		'committer':{
			'name':'KyomaHooin',
			'email':'kyomahooin@gmail.com'
		},
		'content': btoa(escape(text)),
		'sha': current_sha
	}

	return await fetch(url, {
		method: 'PUT',
		headers: {'Authorization':'Bearer ' + 'test'},
		body: JSON.stringify(payload)
	})
	.then(response => response.json())
	.then(data => {
		 return data;
	})
	.catch(error => {
		console.error(error);
		return false;
	});
}

async function commit() {
	
	spinner.removeAttribute('hidden');
	const ret = await put_content(document.getElementById('note').value);
	spinner.setAttribute('hidden', '');
	if (!ret) {
		modal.toggle();
	}
}
