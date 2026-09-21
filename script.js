// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
	const isOpen = navLinks.classList.toggle('open');
	menuToggle.setAttribute('aria-expanded', isOpen);
	menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
	link.addEventListener('click', () => {
		navLinks.classList.remove('open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open menu');
	});
});

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll('main section[id]');
const navigationItems = document.querySelectorAll('.nav-links a');

const updateActiveLink = () => {
	let currentSection = 'home';

	sections.forEach((section) => {
		if (window.scrollY >= section.offsetTop - 150) {
			currentSection = section.id;
		}
	});

	navigationItems.forEach((item) => {
		item.classList.toggle('active', item.getAttribute('href') === `#${currentSection}`);
	});
};

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Reveal content as it enters the viewport.
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
