const Methods = {
	init(){
		if (window.innerWidth < 768){
			Methods.actionFooterMobile();
		}
	},
	actionFooterMobile(){
		const elementAcordion = document.querySelectorAll('.rr-footer__wrapper--title');
		[...elementAcordion].map((el) => {
			el.addEventListener('click', () => {
				console.log(el);
				el.classList.toggle('is--active');
				el.nextElementSibling.classList.toggle('is--active');
			});
		});
	}
};

export default {
	init: Methods.init
};