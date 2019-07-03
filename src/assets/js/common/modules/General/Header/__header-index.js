import Header from './__header-main';
import HeaderSearch from './__search';
import HeaderMobile from './__actions-mobile';

const Methods = {
	init() {
		Header.init();
		HeaderSearch.init();
		HeaderMobile.init();
	}
};

export default {
	init: Methods.init
};