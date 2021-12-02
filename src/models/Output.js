import validator from 'validator'

export default class Output {
    constructor(
        id,
        bankId,
        freightId,
        outputTypeId,
        date,
        value,
        operation,
        observation
    ) {
        this.id = id
        this.bankId = bankId
        this.freightId = freightId.trim()
        this.outputTypeId = outputTypeId
        this.date = date
        this.value = value
        this.operation = operation.trim()
        this.observation = observation.trim()
        this.userId = ''
    }

    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.isUUID(this.bankId || '', 4)) return false
        if (!validator.isUUID(this.outputTypeId || '', 4)) return false
        if (!validator.isDate(this.date || '')) return false
        if (!validator.matches(this.value, /^\d{1,5}(\.\d{1,2})?$/)) return false

        //null
        if (!validator.isUUID(this.freightId || 'cf6bab5c-518a-4862-8939-4293a074daba', 4)) return false
        if (!validator.matches(this.operation || '123', /^[0-9]{3,25}$/)) return false
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 100 })) return false
        return true
    }
}

export class OutputsQueryBody {
    constructor(
        bankId,
        dateStart,
        dateEnd
    ) {
        this.bankId = bankId
        this.dateStart = dateStart
        this.dateEnd = dateEnd
    }

    isValid() {
        if (!validator.isUUID(this.bankId || '', 4)) return false
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