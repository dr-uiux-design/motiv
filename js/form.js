document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();

	const form = this;
	const url = "./mail.php";
	const formData = new FormData(form);

	fetch(url, {
			method: "POST",
			body: formData
		})
		.then(function (response) {
			if (response.ok) {
				document.querySelector('.modal-success').classList.add('active');
				document.body.classList.add('lock-scroll');
				form.reset();
				setTimeout(function () {
					form.dispatchEvent(new Event('reset'));
					document.querySelector('.modal-success').classList.remove('active');
				}, 2000);
			}
		})
		.catch(function (error) {
			console.error("Error:", error);
		});
});