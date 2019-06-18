import Header from "./__header-main";
import HeaderSearch from "./__search";

const Methods = {
    init() {
        Header.init();
        HeaderSearch.init();
    }
}

export default {
    init: Methods.init
}