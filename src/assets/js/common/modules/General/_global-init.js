// import 'whatwg-fetch';
import GlobalSelector from './_global-selector';
import Modals from './Modal/_modal-index';
import Shelf from './Shelf/_shelf-index';
import Order from './Order/_order-index';
import Header from './Header/__header-index';
import Footer from './Footer/__footer-index';
import Minicart from './Minicart/_minicart-index';
import LazyLoad from './LazyLoad';

const { $loader } = GlobalSelector;

const Methods = {
	init() {
		Methods.redirectTbb();	
		Shelf.init();
		LazyLoad.init();
		Methods.ajaxLoader();
		Modals.init();
		Order.init();
		Header.init();
		Footer.init();
		Minicart.init();
	},
	redirectTbb(){
		window.location.href = "https://thebeautybox.com.br"
	}
};
export default {
	init: Methods.init
};