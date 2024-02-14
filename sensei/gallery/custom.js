
// MODAL

modal = new bootstrap.Modal(document.getElementById('modal'));

function image_modal(img) {
	document.getElementById('modal-image').src = img;
	modal.toggle();
}

function image_close() { modal.toggle();}

