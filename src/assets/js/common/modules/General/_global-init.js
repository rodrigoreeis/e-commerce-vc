import "whatwg-fetch";
import 'promise-polyfill/src/polyfill';
import Modals from "./Modal/_modal-index";
import Order from "./Order/_order-index";
import Header from "./Header/__header-index";
import Footer from "./Footer/__footer-mobile";

const Methods = {
    init() {
        Modals.init();
        Order.init();
        Header.init();
        Footer.init();
    }
}
export default {
    init: Methods.init
}