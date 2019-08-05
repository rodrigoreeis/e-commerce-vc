import CacheSelector from './_cache-selector';

const { formStok, product } = CacheSelector;

const Methods = {
	init() {
        Methods.sendProductOutStock();
    },
    sendProductOutStock(){
        formStok.addEventListener('submit', (ev) => {
            ev.preventDefault();
            const nameProduct = product.name[0].textContent;
            const userEmail = formStok.firstChild.value;
            const __sendTodata = {
                produto: nameProduct,
                email: userEmail,
            }
            formStok.firstChild.classList.add('is--remove');
            formStok.lastElementChild.classList.add('is--active');
            formStok.lastElementChild.textContent = 'Enviando...'
            const _localHeaders = new Headers(); 
                _localHeaders.append('Accept', 'application/vnd.vtex.ds.v10+json');
                _localHeaders.append('Content-Type', 'application/json');
                _localHeaders.append('REST-Range', 'resources=0-150');
            const _urlToSearch = 'http://api.vtex.com/vult/dataentities/AM/documents';
            const _vtexHeaderConfig = {
                method: 'PATCH',
                mode: 'cors',
                headers: _localHeaders,
                body: JSON.stringify(__sendTodata)
            };
            fetch(_urlToSearch, _vtexHeaderConfig)
                .then(response => response.json())
                .then(result => {
                    console.log('foo', result);
                    formStok.lastElementChild.textContent = 'Enviado!'

                }).catch(err => {
                    console.log('bar', err);
                });;
        })
    },
}
export default {
	init: Methods.init
};