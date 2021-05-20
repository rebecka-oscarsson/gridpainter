
function formatMessage(username, text) {
    const date = new Date()
    
    return {
        username,
        text,
        time: moment().format('h:mm')
    }
}

module.exports = formatMessage;