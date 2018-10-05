document.addEventListener("DOMContentLoaded", async () => {
    let term = document.getElementById('term');
    term.innerHTML = "|";

    let response = await getDomains();
    let count = 0;
    response.domains.forEach((domainObject, i) => {
        let letters = domainObject.domain.split('');
        for (let letter of letters) {
            timeout(() => { term.innerHTML = term.innerHTML.substring(0, term.innerHTML.length - 1) + letter + '|' }, 110 * count);
            count++;
        }
        count += 5;
        for (let i = letters.length; i > 0; i--) {
            timeout(() => { term.innerHTML = term.innerHTML.substring(0, i - 1) + '|' }, 110 * count);
            count++;
        }
    });
});

function timeout(callback, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(callback()) }, ms);
    });
}

async function getDomains() {
    let response = await fetch('http://localhost:3030');
    let json = await response.json();
    return json;
}