const DateToCorrectFormat = (date) => {
    if (!date) return null
    return `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
}

export default DateToCorrectFormat