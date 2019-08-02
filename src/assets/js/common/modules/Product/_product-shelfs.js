import CacheSelector from './_cache-selector';

const  { slickShelfs }  = CacheSelector;

const Methods  = {
    init() {
        Methods.setSlickShelfs();
    },
    setSlickShelfs(){
        $('.js--slick--shelf ul').slick({
            lazyLoad: 'progressive',
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        }).on( 'lazyLoaded', (event, slick, image, imageSource ) => {
            $( image ).parent('.rr-shelf__placeloader').removeClass('has--placeloader');
        });
    }
}

export default {
    init: Methods.init
}