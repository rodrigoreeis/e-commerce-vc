import "whatwg-fetch";
import 'promise-polyfill/src/polyfill';
import Modals from "./Modal/_modal-index";
import Order from "./Order/_order-index";
import Header from "./Header/__header-index";

const Methods = {
    init() {
        Modals.init();
        Order.init();
        Header.init();
    }
}

export default {
    init: Methods.init
}