import ProductThumb from './_product-thumb';
import ProductDescription from './_product-description';
import ProductImage from './_product-image';
import ProductScroll from './_product-buy-scroll';
import ProductShelfs from './_product-shelfs';
import ProductThumbMobile from './_product-thumb-mobile';
import ProductWarnMe from './_product-warn-me';

export default {
	init() {
		ProductImage.init();
		ProductThumb.init();
		ProductDescription.init();
		ProductScroll.init();
		ProductShelfs.init();
		ProductThumbMobile.init();
		ProductWarnMe.init();
	},
};  