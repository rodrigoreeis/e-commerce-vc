import * as METHODS from './methods';
import CacheSelector from './_cache-selector';

const { product } = CacheSelector;
	const setInfo = (item) => {
		METHODS.productInfo([item])
			.then(response => {
				for (let i = 0 ; i < product.name.length ; i ++){
					product.name[i].textContent = response.name;
					product.oldPrice[i].textContent = response.bestPrice == response.oldPrice ? '' : response.oldPrice.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'});
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
				product.colorName.textContent = response.colorName[0].replace(',', '');
			})
	};

export default setInfo;