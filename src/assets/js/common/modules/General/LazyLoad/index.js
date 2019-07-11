
import GlobalSelector from '../_global-selector';

const {$globals} = GlobalSelector;

const Methods = {
	init(){
		Methods.lazyLoad();
	},
	lazyLoad(){
		const lazyLoad = target => {
			const io = new IntersectionObserver((entries, observer) => {
				[...entries].map((entry) => {
					if (entry.isIntersecting){
						const img = entry.target;
						const src = img.getAttribute('data-lazy');
						img.classList.add('has--loaded');
						img.classList.remove('has--placeloader');
						img.setAttribute('src', src);
						observer.disconnect();
					}
				});
			});
			io.observe(target);
		};
		[...$globals.lazyLoad].map((lazyLoad));
	}
};

export default {
	init: Methods.init
};