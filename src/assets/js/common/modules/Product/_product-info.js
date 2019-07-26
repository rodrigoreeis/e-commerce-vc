import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;
	const setInfo = (item) => {
		METHODS.productInfo([item])
			.then(response => {
				product.price.textContent = response.bestPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.oldPrice.textContent = response.bestPrice == response.oldPrice ? '' : response.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.name.textContent = response.name;
				product.buy.dataset.sku = response.skuId;
				if(!product.image.firstChild){
					__createElementsImage(response);
					__showImage(item);
				}
			})
	};
	const __createElementsImage = (response) =>{
		for(let i = 0; i < response.images.length; i++){
			const currentUrl =  Object.values(response.images[i])
			const listImageZoom = document.createElement('ul');
			const listImage = document.createElement('ul');
			listImageZoom.classList.add('rr-product__image-zoom');
			listImageZoom.classList.add('js--image--slick');
			listImage.classList.add('rr-product__image');
			listImage.classList.add('js--image--slick');
			listImage.classList.add('rr-product')
			product.image.appendChild(listImage);
			product.image.appendChild(listImageZoom);
			listImageZoom.setAttribute('data-zoom', i);
			listImage.setAttribute('data-index', i);
			currentUrl.map((currentImage) => {
				const itemListImage = document.createElement('li');
				const itemImageZoom = document.createElement('li');
				const image = document.createElement('img');
				const imageZoom = document.createElement('img');
				itemImageZoom.classList.add('rr-product__image--item-zoom');
				itemListImage.classList.add('rr-product__image--item');
				listImageZoom.appendChild(itemImageZoom);
				itemImageZoom.appendChild(imageZoom);
				listImage.appendChild(itemListImage);
				itemListImage.appendChild(image);
				imageZoom.setAttribute('data-lazy', currentImage);
				image.setAttribute('data-lazy', currentImage);
			});
			__setSlick();
		}
	};

	const __setSlick = () => {
		$('.js--image--slick').not('.slick-initialized').slick({
				lazyLoad: 'progressive',
				arrows: false,
				dots: true,
				infinite: true,
				slidesToShow: 1,
		}).on( 'lazyLoaded', ( event, slick, image, imageSource ) => {
			$('.rr-product-center').removeClass('has--placeloader');
		});
	}

	const __showImage = (item) =>{
		const getImage = document.querySelector(`.rr-product__image[data-index="${item}"`)
		getImage.classList.add('is--active');
	};

export default setInfo;