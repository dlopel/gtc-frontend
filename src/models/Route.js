import validator from 'validator'

export default class Route {
    constructor(
        id,
        name,
        addressStart,
        addressEnd,
        clientStart,
        clientEnd,
        observation,
        clientId,
        value
    ) {
        this.id = id
        this.name = name
        this.addressStart = addressStart
        this.addressEnd = addressEnd
        this.clientStart = clientStart
        this.clientEnd = clientEnd
        this.observation = observation || null
        this.clientId = clientId
        this.value = value
    }

    isValid() {
        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.matches(this.name, /^[a-zA-Z -]{3,100}$/)) return false
        if (!validator.isAlphanumeric(this.addressStart, 'en-US', { ignore: ' -/' })) return false
        if (!validator.isLength(this.addressStart, { min: 6, max: 300 })) return false
        if (!validator.isAlphanumeric(this.addressEnd, 'en-US', { ignore: ' -/' })) return false
        if (!validator.isLength(this.addressEnd, { min: 6, max: 300 })) return false
        if (!validator.matches(this.clientStart, /^[a-zA-Z /]{3,100}$/)) return false
        if (!validator.matches(this.clientEnd, /^[a-zA-Z /]{3,100}$/)) return false
        if (!validator.isUUID(this.clientId, 4)) return false
        if (!validator.matches(this.value, /^[0-9]{1,5}(\.[0-9]{1,2})?$/)) return false

        //null field
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 1000 })) return false

        return true
    }
}

export class CompressedRoutesQueryBody {

    constructor(name, clientId) {
        this.name = name.trim()
        this.clientId = clientId
    }

    areQueryFieldsValid() {
        let isThereAtLeastOneApprovedProp = false
        if (this.name)
            if (validator.matches(this.name, /^[a-zA-Z -]{3,100}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.clientId)
            if (validator.isUUID(this.clientId, '4')) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        return isThereAtLeastOneApprovedProp
    }
}