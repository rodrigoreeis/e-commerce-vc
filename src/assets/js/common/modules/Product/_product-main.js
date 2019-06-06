// const Methods = {
// 	init() {
// 		// Methods.checkProductStock();
// 	},
//   	checkProductStock() {
// 		const _productId = skuJson_0.productId;
// 		fetch(`/api/catalog_system/pub/products/search/?fq=productId:${_productId}`)
// 			.then((response) => response.json())
// 			.then((response) => {
// 				Methods.__productThumbImageInside(response);
// 				Methods.__productInStock(response);
// 			}).catch((error) => {
// 				console.log('bar eae', error.message);
// 			});
//    },
//    /**
// 	* @access private
// 	*/
//    	__productInStock(response){
// 		const btnProduct = document.querySelector('.buy-button');
// 		const avaliableProduct = response[0].items[0].sellers[0].commertialOffer.AvailableQuantity
// 		if(avaliableProduct == 0 || avaliableProduct == undefined) {
// 			btnProduct.style.pointerEvents = 'none';
// 			btnProduct.style.background = 'grey'
// 		}
// 	   },
// 	/**
// 	* @access private
// 	*/	
//    	__productThumbImageInside(response){
// 		const arrayThumb = [];
// 		const thumbs = document.querySelectorAll('.select label')
// 		console.log(thumbs)
// 		response[0].items.map((thumbSku) => {
// 			arrayThumb.push(thumbSku.images)
// 		})
// 		console.log(arrayThumb)
// 		for(let i = 0; i < arrayThumb.length ; i++) {
// 			for(let j = 0; j < arrayThumb[i].length ;j++){
// 				if(arrayThumb[i].length - 1 == j){
// 					const itemsArray =(arrayThumb[i][j].imageUrl)
// 					console.log(itemsArray)
// 					thumbs[i].style.setProperty('background', `url('${itemsArray}')`, 'important')
// 				}
// 			}
// 		}
// 	},
// }; 

// export default {
// 	init: Methods.init,
// };
