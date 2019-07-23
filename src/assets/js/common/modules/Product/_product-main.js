import Axios from 'axios';

const Methods = {
	setProductInfo([item], callback){
		const { productId } = skuJson_0;
		Axios.get(`/api/catalog_system/pub/products/search/?fq=productId:${productId}`)
			.then(({data}) => {
				const _currentData = data[0];
				const _currentItem = data[0].items[item];
				const avalablePrice = _currentItem.sellers[0].commertialOffer;
				const _productInfo = {
					name: _currentItem.hasOwnProperty('name') ? _currentItem.name : '',
					color: '',
					code: _currentData.hasOwnProperty('productId') ? _currentData.productId : '',
					shotDescription: _currentData.hasOwnProperty('description') ? _currentData.description : '',
					oldPrice: avalablePrice.hasOwnProperty('ListPrice') ? avalablePrice.ListPrice : '',
					bestPrice: avalablePrice.hasOwnProperty('Price') ? avalablePrice.Price : '',
					images:	_currentItem.hasOwnProperty('images') ? _currentItem.images.map(image => image) : '',
					specifications: _currentData.hasOwnProperty('allSpecifications') ? _currentData.allSpecifications.map(espec => espec) : '',
					howToUse: _currentData.hasOwnProperty('ComousarNOVO') ?_currentData.ComousarNOVO : '',
					composition: '',
				};
				return callback(_productInfo);
			});
	},
};

export default Methods.setProductInfo;