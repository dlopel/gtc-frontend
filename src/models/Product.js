import validator from 'validator'

export default class Product {
    constructor(
        id,
        name,
        clientId,
        observation
    ) {
        this.id = id
        this.name = name
        this.clientId = clientId
        this.observation = observation
    }

    isValid() {
        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.matches(this.name, /^[a-zA-Z0-9 -]{3,100}$/)) return false
        if (!validator.isUUID(this.clientId, 4)) return false

        //null field
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })) return false

        return true
    }
}

export class CompressedProductsQueryBody {

    constructor(name, clientId) {
        this.name = name.trim()
        this.clientId = clientId
    }

    areQueryFieldsValid() {
        let isThereAtLeastOneApprovedProp = false
        if (this.name)
            if (validator.matches(this.name, /^[a-zA-Z0-9 ]{3,100}$/)) {
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