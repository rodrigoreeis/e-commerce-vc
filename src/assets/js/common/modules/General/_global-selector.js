/* eslint-disable indent */
export default{
	$modalCity: {
		formModalCity : document.querySelector('.js--form--city'),
		formModalCitySelect: document.querySelector('.js--form--option'),
		modal: document.querySelector('.rr-modal-overlay'),
	},
	$modalNews: {
		shelf: document.querySelector('.rr-news'),
		newsletter: document.querySelector('.js--popup--news'),
		btn: document.querySelector('.js--popup--news button')
	},
	$globals: {
		body: document.querySelector('body'),
		overlay: document.querySelector('.rr-overlay'),
	},
	$header:{
		shelf: document.querySelector('.rr-header'),
		openMenu: document.querySelector('.js--menu'),
        menu: document.querySelector('.rr-menu-slide'),
        side: document.querySelector('.rr-menu-side'),
		news: document.querySelector('.rr-header__bottom'),
		search: document.querySelector('.rr-header__nav--search'),
        searchBtn: document.querySelector('.rr-header__top__user--search'),
        category: document.querySelectorAll('.js--category'),
        categoryClose: document.querySelectorAll('.js--category--close'),
        subCategory: document.querySelectorAll('.rr-sub-category__list'),
	},
	$minicart:{
		shelf: document.querySelector('.rr-minicart'),
		products: document.querySelector('.js--products'),
		openMinicart: document.querySelector('.js--minicart'),
		closeMinicart: document.querySelector('.rr-minicart__top--close'),
		price: document.querySelector('.js--minicart--price'),
		amount: document.querySelector('.js--minicart--amount'),
		bottom: document.querySelector('.rr-minicart__bottom'),
		empy: document.querySelector('.rr-minicart__empy'),
		shipping: document.querySelector('.rr-minicart__shipping'),
		barProgress: document.querySelector('.js--minicart--progress'),
		porcetage: document.querySelector('.js--minicart--progress'),
		textProgress: document.querySelector('.js--text--shipping'),
		pricePorcetage : document.querySelector('.js--text--shipping i')
	},
	$shelf: {
		btn: document.querySelectorAll('.rr-shelf__buy--btn'),
	},
	$loader:{
		shelf: document.querySelector('.rr-ajax-loader')
	}
}; 