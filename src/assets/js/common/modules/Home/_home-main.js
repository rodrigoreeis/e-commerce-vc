import cacheSelector from './_cache-selector';

const selector = cacheSelector;

const Methods = {
	init(){
		Methods.initCarrouselBannerMain();
		Methods.initShelfCarrousel();
		Methods.initShelfCarrouselTwoProduct();
		if (window.innerWidth < 768) {
			Methods.initShelfCarrouselBannersMobile();
		}
	},
    
	initCarrouselBannerMain(){
		selector.bannerMain.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
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
		});
	},
	initShelfCarrousel(){
		selector.shelf.slick({
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
		});
	},
	initShelfCarrouselTwoProduct(){
		selector.shelfReleases.slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			infinite: true,
			dots: false,
			arrows: true,
		});
	},
	initShelfCarrouselBannersMobile(){
		selector.shelfBannersMobile.slick({
			slidesToShow: 1.5,
			slidesToScroll: 1,
			infinite: false,
			dots: false,
			arrows: false,
			variableWidth: true
		});
	}

};

export default {
	init: Methods.init,
};
