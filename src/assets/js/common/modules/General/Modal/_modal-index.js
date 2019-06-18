import ModalCity from "./_modal-city";
import ModalNews from "./_modal-news";

const Methods = {
    init() {
        ModalCity.init();
        ModalNews.init();
    }
}
export default {
    init: Methods.init
}