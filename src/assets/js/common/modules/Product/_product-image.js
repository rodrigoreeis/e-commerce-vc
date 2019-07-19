import Product from './_product-main';


const Methods = {
	init() {
		Methods.test();
	},

	test(){
		console.log(Product._productInfo);
	}

};

export default {
	init: Methods.init
};