export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        return response.message
    }
}