import validator from 'validator'

export default class ProductTransported {
    constructor(
        id,
        productId,
        freightId,
        quantity,
        sku,
        observation
    ) {
        this.id = id
        this.productId = productId
        this.freightId = freightId
        this.quantity = quantity
        this.sku = sku
        this.observation = observation
    }

    isValid() {
        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.isUUID(this.productId, 4)) return false
        if (!validator.isUUID(this.freightId, 4)) return false
        if (!validator.matches(this.sku, /^[a-zA-Z0-9- ]{3,40}$/)) return false
        if (!validator.isInt(this.quantity, { gt: 0 })) return false

        //null field
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })) return false

        return true
    }
}