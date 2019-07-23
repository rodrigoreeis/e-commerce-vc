import setProductInfo from './_product-main';
import CacheSelector from './_cache-selector';

const { product, slick} = CacheSelector;
const Methods = {
	init() {
		Methods.setInfo();
	},
	setInfo(){
		setProductInfo([4], (result) => {
			product.code.textContent = `Código do item: ${result.code}`;
			product.shotDescription.textContent = `${result.shotDescription}...`;
			product.price.textContent = result.bestPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
			product.oldPrice.textContent = result.bestPrice == result.oldPrice ? '' : result.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
			product.name.textContent = result.name;
			Methods.__setImage(result);
		});
	},
	__setImage(result){
		result.images.map(({imageUrl}) => {
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