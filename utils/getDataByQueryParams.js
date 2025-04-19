export const getDataByQueryParams = (data, queryObj) => {
    const { country, continent, is_open_to_public } = queryObj

    if (country) {
        console.log(country)
        data = data.filter(d => d.country.toLowerCase() === country.toLowerCase())
    }

    if (continent) {
        console.log(continent)
        data = data.filter(d => d.continent.toLowerCase() === continent.toLowerCase())
    }

    if (is_open_to_public) {
        data = data.filter(d => d.is_open_to_public === JSON.parse(is_open_to_public.toLowerCase()))
    }

    return data
}

