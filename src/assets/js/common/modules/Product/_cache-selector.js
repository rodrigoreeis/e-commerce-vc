export default {
	product:{
		code: document.querySelector('.js--product--code'),
		shotDescription: document.querySelector('.js--product-description'),
		image: document.querySelector('.js--product--image'),
		oldPrice: document.querySelectorAll('.js--old-price'),
		price: document.querySelectorAll('.js--best-price'),
		name: document.querySelectorAll('.js--product--name'),
		thumb: document.querySelector('.rr-product__thumb-container'),
		buy: document.querySelectorAll('.js--buy'),
		containerBuy: document.querySelector('.rr-product__buy'),
		containerPrice: document.querySelector('.rr-product__price'),
		outStock: document.querySelector('.js--out--stock'),
		colorName: document.querySelector('.js--color'),
		description: document.querySelector('.js--description'),
		howToUse: document.querySelector('.js--how--use'),
		composition: document.querySelector('.js--composition'),
		measures: document.querySelector('.js--measures'),
		fix: document.querySelector('.rr-product-fix'),
		fixBuy: document.querySelector('.btn-scroll'),
		fixOutStock: document.querySelector('.rr-product-fix__buy--out-stock'),
	},
	descriptions:{
		self: document.querySelectorAll('.js--specification--names > li'),
		items: document.querySelectorAll('.js--tab--action')
	},
	specification: document.querySelector('.rr-product-specification'),
	
};