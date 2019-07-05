/* eslint-disable no-undef */
import GlobalSelector from '../_global-selector';

const {$minicart} = GlobalSelector;

const Methods = {
	init() {
		Methods.shippingPorcetage();
	},
	shippingPorcetage(){
		$(window).on('orderFormUpdated.vtex', (evt,orderForm) => {
			Methods.__currentPriceCheckout(orderForm);
		});
	},
	__currentPriceCheckout(orderForm){
		const totalizers = orderForm.totalizers.length;
		if (totalizers){
			const priceToNotShipping = 200;
			const amountPriceMinicar = (orderForm.totalizers[0].value) / 100;
			const calcNotPayShipping = priceToNotShipping - amountPriceMinicar;
			const priceFormated = calcNotPayShipping.toLocaleString('pt-BR',{style: 'currency', currency:'BRL'}); 
			$minicart.textProgress.textContent =  calcNotPayShipping < 1 ?  'Você possui' :  `Faltam ${priceFormated} para você ter `;
			Methods.__barToProgress(calcNotPayShipping , priceToNotShipping);
		}
	},
	__barToProgress(calcNotPayShipping, priceToNotShipping){
		const calcProgress = ((calcNotPayShipping / priceToNotShipping) * 100).toFixed();
		$minicart.barProgress.style.width = calcProgress < 1 ? '0%' : `${calcProgress}%`;
	}
};
export default {
	init: Methods.init
};