function underline(phrases, checkboxes) {
	for(let id of checkboxes) {
    	let chkbox = document.getElementById(id);
        let label = chkbox.getElementsByTagName("label")[1];
        let replaced = label.innerHTML;
    	for(const phrase of phrases) {
          replaced = replaced.replaceAll(phrase, "<span style='text-decoration: underline'>"+phrase+"</span>");
        }
        label.innerHTML = replaced;
    }
}

function bold(phrases, checkboxes) {
	for(let id of checkboxes) {
    	let chkbox = document.getElementById(id);
        let label = chkbox.getElementsByTagName("label")[1];
        let replaced = label.innerHTML;
    	for(const phrase of phrases) {
          replaced = replaced.replaceAll(phrase, "<span style='font-weight: 700'>"+phrase+"</span>");
        }
        label.innerHTML = replaced;
    }
}