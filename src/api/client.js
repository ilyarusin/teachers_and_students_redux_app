export async function client(url, method, body = {}) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (method === 'POST') {
        options.body = JSON.stringify(body)
    }

    let data
    try {
        const response = await window.fetch(url, options);
        data = await response.json()
        if (response.ok) {
            return {
                status: response.status,
                headers: response.headers,
                url: response.url,
                data,
            }
        }
        throw new Error(response.statusText);
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = (url) => client(url, 'GET');
client.post = (url, body) => client(url, 'POST', body);