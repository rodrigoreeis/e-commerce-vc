import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product, slick} = CacheSelector;
	const setInfo = (item) => {
		METHODS.productInfo([item])
			.then(response => {
				product.price.textContent = response.bestPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.oldPrice.textContent = response.bestPrice == response.oldPrice ? '' : response.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.name.textContent = response.name;
				product.buy.dataset.sku = response.skuId;
				console.log(response.images);
				// __setImage(response);
			})
	};
	const __setImage = (response) =>{
		response.images.map(({imageUrl}) => {
			const image = document.createElement('img');
			const list = document.createElement('li');
			list.classList.add('rr-product__image--list');
			list.appendChild(image);
			product.image.appendChild(list);
			image.setAttribute('data-lazy', imageUrl);
			product.image.classList.remove('has--placeloader');
			__imageZoom(imageUrl);
			setTimeout(() => {
				__setSlickImages();
			}, 500);
		});
	};
	const __imageZoom = (imageUrl) => {
		const listZoom = document.createElement('li');
		const imageZoom  = document.createElement('img');
		listZoom.classList.add('rr-product__image-zoom--item');
		listZoom.appendChild(imageZoom);
		product.imageZoom.appendChild(listZoom);
		imageZoom.setAttribute('src', imageUrl);
	};
	const __setSlickImages = () => {
		slick.image.not('.slick-initialized').slick({
			lazyLoad: 'progressive',
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true,

		});
		slick.imageZoom.not('.slick-initialized').slick({
			lazyLoad: 'progressive',
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true,
		});
	};

export default setInfo;