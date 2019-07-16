const Methods = {
	init(){
		Methods.bootstrapRemover();
	},
	bootstrapRemover() {
		const allBoostrap = document.querySelectorAll('link');
		[...allBoostrap].map((link) => {
			if (link.href.match(/bootstrap/) || link.href.match(/style.css/) || link.href.match(/font-awesome/)) {
				link.parentNode.removeChild(link);
			}
		});
	},
};

export default {
	init: Methods.init,
}; 
 