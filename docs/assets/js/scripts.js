function initPage(page = 'home') {
	addNavbar(page);
	addFooter();

	if (typeof AnchorJS !== 'undefined') {
		const anchors = new AnchorJS();

		anchors.options = {
			placement: 'left',
			icon: '#'
		};

		anchors.add('.anchor');
	}
}


function addNavbar(page = 'home') {
	const navbar = `
		<nav class="navbar navbar-expand-md navbar-dark fixed-top">
			<div class="container">
				<a class="navbar-brand" href="index.html">bootstrap &bull; <span class="fw-600 text-info">modbox</span></a>

				<div class="vr mx-4 d-none d-md-inline-block"></div>

				<div class="offcanvas offcanvas-end p-5 pt-4 p-md-0" id="nav-canvas" tabindex="-1">
					<div class="offcanvas-header p-0 mb-2">
						<a class="navbar-brand" href="index.html">bootstrap &bull; <span class="fw-600 text-info">modbox</span></a>
						<button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
					</div>
					<div class="offcanvas-body p-0">
						<hr class="text-white">
						<div class="navbar-nav">
							<a class="nav-link" href="index.html" id="nav-home">Home</a>
							<a class="nav-link" href="docs.html" id="nav-docs">Documentation</a>
							<a class="nav-link" href="examples.html" id="nav-examples">Examples</a>
						</div>

						<div class="d-block d-md-none mt-4">
							<a href="https://github.com/erobertson42/bootstrap-modbox" target="_github" title="View bootstrap-modbox on GitHub">
								<img src="assets/images/GitHub-Mark-Light-64px.png" class="me-1" height="32"><img src="assets/images/GitHub_Logo_White.png" height="32">
							</a>
						</div>
					</div>
				</div>

				<a href="https://github.com/erobertson42/bootstrap-modbox" target="_github" title="View bootstrap-modbox on GitHub">
					<img src="assets/images/GitHub-Mark-Light-64px.png" class="d-none d-lg-inline me-1" height="32"><img src="assets/images/GitHub_Logo_White.png" class="d-none d-md-inline" height="32">
				</a>

				<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#nav-canvas">
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>
		</nav>
	`.trim();

	document.querySelector('body').insertAdjacentHTML('afterbegin', navbar);

	if (page) {
		document.getElementById(`nav-${page}`).classList.add('active');
	}

	initNavObserver();
}


function addFooter() {
	const footer = `
		<footer class="bg-dark">
			<div class="container">
				<div class="text-center">
					&copy; 2021-2022 Eric Robertson and released under the <a href="https://github.com/erobertson42/bootstrap-modbox/blob/main/LICENSE" target="_license">MIT License</a>
				</div>
			</div>
		</footer>
	`.trim();

	document.querySelector('main').insertAdjacentHTML('afterend', footer);
}


// nav bar transitions
function initNavObserver() {
	new IntersectionObserver(entries => {
			const navbar = document.querySelector('nav.navbar');

			if (entries[0].intersectionRatio !== 1) {
				navbar.classList.add('navbar-stuck');
			}
			else {
				navbar.classList.remove('navbar-stuck');
			};
		},
		{ threshold: 1 }
	).observe(document.querySelector('header'));
}


function initExamples() {
	document.querySelectorAll('button[data-example]').forEach(el => {
		el.addEventListener('click', () => runExample(el.dataset.example));
	});
}


function runExample(id) {
	const el = document.getElementById(id);

	if (el) {
		new Function(`"use strict"; ${el.innerText}`)();
	}
};
