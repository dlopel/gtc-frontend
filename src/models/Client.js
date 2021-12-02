import validator from 'validator'

class Client {
    constructor(id, ruc, name, address, observation) {
        this.id = id
        this.ruc = ruc.trim()
        this.name = name.trim()
        this.address = address.trim()
        this.observation = observation.trim()
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.isInt(this.ruc || '', { allow_leading_zeroes: false, gt: 0 })) return false
        if (!validator.isLength(this.ruc || '', { min: 11, max: 11 })) return false
        if (!validator.isLength(this.name || '', { min: 3, max: 50 })) return false
        if (!validator.isAlphanumeric(this.name || '', 'en-US', { ignore: ' ' })) return false
        if (!validator.isLength(this.address || '', { min: 3, max: 100 })) return false

        //null fields
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 1000 })) return false

        return true
    }
}

export default Client