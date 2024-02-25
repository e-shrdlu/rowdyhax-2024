import functions_framework
import socket
import requests
import ssl
from datetime import date, datetime
from bs4 import BeautifulSoup
from ipwhois import IPWhois
from urllib.parse import urlparse
from markupsafe import escape
from flask import jsonify


@functions_framework.http
def hello_http(request):
    """
    RaptorWatch Sandbox Cloud Function

    Detects newly created domain names, lack of integrity on SSL certificates, and typical HTML smuggling attempts
    """
    request_json = request.get_json(silent=True)
    request_args = request.args

    # Stats
    susScore = 0

    if request_json and "url" in request_json:
        url = request_json["url"]
    elif request_args and "url" in request_args:
        url = request_args["url"]
    else:
        return "Error: URL parameter is missing."

    try:
        domain_name = urlparse(url).path
        ip_address = socket.gethostbyname(domain_name)

        ip_info = IPWhois(ip_address).lookup_whois()

        registration_date = get_registration_date(domain_name)

        # Detection: Was the domain registered less than a year ago?
        newdomDetect = isNewDomain(registration_date)
        if (newdomDetect):
            print("Domain was registered less than a year ago")

        # Detection: Self-signed certificate
        sslDetect = isSSL(domain_name)
        if (sslDetect):
            selfsignedDetect = isSelfSigned(domain_name)
            print(selfsignedDetect)

        dns_info = {
            'ip_address': ip_address,
            'newdomDetect': newdomDetect,
            'registration_date': registration_date
        }

        result = jsonify(dns_info), 200
        
        return result
    except Exception as e:
        return f"Error performing DNS lookup for {escape(url)}: {str(e)}"


def get_registration_date(domain):
    """Retrieve the registration date of the domain."""
    url = f"https://who.is/whois/{domain}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    registration_date_tag = soup.find('div', class_='col-md-4 queryResponseBodyKey', text='Registered On')
    if registration_date_tag:
        registration_date = registration_date_tag.find_next_sibling('div', class_='col-md-8 queryResponseBodyValue').text.strip()
        return registration_date
    else:
        raise Exception('Registration date not found')


def isNewDomain(regDate):
    domDate = datetime.strptime(regDate, '%Y-%m-%d').date()
    today = date.today()
    difference = today - domDate
    return difference.days <= 365

def isSSL(domain):
    context = ssl.create_default_context()
    try:
        with socket.create_connection((domain, 443)) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                return True
    except (ssl.SSLCertVerificationError, ConnectionRefusedError):
        return False

def isSelfSigned(domain):
    fullUrl = "https://" + domain
    response = requests.get(fullUrl, verify=True)
    return response.ok