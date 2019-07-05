import cacheSelector from '../_global-selector';

const {$header} = cacheSelector;

const Methods = {
	init(){
		if (window.innerWidth < 768) {
			Methods.openCategoryMobile();
			Methods.closeCategoryMobile();
		}
	},
	openCategoryMobile(){
		[...$header.category].map((items) => {
			items.addEventListener('click', (event) => {
				event.currentTarget.lastChild.classList.add('is--active--mobile');
				event.stopPropagation();
			});
		});
	},
	closeCategoryMobile(){
		[...$header.categoryClose].map((close) => {
			close.addEventListener('click', ({currentTarget}) => {
				currentTarget.parentNode.classList.remove('is--active--mobile');
				console.log('tentando remover esse vagabundo');
			});
		});
	}
};

export default {
	init: Methods.init
};