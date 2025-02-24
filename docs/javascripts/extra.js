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

String.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')  // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};

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
					inputLabel: 'Selecciona tu S.O',
					animation: false
				}).then((platform) => {
					if (platform.isConfirmed) {
						nameProjectTexts.forEach(function (element) {
							element.innerHTML = name_project.value.slugify();
						});
						const isWindow = platform.value === 'window';
						const venv_path = isWindow ? '.\\venv\\Scripts\\activate' : 'venv/bin/activate';
						const commmand_source = isWindow ? { python:'python', activate: ''} : {python:'python3', activate: 'source '};
						document.querySelector('.venv_path').textContent = venv_path;
						document.querySelector('.command_so').textContent = commmand_source.python;
						document.querySelector('.activate').textContent = commmand_source.activate;
						document.querySelector(".instrucciones").style.display = "block";
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
