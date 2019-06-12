import cacheSelector from "./_cache-selector";

const selector = cacheSelector

const Methods = {
    init(){
        Methods.initCarrouselBannerMain();
        Methods.initShelfCarrousel();
        Methods.initShelfCarrouselTwoProduct();
    },
    
    initCarrouselBannerMain(){
        selector.bannerMain.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            arrows: false,
        })
    },
    initShelfCarrousel(){
        selector.shelf.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            // autoplay: true,
            // autoplaySpeed: 2000,
            dots: false,
            arrows: true,
        })
    },
    initShelfCarrouselTwoProduct(){
        selector.shelfReleases.slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false,
            arrows: true,
        })
    },

}

export default {
    init: Methods.init,
};
