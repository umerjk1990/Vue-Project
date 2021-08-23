import { config } from '../../config';

export const netloc = config.protocol + config.host + ':' + config.port;


//Gets cookie by name
export function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
                c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//Set cookie with name and lifetime in minutes
export function setCookie(name, value, lifeMinutes) {
    let d = new Date();
    d.setTime(d.getTime() + (lifeMinutes*60*1000));
    let expires = 'expires='+d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

//Delete cookie by name
export function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Changes '{exampleKey}' in string to 'new string value' by inputting {exampleKey: 'new string value'}
export function insertValuesInString(string, json) {
    for (let item in json) {
        string = string.replace('{' + item + '}', json[item])
    }
    return string;
}
