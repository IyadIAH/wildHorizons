export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}
