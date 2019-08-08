import * as HELPERS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;
	const setInfo = (item) => {
		HELPERS.productInfo([item])
			.then(response => {
				console.log(response);
				if(response.bestPrice == 0) {
					$('.rr-product__buy').addClass('is--remove'); // remover gambeta veia
					$('.js--out--stock').addClass('is--active');
				}
				for (let i = 0 ; i < product.name.length ; i ++){
					product.name[i].innerHTML = response.name;
					product.oldPrice[i].innerHTML = response.bestPrice == response.oldPrice ? '' : response.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
					product.buy[i].dataset.sku = response.skuId;
					if (response.bestPrice != 0){
						product.price[i].textContent = response.bestPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
						if(product.fixOutStock.classList.contains('is--active')){
							product.fixOutStock.classList.remove('is--active');
							product.fixBuy.classList.remove('is--active');
						}
					} else {
						product.price[i].textContent = '';
						product.fixBuy.classList.add('is--active');
						product.fixOutStock.classList.add('is--active');
					}
				}
				// product.colorName.textContent = response.colorName[0].replace(',', '');
			})
	};

export default setInfo;