import GlobalSelector from "../_global-selector";

const {$modalCity} = GlobalSelector;

const Methods = {
    init() {
        if(!localStorage.cidade){
            Methods.modalPopUpCity();
        }
    },

    modalPopUpCity() {
        $modalCity.formModalCity.addEventListener('submit', (ev) => {
            ev.preventDefault();
            console.log(ev);
                localStorage.cidade = $modalCity.formModalCitySelect.value;
                Methods._chekoutUpdateCity();
                $modalCity.closeModal.classList.add('is--remove');
        })
    },
    _chekoutUpdateCity(){
        vtexjs.checkout.getOrderForm()
        .then((result) => {
            const marketingData = {utmiCampaign:localStorage.cidade}
            return vtexjs.checkout.sendAttachment('marketingData', marketingData);
        }).done((response) => {
            console.log(response);
            console.log("Estado selecionado!");
        })
    }
}
export default {
  init: Methods.init,
}
