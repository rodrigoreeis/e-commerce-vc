import Mobile from './__footer-mobile';
import Newsletters from './__footer-newsletter';

const Methods = {
	init() {
		Mobile.init();
		Newsletters.init();
	}
};
export default {
	init: Methods.init
};