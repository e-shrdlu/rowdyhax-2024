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

    function updateLinkInfo(json) {
        // typosquatting
        // assume yes
        document.getElementById("detection-method-1").className = "triggered-yes";
        document.getElementById("detection-method-1").innerText = "Yes";

        //domain registered under a year
        if (json.userId == 1) { // bad
            document.getElementById("detection-method-2").className = "triggered-yes";
            document.getElementById("detection-method-2").innerText = "Yes";
        } else { // good
            document.getElementById("detection-method-2").className = "triggered-no";
            document.getElementById("detection-method-2").innerText = "No";
        }

        // Self-Signed
        if (json.id == 0) { // bad
            document.getElementById("detection-method-3").className = "triggered-yes";
            document.getElementById("detection-method-3").innerText = "Yes";
        } else { // good
            document.getElementById("detection-method-3").className = "triggered-no";
            document.getElementById("detection-method-3").innerText = "No";
        }

        // HTML smuggling / malicious js
        if (json.completed == false) { // bad
            document.getElementById("detection-method-4").className = "triggered-yes";
            document.getElementById("detection-method-4").innerText = "Yes";
        } else { // good
            document.getElementById("detection-method-4").className = "triggered-no";
            document.getElementById("detection-method-4").innerText = "No";
        }
    }

    if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
    } else {
        afterDOMLoaded();
    }

    function afterDOMLoaded(){
        updateMaliciousLink();
        fetch('https://jsonplaceholder.typicode.com/todos/1') // change url
      .then(response => response.json())
      .then(json => updateLinkInfo(json));
    }


    // // Update the malicious link and title
    // window.addEventListener('DOMContentLoaded', (event) => {
    // });
