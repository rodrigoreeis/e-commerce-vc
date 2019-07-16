/* eslint-disable no-unused-vars */
import cacheSelector from './_cache-selector';

const selector = cacheSelector;

const Methods = {
	init(){
		Methods.initCarrouselBannerMain();
		Methods.initShelfCarrousel();
		Methods.initShelfCarrouselTwoProduct();
		Methods.initCarrouselMiniBanners();
	},
	initCarrouselBannerMain(){
		selector.bannerMain.slick({
			lazyLoad: 'progressive',
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: true,
			arrows: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
					}
				}
			]
		}).on( 'lazyLoaded', ( event, slick, image, imageSource ) => {
			// eslint-disable-next-line no-undef
			$( image ).removeClass('has--placeloader');
			// $( image ).parent('.vve-image__container').removeClass('has--placeloader');
		});
	},
	initShelfCarrousel(){
		// eslint-disable-next-line no-undef
		$('.helperComplement').remove();
		selector.shelf.slick({
			lazyLoad: 'progressive',
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			dots: false,
			arrows: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true,
					}
				}
			]
		}).on( 'lazyLoaded', ( event, slick, image, imageSource ) => {
			// eslint-disable-next-line no-undef
			$( image ).parent('.rr-shelf__placeloader').removeClass('has--placeloader');
		});
	},
	initShelfCarrouselTwoProduct(){
		// eslint-disable-next-line no-undef
		$('.helperComplement').remove();
		selector.shelfReleases.slick({
			lazyLoad: 'progressive',
			slidesToShow: 2,
			slidesToScroll: 2,
			infinite: false,
			dots: false,
			arrows: true,
		}).on( 'lazyLoaded', ( event, slick, image, imageSource ) => {
			// eslint-disable-next-line no-undef
			$( image ).parent('.rr-shelf__placeloader').removeClass('has--placeloader');
		});
	},
	initCarrouselMiniBanners(){
		selector.shelfBannersMobile.slick({
			lazyLoad: 'progressive',
			slidesToShow: 4,
			dots: false,
			arrows: false,
			responsive: [
				{	
					breakpoint: 768,
					settings: {
						slidesToShow: 1.5,
						slidesToScroll: 1,
						infinite: false,
						variableWidth: true
					}
				}
			]
		}).on( 'lazyLoaded', ( event, slick, image, imageSource ) => {
			// eslint-disable-next-line no-undef
			$( image ).removeClass('has--placeloader');
		});
	}

};

export default {
	init: Methods.init,
};
