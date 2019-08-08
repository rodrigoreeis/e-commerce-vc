import Axios from 'axios';

export const mountObject = ({data}, items) => {
	const _currentData = data[0];
	const _currentItem = data[0].items[items];
	const _avalablePrice = _currentItem.sellers[0].commertialOffer;
	const _productInfo = {
		name: _currentItem.hasOwnProperty('name') ? _currentItem.name : '',
		video: _currentItem.hasOwnProperty('Videos') ? _currentItem.Videos[0] : '',
		images:	_currentItem.hasOwnProperty('images') ? getImages(data) : '',
		skuId: _currentItem.hasOwnProperty('itemId') ? _currentItem.itemId: '',
		code: _currentData.hasOwnProperty('productId') ? _currentData.productId : '',
		colorName: _currentItem.hasOwnProperty('Cor') ? _currentItem.Cor[0].match(/,([A-zA-Z z0-9-_]*)/g, "") : '',
		bestPrice: _avalablePrice.hasOwnProperty('Price') ? _avalablePrice.Price : '',
		oldPrice: _avalablePrice.hasOwnProperty('ListPrice') ? _avalablePrice.ListPrice : '',
		shotDescription: _currentData.hasOwnProperty('description') ? _currentData.description : '',
		composition: _currentData.hasOwnProperty('composicaonovo') ? _currentData.composicaonovo[0] : '',
		howUse: _currentData.hasOwnProperty('comousarnovo') ? _currentData.comousarnovo[0] : '',
	};
	return Object.freeze(_productInfo);
};

const getImages = (data) => {
	const obj = data[0].items;
	const mountArray = new Array; 
	for(let i = 0; i < obj.length; i++){
		const arrayImages = obj[i].images; 
		const images = arrayImages.map(({imageUrl}) => imageUrl)
		mountArray.push(Object.assign({},images))
	}
	return mountArray;
};

export const productInfo = async (items) => {
	const { productId } = skuJson_0;
	const endpoint = `/api/catalog_system/pub/products/search/?fq=productId:${productId}`
	try{
		const response = await Axios.get(endpoint)
		return mountObject(response, items)
	} catch (error){ 
		console.log(error)
	}
};

export const removeAllActives = (selector) => {
	const elements = document.querySelectorAll(selector);
	[...elements].map((el) => {
		el.classList.remove('is--active');
	})
};
