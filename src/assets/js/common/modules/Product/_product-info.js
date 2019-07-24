import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product, slick} = CacheSelector;
const Methods = {
	init() {
		Methods.setInfo();
	},
	setInfo(){
		METHODS.productInfo([0])
			.then(response => {
				product.code.textContent = `Código do item: ${response.code}`;
				product.shotDescription.textContent = `${response.shotDescription}...`;
				product.price.textContent = response.bestPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.oldPrice.textContent = response.bestPrice == response.oldPrice ? '' : response.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.name.textContent = response.name;
				Methods.__setImage(response);
			})
	},
	__setImage(response){
		response.images.map(({imageUrl}) => {
			const image = document.createElement('img');
			const list = document.createElement('li');
			list.classList.add('rr-product__image--list');
			list.appendChild(image);
			product.image.appendChild(list);
			image.setAttribute('src', imageUrl);
			product.image.classList.remove('has--placeloader');
			Methods.__imageZoom(imageUrl);
			setTimeout(() => {
				Methods.__setSlickImages();
			}, 500);
		});
	},
	__imageZoom(imageUrl){
		const listZoom = document.createElement('li');
		const imageZoom  = document.createElement('img');
		listZoom.classList.add('rr-product__image-zoom--item');
		listZoom.appendChild(imageZoom);
		product.imageZoom.appendChild(listZoom);
		imageZoom.setAttribute('src', imageUrl);
	},
	
	__setSlickImages(){
		slick.image.slick({
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true,
		});
		slick.imageZoom.slick({
			arrows: false,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			adaptiveHeight: true,
		});
	},
};

export default {
	init: Methods.init
};