
function formatMessage(username, text) {
    const date = Date().toString()

    return {
        username,
        text,
        time: date
    }
}

module.exports = formatMessage;