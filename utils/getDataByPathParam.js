export const getDataByPathParam = (data, locationType, locationName) => {
    return data.filter((i) => i[locationType].toLowerCase() === locationName.toLowerCase())
}
