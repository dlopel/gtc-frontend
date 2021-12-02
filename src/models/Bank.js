import validator from 'validator'

export default class Bank {
    constructor(
        id,
        name,
        observation        
    ) {
        this.id = id
        this.name = name.trim()
        this.observation = observation.trim()
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.matches(this.name || '', /^[a-zA-Z ]{3,25}$/)) return false
        //null
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })) return false
        return true
    }
}