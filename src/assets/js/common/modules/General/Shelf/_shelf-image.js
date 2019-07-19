import GlobalSelector from '../_global-selector';

const {$shelf} = GlobalSelector;

const Methods = {
	init(){
		Methods.setImageShelf();
	},
	__getSizeImage(ImgSrc,size) {
		return ImgSrc.replace(/(.*?ids\/)(.*?)(\/.*)/g, `$1$2-${size}-${size}$3`).replace(/\?.*/,'');
	},

	setImageShelf(){
		[...$shelf.image].map((image) => {
			const productsId = image.dataset.productid;
			fetch(`/api/catalog_system/pub/products/search/?fq=productId:${productsId}`)
				.then((response) => response.json())
				.then((data) => {
					const imageUrl = data[0].items[0].images[0].imageUrl;
					image.firstElementChild.setAttribute('data-lazy', `${Methods.__getSizeImage(imageUrl, 288)}`);
				});
		}); 
	},
};

export default {
	init: Methods.init,
}; 
 