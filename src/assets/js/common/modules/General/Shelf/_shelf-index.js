import SetImageShelf from './_shelf-image';
import initShelf from './_shelf-init';

const Methods = {
	init() {
		SetImageShelf.init();
		initShelf.init();
	}
};
export default {
	init: Methods.init
};