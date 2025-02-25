String.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, separator);
};

String.prototype.capitalize = function () {
    return this.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}


const txts = {
	windows: {
		txt1: 'para abrir la ventana de "Ejecutar".',
		txt2: /*html*/`Escribe <strong>cmd</strong> en el campo de texto y presiona <span class="keys"><kbd class="key-enter">Enter</kbd></span> o haz clic en "Aceptar". Esto abrirá la terminal de comandos de Windows (símbolo del sistema).`,
	},
	linux: {
		txt1: /*html*/`o busca <strong>Terminal</strong> en tu lanzador de aplicaciones para abrir la terminal en Linux.`
	},
	mac: {
		txt1: /*html*/`para abrir el <strong>Spotlight</strong>, luego escribe <strong>Terminal</strong> y presiona <span class="keys"><kbd class="key-enter">Enter</kbd></span>.`
	}
}
const keys = {
	windows: {
		key1: /*html*/`<kbd class="key-windows">Win</kbd><span>+</span><kbd class="key-r">R</kbd>`,
	},
	linux: {
		key1: /*html*/`<kbd class="key-control">Ctrl</kbd><span>+</span><kbd class="key-alt">Alt</kbd><span>+</span><kbd class="key-t">T</kbd>`
	},
	mac: {
		key1: /*html*/`<kbd class="key-command">Cmd</kbd><span>+</span><kbd class="key-space">Space</kbd>`
	}
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
						linux: "Linux",
						windows: "Windows",
						mac: "macOS"
					},
					inputLabel: 'Selecciona tu S.O',
					animation: false
				}).then((platform) => {
					if (platform.isConfirmed) {
						nameProjectTexts.forEach(function (element) {
							element.innerHTML = name_project.value.slugify();
						});
						const isWindow = platform.value === 'windows';
						const venv_path = isWindow ? '.\\venv\\Scripts\\activate' : 'venv/bin/activate';
						const docpath = isWindow ? '%UserProfile%\\Documents\\' : '~/Documents/';
						let platform_steps;

						if (isWindow) {
							platform_steps = {
								python: 'python',
								key: keys.windows,
								txt: txts.windows,
								activate: ''
							};
						} else if (platform.value === 'linux') {
							platform_steps = {
								python: 'python3',
								key: keys.linux,
								txt: txts.linux,
								activate: 'source '
							};
						} else if (platform.value === 'mac') {
							platform_steps = {
								python: 'python3',
								key: keys.mac,
								txt: txts.mac,
								activate: 'source '
							};
						}
						document.querySelector('#key_1').innerHTML = platform_steps.key.key1;
						document.querySelector('#txt_1').innerHTML = platform_steps.txt.txt1;
						document.querySelector('.venv_path').textContent = venv_path;
						document.querySelector('.docpath').querySelector('code').textContent = 'cd ' + docpath;
						document.querySelector('.command_so').textContent = platform_steps.python;
						document.querySelector('.activate').textContent = platform_steps.activate;
						document.querySelector(".platform").innerHTML = platform.value === 'mac' ? 'macOS' : platform.value.capitalize();
						document.querySelector('#extra_win1').style.display = isWindow ? 'block': 'none';
						document.querySelector(".instrucciones").style.display = "block";
					}
				})
			}
		})
	  });
	});


  });
