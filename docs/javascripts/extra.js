// console.log("hello world")
// var buttons = document.querySelectorAll("button[data-md-color-scheme]")
// buttons.forEach(function(button) {
// 	button.addEventListener("click", function() {
// 		document.body.setAttribute("data-md-color-switching", "")
// 		var attr = this.getAttribute("data-md-color-scheme")
// 		document.body.setAttribute("data-md-color-scheme", attr)
// 		var name = document.querySelector("#__code_0 code span.l")
// 		name.textContent = attr
// 		setTimeout(function() {
// 			document.body.removeAttribute("data-md-color-switching")
// 		})
// 	})
// })

document.addEventListener('DOMContentLoaded', function () {
	const alertButtons = document.querySelectorAll('.alerta');
	const nameProjectTexts = document.querySelectorAll('.project_name');
	alertButtons.forEach(function (button) {
	  button.addEventListener('click', function () {
		const swalCustomButton = Swal.mixin({
			customClass: {
				confirmButton: 'btn-primary'
			},
			buttonsStyling: false
		});
		swalCustomButton.fire({
			title: 'Proyecto Nuevo',
			input: 'text',
			inputLabel: 'Nombre para el nuevo proyecto',
			inputPlaceholder: 'Ej: django_project',
			inputValidator: (value) => {
				if (!value) {
					return '¡Necesitas escribir un nombre!';
				}
		  	},
			animation: false,
			confirmButtonText: 'Aceptar'
		}).then((name_project) => {
			if (name_project.isConfirmed) {
				swalCustomButton.fire({
					title: 'Sistema Operativo',
					input: 'select',
					inputOptions: {
						linux: "Linux, macOS",
						window: "Windows"
					},
					inputLabel: 'Selecciona tu S.O'
				}).then((platform) => {
					if (platform.isConfirmed) {
						const instrucciones = document.querySelector(".instrucciones");
						nameProjectTexts.forEach(function (element) {
							element.innerHTML = name_project.value;
						});
						if (platform.value === 'window') {
							document.querySelector('.venv_so').style.display = 'none';
							document.querySelector('.command_so').textContent = 'python';
							document.querySelector('.venv_path').textContent = '.venv\\Scripts\\activate';
						}
						instrucciones.style.display = "block";
					}
				})
			}
		})
	  });
	});


  });
  
// function loadMarkdown() {
// 	const filePath = '/assets/content_new_project.txt';

// 	fetch(filePath)
// 		.then(response => response.text())
// 		.then(data => {
// 			const htmlContent = marked.parse(data);
// 			document.querySelector('.content_add').innerHTML = htmlContent;
// 		})
// 		.catch(error => console.error('Error al cargar el archivo Markdown:', error));
// }
