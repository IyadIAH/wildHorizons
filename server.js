import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { getDataByPathParam } from './utils/getDataByPathParam.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'
import { data } from './data/data.js'


const PORT = 8000


const server = http.createServer( async (req, res)=> {

    const url = req.url
    const destinations = await getDataFromDB()

    const urlObj = new URL(url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

   

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        let filteredDestinations = getDataByQueryParams(destinations, queryObj)
    
        sendJSONResponse(res, 200, filteredDestinations)

    } else if(url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = url.split('/').pop()
        const filteredData = getDataByPathParam(data, 'continent', continent)

        sendJSONResponse(res, 200, filteredData)

    } else if (url.startsWith('/api/country') && req.method === 'GET') {
        const country = url.split('/').pop()
        const filteredData = getDataByPathParam(data, 'country', country)

        sendJSONResponse(res, 200, filteredData)
    } else {
        const obj = {error: 'Not found', message: 'The requested route does not exist'}
       
        sendJSONResponse(res, 404, obj)
    }

})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
