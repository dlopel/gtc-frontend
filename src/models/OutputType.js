import validator from 'validator'

export default class OutputType {
    constructor(
        id,
        name
    ) {
        this.id = id
        this.name = name.trim()
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.matches(this.name || '', /^[a-zA-Z ]{3,25}$/)) return false
        return true
    }
}