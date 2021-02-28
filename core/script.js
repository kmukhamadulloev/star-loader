const keyframes = [
	{opacity: 0, transform: 'translate3d(-300%, 0, 0)'},
    {opacity: .7, transform: 'translate3d(5%, 0, 0)'},
    {opacity: 1, transform: 'translate3d(0, 0, 0)'}
];

function files(filename = "") {
	let filelist = document.getElementById('filelist');
	filelist.innerHTML = "";
	let fd = new FormData();
	fd.append('filename', filename);

	let files = fetch("core/core.php?action=getlist", {
		method: "POST",
		body: fd,
	}).then(response => response.json()).then(success => {
		for (let i = 0; i <= success.length - 1; i++) {
			let msg = document.createElement('a');
			msg.className = "card";
			msg.href = success[i].replace("..\\", "");
			msg.hidden = true;
			msg.target = "_blank";
			let end = (success[i].length > 40) ? "..." : "";
			msg.innerText = success[i].replace("..\\files\\", "").slice(0, 40).slice(0, -4) + end;
			msg.animate(keyframes, {
				duration: 400,
				delay: i * 100,
				fill: 'forwards'
			});
			msg.hidden = false;
			filelist.append(msg);
		}
	}).catch(error => {
		console.log(error);
	});
}

document.addEventListener("DOMContentLoaded", function() {
	files();
	
	document.getElementById('menu').addEventListener('click', function(e) {
		if (document.getElementById('menu-content').style.maxHeight) {
			document.getElementById('menu-content').style.maxHeight = null;
		} else {
			document.getElementById('menu-content').style.maxHeight = this.scrollHeight + 'px';
		}
	});
	
	document.getElementById('file').addEventListener('change', function(e) {
		e.preventDefault();
		if (this.files.length > 0) {
			document.getElementById('upload').requestSubmit();
		}
	});

	document.getElementById('upload').addEventListener('submit', function(e) {
		e.preventDefault();
		let data = new FormData(document.getElementById('upload'));
		let response = 
		fetch('core/core.php?action=upload', {
			method: "POST",
			body: data
		}).then(response => response.json()).then(success => {
			console.log(success);
			for (let i = 0; i <= success.length - 1; i++) {
				let msg = document.createElement('div');
				msg.className = "cl-12 alert-ok";
				msg.innerText = success[i].message;
				msg.addEventListener('click', function(e) {
					let anime = msg.animate(keyframes, {
						duration: 400,
						fill: 'backwards',
						direction: 'reverse'
					});
					
					anime.addEventListener('finish', function() {
						msg.hidden = true;
					});
				});
				document.getElementById('message').append(msg);
				msg.animate(keyframes, {
					duration: 400,
					fill: 'forwards',
					delay: i * 100
					
				});
				files();
			}
		}).catch(error => {
			console.log(error);
			let msg = document.createElement('div');
			msg.className = "cl-12 alert-no";
			msg.innerText = error.message;
			document.getElementById('message').append(msg);
			msg.animate(keyframes, {
				duration: 400,
				fill: 'forwards'
			});
		});
	});

	document.getElementById('search-data').addEventListener('input', function(e) {
		e.preventDefault();
		files(document.getElementById('search-data').value);
	});
});