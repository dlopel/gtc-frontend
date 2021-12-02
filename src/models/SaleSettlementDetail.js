import validator from 'validator'

export default class SaleSettlementDetail {
    constructor(
        id,
        freightId,
        valueWithoutIgv,
        valueAdditionalWithoutIgv,
        valueAdditionalDetail,
        observation
    ) {
        this.id = id
        this.freightId = freightId.trim()
        this.valueWithoutIgv = valueWithoutIgv.trim()
        this.valueAdditionalWithoutIgv = valueAdditionalWithoutIgv.trim() || '0'
        this.valueAdditionalDetail = valueAdditionalDetail.trim()
        this.observation = observation.trim()
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.isUUID(this.freightId || '', 4)) return false
        if (!validator.matches(this.valueWithoutIgv, /^\d{1,5}(\.\d{1,2})?$/)) return false

        //null
        if (!validator.matches(this.valueAdditionalWithoutIgv || '100', /^\d{1,5}(\.\d{1,2})?$/)) return false
        if (!validator.isLength(this.valueAdditionalDetail || 'FOO', { min: 3, max: 100 })) return false
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })) return false

        return true
    }
}


export class SaleSettlementDetailList {
    constructor(SaleSettlementDetailList = []) {
        this.SaleSettlementDetailList = SaleSettlementDetailList
    }

    isValid() {
        if (this.SaleSettlementDetailList.length < 1) return false

        for (let i = 0; i < this.SaleSettlementDetailList.length; i++) {
            if (!this.SaleSettlementDetailList[i].isValid()) return false
        }

        return true
    }
}