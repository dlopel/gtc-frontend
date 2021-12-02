import validator from 'validator'

export default class SaleSettlement {
    constructor(
        id,
        date,
        clientId,
        valueWithoutIgv,
        valueIgv,
        valueWithIgv,
        invoiceNumber,
        invoiceDate,
        observation
    ) {
        this.id = id
        this.date = date.trim()
        this.clientId = clientId.trim()
        this.valueWithoutIgv = valueWithoutIgv.trim() || '0'
        this.valueIgv = valueIgv.trim() || '0'
        this.valueWithIgv = valueWithIgv.trim() || '0'
        this.invoiceNumber = invoiceNumber.trim()
        this.invoiceDate = invoiceDate.trim()
        this.observation = observation.trim()
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.isUUID(this.clientId || '', 4)) return false
        if (!validator.isDate(this.date || '')) return false
        if (!validator.matches(this.valueWithoutIgv, /^\d{1,6}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.valueIgv, /^\d{1,6}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.valueWithIgv, /^\d{1,6}(\.\d{1,2})?$/)) return false

        //null
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })) return false
        if (!validator.isDate(this.invoiceDate || '2020-01-01')) return false
        if (!validator.matches(this.invoiceNumber || 'F001-4', /^[fF0-9]{1}\d{3}-\d{1,8}$/)) return false

        return true
    }

    isDateValid() {
        if (typeof this.invoiceNumber !== 'string') return false
        return validator.isDate(this.date || '')
    }

    isInvoiceNumberValid() {
        if (typeof this.invoiceNumber !== 'string') return false
        return validator.matches(this.invoiceNumber || 'F001-4', /^[fF0-9]{1}\d{3}-\d{1,8}$/)
    }

    isInvoiceDateValid() {
        if (typeof this.invoiceDate !== 'string') return false
        return validator.isDate(this.invoiceDate || '2020-01-01')
    }

    isObservationValid() {
        if (typeof this.observation !== 'string') return false
        return validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })
    }
}

export class SaleSettlementsQueryBody {
    constructor(
        dateStart,
        dateEnd
    ) {
        this.dateStart = dateStart
        this.dateEnd = dateEnd
    }

    isValid() {
        if (!validator.isDate(this.dateStart || '')) return false
        if (!validator.isDate(this.dateEnd || '')) return false
        return true
    }

    isMaximumDateRangeOneYear() {
        const dateStartMls = Date.parse(this.dateStart)
        const dateEndMls = Date.parse(this.dateEnd)
        const oneDayInMileseconds = 86400000

        const dif = (dateEndMls - dateStartMls) / (oneDayInMileseconds * 366)
        if (dif <= 1) {
            return true
        } else {
            return false
        }
    }
}