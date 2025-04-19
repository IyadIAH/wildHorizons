import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'


const PORT = 8000


const server = http.createServer( async (req, res)=> {

    const url = req.url
    const data = await getDataFromDB()

    if (url === '/api' && req.method === 'GET') {
        
        sendJSONResponse(res, 200, data)

    } else if(url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = url.split('/').pop()
        const continentData = data.filter((i) => i.continent.toLowerCase() === continent.toLowerCase())

        sendJSONResponse(res, 200, continentData)

    } else if (url.startsWith('/api/country') && req.method === 'GET') {
        const country = url.split('/').pop()
        const countryData = data.filter((i) => i.country === country)

        sendJSONResponse(res, 200, countryData)
    } else {
        const obj = {error: 'Not found', message: 'The requested route does not exist'}
       
        sendJSONResponse(res, 404, obj)
    }

})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
