import validator from 'validator'

export default class Transport {
    constructor(id, ruc, name, address, telephone, observation) {
        this.id = id
        this.ruc = ruc
        this.name = name
        this.address = address
        this.telephone = telephone
        this.observation = observation || null
    }
    isValid() {

        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.isInt(this.ruc, { allow_leading_zeroes: false, gt: 0 })) return false
        if (!validator.isLength(this.ruc, { min: 11, max: 11 })) return false
        if (!validator.isLength(this.name, { min: 3, max: 50 })) return false
        if (!validator.isAlphanumeric(this.name, 'en-US', { ignore: ' ' })) return false
        if (!validator.isLength(this.address, { min: 3, max: 100 })) return false
        if (!validator.matches(this.telephone, /^(\d{2}-)?\d{3}-\d{4}$/)) return false

        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 1000 })) return false

        return true
    }

    static isNameValid(name) {
        if (!validator.isLength(name, { min: 3, max: 50 })) return false
        if (!validator.isAlphanumeric(name, 'en-US', { ignore: ' ' })) return false
        return true
    }
}