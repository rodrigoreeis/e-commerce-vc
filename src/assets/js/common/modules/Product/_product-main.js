const Methods = {
	init() {
    	Methods.checkProductStock();
	  },
	  
  	checkProductStock() {
		const _productId = skuJson_0.productId;
		const btnProduct = document.querySelector('.buy-button');
		fetch(`/api/catalog_system/pub/products/search/?fq=productId:${_productId}`)
			.then((response) => response.json())
			.then((response) => {
				const avaliableProduct = response[0].items[0].sellers[0].commertialOffer.AvailableQuantity
				if(avaliableProduct == 0 || avaliableProduct == undefined) {
					btnProduct.style.pointerEvents = 'none';
					btnProduct.style.background = 'grey'
					console.log('é zeroeeee');
				}
			}).catch((error) => {
				console.log('bar', error.message);
			});
   },
}; 

export default {
	init: Methods.init,
};
