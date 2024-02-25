
    // Function to get URL parameter by name
    /*function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    */

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        var queryString = url.split('?')[1];
        if (queryString) {
            var params = queryString.split('&');
            for (var i = 0; i < params.length; i++) {
                var pair = params[i].split('=');
                if (pair[0] === name) {
                    return decodeURIComponent(pair[1].replace(/\+/g, ' '));
                }
            }
        }
        return null;
    }

    // Function to update the malicious link with the URL parameter
    // moz-extension://9df996c5-ac85-4cbf-a2c6-0c551b94f383/site.html?link=goople.org
    // ^^^ 
    function updateMaliciousLink() {
        var maliciousLink = getParameterByName('link');
        console.log("Malicious link:", maliciousLink); // Log the malicious link to the console
        var linkElement = document.getElementById('malicious-link');
        if (maliciousLink && linkElement) {
            linkElement.href = maliciousLink;
            linkElement.textContent = maliciousLink;
        }
    }



    if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
    } else {
        afterDOMLoaded();
    }

    function afterDOMLoaded(){
        updateMaliciousLink();
    }





    // // Update the malicious link and title
    // window.addEventListener('DOMContentLoaded', (event) => {
    // });
