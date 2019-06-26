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
        news: document.querySelector('.rr-header__bottom'),
        search: document.querySelector('.rr-header__nav--search'),
        searchBtn: document.querySelector('.rr-header__top__user--search')
    },
    $minicart:{
        shelf: document.querySelector('.rr-minicart'),
        products: document.querySelector('.js--products'),
        openMinicart: document.querySelector('.js--minicart'),
        price: document.querySelector('.js--minicart--price'),
        amount: document.querySelector('.js--minicart--amount')
    },
    $shelf: {
        btn: document.querySelectorAll('.rr-shelf__buy--btn')
    },
    $loader:{
        shelf: document.querySelector('.rr-ajax-loader')
    }
} 