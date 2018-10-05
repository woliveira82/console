document.addEventListener("DOMContentLoaded", async _ => {
    let term = document.getElementById('term');
    let response = await getDomains();

    for (domainObject of response.domains) {
        let letters = domainObject.domain.split('');

        for (let letter of letters) {
            await timeout(_ => {
                term.innerHTML = term.innerHTML.substring(0, term.innerHTML.length - 2) + letter + ' _';
            }, 100);
        }

        await sleep(1000);

        for (let i = letters.length; i > 0; i--) {
            await timeout(_ => {
                term.innerHTML = term.innerHTML.substring(0, i - 2) + ' _';
            }, 50);
        }
    }
});

let timeout = async function timeout(callback, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            resolve(callback());
        }, ms);
    });
}

let getDomains = async function getDomains() {
    let response = await fetch("http://localhost:3030");
    //let response = await fetch('https://api.domainsdb.info/search?query=google&tld=com');
    let json = await response.json();
    return json;
}

let sleep = async function (ms) {
    return timeout(_ => { }, ms);
}