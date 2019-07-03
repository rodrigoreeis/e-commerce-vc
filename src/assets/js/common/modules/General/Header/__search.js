import cacheSelector from '../_global-selector';
import {openOverlay, closeOverlay}from '../utils/methods';

const {$header, $globals} = cacheSelector;

const Methods = {
	init(){
		Methods.actionHeaderSearch();
		Methods.searchNavegatorClose();
	},

	actionHeaderSearch(){
		$header.searchBtn.addEventListener('click', () => {
			$header.search.classList.add('is--active');
			openOverlay();
		});
	},
	searchNavegatorClose(){
		$globals.overlay.addEventListener('click', () => {
			closeOverlay($header.search);
		});        
	},
};

export default {
	init: Methods.init
};