import Minicart from './_minicart-main';
import ShippingProgress from './_shipping-progress';

const Methods = {
	init() {
		Minicart.init();
		ShippingProgress.init();		
	}
};
export default {
	init: Methods.init
};