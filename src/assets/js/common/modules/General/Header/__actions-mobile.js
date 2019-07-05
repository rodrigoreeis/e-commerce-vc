import cacheSelector from '../_global-selector';

const {$header} = cacheSelector;

const Methods = {
	init(){
		if (window.innerWidth < 768) {
			Methods.openCategoryMobile();
			// Methods.closeCategoryMobile();
		}
	},
	openCategoryMobile(){
		[...$header.category].map((items) => {
			items.addEventListener('click', ({currentTarget}) => {
				console.log('clicado');
				if (!currentTarget.lastChild.classList.contains('is--active--mobile')){
					currentTarget.lastChild.classList.add('is--active--mobile');
					console.log('adicionando dnv');
				}else {
					console.log('tentando remover o vagabundo');
					currentTarget.lastChild.classList.remove('is--active--mobile');
				}
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