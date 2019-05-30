export const validateForm = (data) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if(!element || element.length < 2) {
                return document.getElementById(`field-error`).style.display='block'
            } else {
                document.getElementById(`field-error`).style.display='none'
            }
        }
    }
}