import fetch from "dva/fetch";

const FETCH_URL =
    /http:\/\/v.izuiyou.com/ig.test(location.origin)
        ? "https://www.izuiyou.com/compvd/"
        : "https://www.izuiyou.com/test/compvd/";

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
    const finalUrl = `${FETCH_URL}${url}`;
    const finalOpt = {
        method: 'post',
        body: JSON.stringify({
            session: localStorage.session,
            from: "wxpub",
            ...options
        }),
    };
    return fetch(finalUrl, finalOpt)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({data}))
        .catch((err) => ({err}));
}
