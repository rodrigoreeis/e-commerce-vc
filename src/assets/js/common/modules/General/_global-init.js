import "whatwg-fetch";
import 'promise-polyfill/src/polyfill';
import Modal from "./Modal/_modal-city";
import Order from "./Order/_order-index";
import Header from "./Header/__header-index";

const Methods = {
    init() {
        Modal.init();
        Order.init();
        Header.init();
    }
}

export default {
    init: Methods.init
}