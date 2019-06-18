import GlobalSelector from "../_global-selector";
import {openOverlay, closeOverlay} from "../methods";

const {$modalNews, $header, $globals} = GlobalSelector;

const Methods = {
    init(){
        Methods.openModalNews();
        Methods.closeModal();
        Methods.__BtnsModalNews();
    },

    openModalNews(){
        console.log($header.news.lastElementChild)
        $header.news.firstElementChild.firstElementChild.addEventListener('click', (ev) =>{
            ev.preventDefault();
            $modalNews.el.classList.add('is--active');
            openOverlay();
        })
    },
    closeModal(){
        $globals.overlay.addEventListener('click', () => {
            Methods.__BtnsModalNews();
            closeOverlay($modalNews.el)
        })
    },
    __BtnsModalNews(){
        const btnClose = document.querySelectorAll('.js--news--close');
        [...btnClose].map((el) => {
            el.addEventListener('click', () => {
                closeOverlay($modalNews.el)
            })
        })
    },
}

export default {
    init: Methods.init,
} 
