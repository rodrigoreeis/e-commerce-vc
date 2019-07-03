import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import GlobalSelector from './_global-selector';
import Modals from './Modal/_modal-index';
import Order from './Order/_order-index';
import Header from './Header/__header-index';
import Footer from './Footer/__footer-index';
import Minicart from './Minicart/_minicart-index';

const {$loader} = GlobalSelector;

const Methods = {
	init() {
		Methods.ajaxLoader();
		Modals.init();
		Order.init();
		Header.init();
		Footer.init();
		Minicart.init();
	},
	ajaxLoader(){
		$loader.shelf.classList.add('is--remove');
	}
};
export default {
	init: Methods.init
};