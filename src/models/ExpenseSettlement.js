import validator from 'validator'

export default class ExpenseSettlement {
    constructor(
        id,
        datePresentation,
        toll,
        viatic,
        load,
        unload,
        garage,
        washed,
        tire,
        mobility,
        other,
        otherDetail,
        total,
        deposits,
        favorsTheCompany,
        residue,
        cancelled,
        observation
    ) {
        this.id = id
        this.datePresentation = datePresentation
        this.toll = toll.trim() || '0'
        this.viatic = viatic.trim() || '0'
        this.load = load.trim() || '0'
        this.unload = unload.trim() || '0'
        this.garage = garage.trim() || '0'
        this.washed = washed.trim() || '0'
        this.tire = tire.trim() || '0'
        this.mobility = mobility.trim() || '0'
        this.other = other.trim() || '0'
        this.otherDetail = otherDetail.trim()
        this.total = total.trim() || '0'
        this.deposits = deposits.trim() || '0'
        this.favorsTheCompany = favorsTheCompany
        this.residue = residue.trim() || '0'
        this.cancelled = cancelled
        this.observation = observation.trim()
    }

    isValid() {
        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.matches(this.toll, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.viatic, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.load, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.unload, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.garage, /^\d{1,3}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.washed, /^\d{1,3}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.tire, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.mobility, /^\d{1,3}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.other, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.matches(this.total, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.isDate(this.datePresentation)) return false
        if (!validator.matches(this.deposits, /^\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.isBoolean(this.favorsTheCompany)) return false
        if (!validator.matches(this.residue, /^-?\d{1,4}(\.\d{1,2})?$/)) return false
        if (!validator.isBoolean(this.cancelled)) return false

        //nulls
        if (!validator.isLength(this.otherDetail || 'foo', { min: 3, max: 1000 })) return false
        if (!validator.isLength(this.observation || 'foo', { min: 3, max: 1000 })) return false

        return true
    }
}

export class ExpenseSettlementsQueryBody {
    constructor(
        dateStart,
        dateEnd,
        liquidated
    ) {
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.liquidated = liquidated
    }

    areQueryFieldsValid() {
        if (!validator.isDate(this.dateStart)) return false
        if (!validator.isDate(this.dateEnd)) return false
        if (!validator.isBoolean(this.liquidated)) return false
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