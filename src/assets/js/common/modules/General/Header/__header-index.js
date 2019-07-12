import Header from './__header-main';
import HeaderMobile from './__actions-mobile';

const Methods = {
	init() {
		Header.init();
		HeaderMobile.init();
	}
};

export default {
	init: Methods.init
};