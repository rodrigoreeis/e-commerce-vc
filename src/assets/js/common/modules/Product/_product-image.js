import * as HELPERS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;

const Methods  = {
    init() {
		Methods.getImages();
		// Methods.closeZoom();
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
					${currentUrl.map(image => 
						`
						<li class="rr-product__image--item">
							<img data-lazy="${image}">
						</li>
					`).join('')}
				</ul>`;
			// const imageZoom = `
			// 		<ul class="rr-product__image-zoom___list js--image--slick" data-index="${index}">
			// 			${currentUrl.map(image => `
			// 				<li class="rr-product__image-zoom___list--item">
			// 					<img data-lazy="${image}">
			// 				</li>
			// 				`
			// 			).join('')}
			// 		</ul>`;
			// product.imageZoom.innerHTML += imageZoom;
			product.image.innerHTML += images;
		})
		Methods.__showImage(0);
		Methods.__setSlick(response);
	
		// Methods.__openZoom();
	},
	// __openZoom() {
	// 	const image = document.querySelectorAll('.rr-product__image');
	// 	[...image].map((el) => {
	// 		el.addEventListener('click', (ev) => {
	// 			ev.stopImmediatePropagation();
	// 			HELPERS.removeAllActives('.rr-product__image-zoom___list')
	// 			product.imageZoom.classList.add('is--active');
	// 			const _currentZoom = document.querySelector(`.rr-product__image-zoom___list[data-index="${ev.currentTarget.dataset.index}"]`);
	// 			_currentZoom.classList.add('is--active');
	// 		})
	// 	})
	// },
	// closeZoom(){
	// 	product.imageZoom.addEventListener('click', (ev) => {
	// 		if(ev.target.classList.contains('rr-product__image-zoom--close')){
	// 			product.imageZoom.classList.remove('is--active');
	// 			HELPERS.removeAllActives('.rr-product__image-zoom___list');
	// 		}
	// 	})
	// },
    __showImage(currentImage) {
		const getImage = document.querySelector(`.rr-product__image[data-index="${currentImage}"`);
		getImage.classList.add('is--active');
	},
	__setSlick(response) {
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