import * as HELPERS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;

const Methods  = {
    init() {
        Methods.getImages();
    },
    getImages(){
        HELPERS.productInfo(0)
            .then((response) => {
				Methods.__createElementsImage(response);
            })
    },
    __createElementsImage(response) {
		response.images.map((el, index) => {
			const currentUrl = Object.values(el);
			const images = `
				<ul class="rr-product__image js--image--slick " data-index="${index}"> 	
					${currentUrl.map(image => `
						<li class="rr-product__image--item">
							<img data-lazy="${image}">
						</li>
					`).join('')}
				</ul>`;
			product.image.innerHTML += images;
		})
		Methods.__setSlick();
		Methods.__showImage(0);
	},
    __showImage(currentImage) {
		const getImage = document.querySelector(`.rr-product__image[data-index="${currentImage}"`);
		getImage.classList.add('is--active');
    },
	__setSlick() {
		$('.js--image--slick').not('.slick-initialized').slick({
				lazyLoad: 'ondemand',
				arrows: false,
				dots: true,
				infinite: true,
				slidesToShow: 1,
		}).on( 'lazyLoaded', () => {
			$('.rr-product-center').removeClass('has--placeloader');
		});
	}
}

export default {
    init: Methods.init
}