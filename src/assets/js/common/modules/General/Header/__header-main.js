import cacheSelector from "../_global-selector";
import selector from "./__cache-selector";

const {$header,$globals} = cacheSelector;
const {subCategory:El} = selector;

const Methods = {
    init(){
        Methods.openMenu();
        Methods.closeMenu();
        // Methods.openSubCategory();
    },
    openMenu(){
        $header.openMenu.addEventListener('click', () => {
            $header.menu.classList.add('is--active');
            $globals.overlay.classList.add('is--active')
        })
    },
    closeMenu(){
        $globals.overlay.addEventListener('click', () => {
            // Methods.__removeAllSubCategoryOpen();
            $globals.overlay.classList.remove('is--active');
            $header.menu.classList.remove('is--active');
        })
    },
    eae(){

        let _localHeaders = new Headers();
        _localHeaders.append('Authorization', 'Basic f7d6d9a4-c36a-458e-aede-c4324cfb9c6b');
        _localHeaders.append('Accept', 'application/json')
        _localHeaders.append("Content-Type", "application/json")
        let _urlToSearch = "https://service.yourviews.com.br/api/44f7277f-9dfa-458d-b9d7-f2db830332fe/review/reviewshelf?productIds=58"
        let _vtexHeaderConfig = {
            method: 'GET',
            mode: 'cors',
            headers: _localHeaders
        }
        fetch(_urlToSearch, _vtexHeaderConfig)
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })

    },

    // openSubCategory(){
    //     [...El].map((elements) => {
    //         elements.addEventListener('click', ({currentTarget}) => {
    //             if(!currentTarget.classList.contains('is--active')){
    //                 currentTarget.classList.add('is--active');
    //                 Methods.__removeAllSubCategoryOpen();
    //                 document.querySelector(`.rr-sub-category__list[data-category='${currentTarget.dataset.category}']`).classList.toggle('is--active');
    //             }else{
    //                 currentTarget.classList.remove('is--active')
    //                 Methods.__removeAllSubCategoryOpen();
    //             }
    //         })
    //     })
    // },
    /**
     * @access private
     */
    // __removeAllSubCategoryOpen(){
    //     const categoryList = document.querySelectorAll('.rr-sub-category__list');
    //         [...categoryList].map((el) => {
    //             el.classList.remove('is--active')
    //         });
            
    // },
}

export default{
    init: Methods.init
}