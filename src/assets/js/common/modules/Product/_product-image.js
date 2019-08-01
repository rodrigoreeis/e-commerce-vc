import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;

const Methods  = {
    init() {
        Methods.getImages();
    },
    getImages(){
        METHODS.productInfo(0)
            .then((response) => {
                Methods.__createElementsImage(response);
                Methods.__showImage(0);
            })
    },
    __createElementsImage(response) {
		for(let i = 0; i < response.images.length; i++){
			const currentUrl =  Object.values(response.images[i])
			const listImage = document.createElement('ul');
			listImage.classList.add('js--image--slick');
			listImage.classList.add('rr-product__image');
			listImage.classList.add('rr-product')
			product.image.appendChild(listImage);
			listImage.setAttribute('data-index', i);
			currentUrl.map((currentImage) => {
				const itemListImage = document.createElement('li');
				const image = document.createElement('img');
				itemListImage.classList.add('rr-product__image--item');
				listImage.appendChild(itemListImage);
				itemListImage.appendChild(image);
				image.setAttribute('data-lazy', currentImage);
			
			});
			Methods.__setSlick();
		}
	},
    __showImage(image) {
        const getImage = document.querySelector(`.rr-product__image[data-index="${image}"`)
        getImage.classList.add('is--active');
    },
	__setSlick() {
		$('.js--image--slick').not('.slick-initialized').slick({
				lazyLoad: 'ondemand',
				arrows: false,
				dots: true,
				infinite: true,
				slidesToShow: 1,
		}).on( 'lazyLoaded', ( event, slick, image, imageSource ) => {
			$('.rr-product-center').removeClass('has--placeloader');
		});
	}
}

export default {
    init: Methods.init
}