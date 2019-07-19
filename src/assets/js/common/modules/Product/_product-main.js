import cacheSelector from './_cache-selector';
import {productSearch}from './methods';

// const selector = cacheSelector;

const Product = {
	
	init(){
		Product.setProductInfo([0]);
	},

	setProductInfo([item]){
		const productInfo = {
			name: '',
			color: '',
			code: '',
			shotDescription: '',
			oldPrice: '',
			bestPrice: '',
			images: [],
			specifications: [],
			howToUse: '',
			composition: '',
			description: ''
	
		};
		productSearch()
			.then((result) => {
				const _currentData = result[0];
				const _currentItem = result[0].items[item];
				const avalablePrice = _currentItem.sellers[0].commertialOffer;
				productInfo.name = _currentItem.hasOwnProperty('name') ? _currentItem.name : '';
				productInfo.code = _currentData.hasOwnProperty('productId') ? _currentData.productId : '';
				productInfo.specifications = _currentData.hasOwnProperty('allSpecifications') ? _currentData.allSpecifications.map(espec => espec) : '';
				productInfo.images = _currentItem.hasOwnProperty('images') ? _currentItem.images.map(image => image) : '';
				productInfo.shotDescription = _currentData.hasOwnProperty('description') ? _currentData.description : '';
				productInfo.howToUse = _currentData.hasOwnProperty('ComousarNOVO') ?_currentData.ComousarNOVO : '';
				if (avalablePrice.AvailableQuantity) {
					productInfo.oldPrice = avalablePrice.hasOwnProperty('ListPrice') ? avalablePrice.ListPrice : '';
					productInfo.bestPrice = avalablePrice.hasOwnProperty('Price') ? avalablePrice.Price : '';
				}
				console.log(productInfo);
			});
		return productInfo;
	},
};

export default Product;
