import "whatwg-fetch";

const Methods = {
    init(){
        Methods.cepValidation()
    },
    cepValidation() {
        window.addEventListener("load", () => {
            const cepField = document.querySelector('#summary-postal-code');
            cepField.addEventListener('change', () => {
                if(cepField.value.length >= 8) {
                    const cepValue = cepField.value;
                    const country = 'BRA';
                    const address = {
                            postalCode: cepValue,
                            country: country
                        }
                    vtexjs.checkout.getAddressInformation(address)
                        .then(function(result) {
                            const stateCepTyped = result.state;
                            const stateSelectedModal = localStorage.cidade
                            if(stateCepTyped !== stateSelectedModal) {
                                // console.log('é diferente')
                                localStorage.cidade = stateCepTyped;
                                vtexjs.checkout.getOrderForm()
                                    .then((result) => {
                                        // console.log(result)
                                        // console.log('Estado Diferente ! realizando alteração')
                                        const marketingData = {utmiCampaign:localStorage.cidade}
                                        return vtexjs.checkout.sendAttachment('marketingData', marketingData);
                                    }).done((response) => {
                                        // console.log(response);
                                         console.log("Estado Alterado!");
                                    })
                            }
                        });
                }
            })
        })
    }  
}

Methods.init();