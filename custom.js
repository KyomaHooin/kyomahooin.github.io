
//π
var p = false;
document.addEventListener('keydown', (e) => { if (e.shiftKey && e.ctrlKey ) { p = true; }});
document.addEventListener('keyup', (e) => { if (e.shiftKey || e.ctrlKey ) { p = false; }});

function pi() { if(p) { window.location.href = "/2fa"; }}

