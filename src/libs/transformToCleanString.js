const transformToCleanString = (name) => {
    if (name) {
        return name.toString().trim()
    } else {
        return ''
    }
}

export default transformToCleanString