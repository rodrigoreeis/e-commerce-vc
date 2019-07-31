import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;
	const setInfo = (item) => {
		METHODS.productInfo([item])
			.then(response => {
				product.price.textContent = response.bestPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.oldPrice.textContent = response.bestPrice == response.oldPrice ? '' : response.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
				product.shotDescription.textContent = response.shotDescription;
				product.code.textContent = `Código do item: ${response.code}`;
				product.name.textContent = response.name;
				product.colorName.textContent = response.colorName[0].replace(',', '');
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
			const listImage = document.createElement('ul');
			listImage.classList.add('js--image--slick');
			listImage.classList.add('rr-product__image');
			listImage.classList.add('rr-product')
			product.image.appendChild(listImage);
			listImage.setAttribute('data-index', i);
			// const listImageZoom = document.createElement('ul');
			// listImageZoom.classList.add('rr-product__image-zoom');
			// listImageZoom.classList.add('js--image--slick');
			// product.image.appendChild(listImageZoom);
			// listImageZoom.setAttribute('data-zoom', i);
			currentUrl.map((currentImage) => {
				const itemListImage = document.createElement('li');
				const image = document.createElement('img');
				itemListImage.classList.add('rr-product__image--item');
				listImage.appendChild(itemListImage);
				itemListImage.appendChild(image);
				image.setAttribute('data-lazy', currentImage);
				// const itemImageZoom = document.createElement('li');
				// const imageZoom = document.createElement('img');
				// itemImageZoom.classList.add('rr-product__image--item-zoom');
				// listImageZoom.appendChild(itemImageZoom);
				// itemImageZoom.appendChild(imageZoom);
				// imageZoom.setAttribute('data-lazy', currentImage);
			});
			__setSlick();
			// __showCurrentZoom(listImage)
		}
	};
	// const __showCurrentZoom = (listImage) => {
	// 	listImage.addEventListener('click', ({currentTarget}) => {
	// 		console.log('clicado', currentTarget);
	// 		const __curentIndex = currentTarget.dataset.index;
	// 		console.log(__curentIndex)
	// 	})
	// }
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