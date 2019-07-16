import cacheSelector from '../_global-selector';
import {openOverlay, closeOverlay}from '../utils/methods';

const {$header,$globals} = cacheSelector;

const Methods = {
	init(){
		Methods.openMenu();
		Methods.closeMenu();
	},
	openMenu(){
		$header.openMenu.addEventListener('click', (event) => {
			openOverlay();
			$header.menu.classList.add('is--active');
			event.stopPropagation();
		});
	},
	closeMenu(){
		$globals.overlay.addEventListener('click', () => {
			closeOverlay($header.menu);
		});
	},
};

export default {
	init: Methods.init
};