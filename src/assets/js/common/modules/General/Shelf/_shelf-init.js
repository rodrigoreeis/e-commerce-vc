import GlobalSelector from '../_global-selector';

const {$shelf} = GlobalSelector;

const Methods = {
	init(){
		Methods.initYourViewsStars();
		Methods.removeTrashShelf();
		setTimeout(() => {
			Methods.removeEmptyStars();
		}, 3000);
	},
	removeTrashShelf(){
		for(let i = 0; i < $shelf.firstTrashShelf.length ;i++){
			$shelf.firstTrashShelf[i].remove();
			$shelf.secondTrashShelf[i].remove();
		};
		[...$shelf.vtexHelper].map(el => el.remove());
	},
	initYourViewsStars(){
		const yourViews = document.createElement('script');
        yourViews.type = 'text/javascript';
        yourViews.async = true;
        yourViews.id = '_yvsrc';
        yourViews.src = "//service.yourviews.com.br/script/44f7277f-9dfa-458d-b9d7-f2db830332fe/yvapi.js";
        const script = document.getElementsByTagName('script')[0];
		script.parentNode.insertBefore(yourViews, script);
	},
	removeEmptyStars(){
		const stars = document.querySelectorAll('.yv-bootstrap');
		[...stars].map((el) => {
			if(el.childElementCount === 5){
				el.classList.add('is--inactive')
			}
		});
	},
};

export default {
	init: Methods.init,
}; 
 