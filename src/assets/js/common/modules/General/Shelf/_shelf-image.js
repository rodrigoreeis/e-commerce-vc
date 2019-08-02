import GlobalSelector from '../_global-selector';

const {$shelf, $globals} = GlobalSelector;

const Methods = {
	init(){
		Methods.setImageShelf();
	},
	setImageShelf(){
		[...$shelf.image].map((image) => {
			const productsId = image.dataset.productid;
			fetch(`/api/catalog_system/pub/products/search/?fq=productId:${productsId}`)
				.then((response) => response.json())
				.then((data) => {
					const imageUrl = data[0].items[0].images[0].imageUrl;
					image.firstElementChild.setAttribute('data-lazy', 
					`${$globals.body.classList.contains('rr-body-product') 
						? Methods.__getSizeImage(imageUrl, 180)
						:Methods.__getSizeImage(imageUrl, 288)
					}`
					);
				});
		}); 
	},
	__getSizeImage(ImgSrc,size) {
		return ImgSrc.replace(/(.*?ids\/)(.*?)(\/.*)/g, `$1$2-${size}-${size}$3`).replace(/\?.*/,'');
	},
};

export default {
	init: Methods.init,
}; 
 