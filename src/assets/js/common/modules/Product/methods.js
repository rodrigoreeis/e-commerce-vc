import Axios from 'axios';

export const mountObject = ({data}, items) => {
	const _currentData = data[0];
	const _currentItem = data[0].items[items];
	const _avalablePrice = _currentItem.sellers[0].commertialOffer;
	const _productInfo = {
		name: _currentItem.hasOwnProperty('name') ? _currentItem.name : '',
		images:	_currentItem.hasOwnProperty('images') ? getImages(data) : '',
		skuId: _currentItem.hasOwnProperty('itemId') ? _currentItem.itemId: '',
		code: _currentData.hasOwnProperty('productId') ? _currentData.productId : '',
		bestPrice: _avalablePrice.hasOwnProperty('Price') ? _avalablePrice.Price : '',
		oldPrice: _avalablePrice.hasOwnProperty('ListPrice') ? _avalablePrice.ListPrice : '',
		shotDescription: _currentData.hasOwnProperty('description') ? _currentData.description : '',
		specifications: _currentData.hasOwnProperty('allSpecifications') ? _currentData.allSpecifications.map(espec => espec) : '',
		howToUse: _currentData.hasOwnProperty('ComousarNOVO') ? _currentData.ComousarNOVO : '',
		composition: '',
	};
	return _productInfo;
};

const getImages = (data) => {
	const obj = data[0].items;
	const mountArray = []; 
	for(let i = 0; i < obj.length; i++){
		const arrayImages = obj[i].images; 
		const images = arrayImages.map(({imageUrl}) => imageUrl)
		mountArray.push(Object.assign({},images))
	}
	return mountArray;
}

export const productInfo = async (items) => {
	const { productId } = skuJson_0;
	const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
	try{
		const response = await Axios.get(endpoint)
		return mountObject(response, items)
	} catch (error){ 
		console.log(error)
	}
}