import "whatwg-fetch";
import 'promise-polyfill/src/polyfill';
import GlobalSelector from "./_global-selector";
import Modals from "./Modal/_modal-index";
import Order from "./Order/_order-index";
import Header from "./Header/__header-index";
import Footer from "./Footer/__footer-mobile";
import Minicart from "./Minicart/_minicart-index";

const {$loader} = GlobalSelector

const Methods = {
    init() {
        Modals.init();
        Order.init();
        Header.init();
        Footer.init();
        Minicart.init();
        Methods.ajaxLoader();
    },

    ajaxLoader(){
        $loader.shelf.classList.add('is--remove');
    }
}
export default {
    init: Methods.init
}