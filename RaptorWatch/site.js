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
            linkElement.href = maliciousLink + "#noblock";
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
