import validator from 'validator'

export default class Freight {
    constructor(
        id,
        dateStart,
        dateEnd,
        grt,
        grr,
        ton,
        pallet,
        routeId,
        truckTractorId,
        semiTrailerId,
        driverId,
        transportId,
        clientId,
        serviceId,
        observation
    ) {
        this.id = id
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.grt = grt
        this.grr = grr
        this.ton = ton
        this.pallet = pallet
        this.routeId = routeId
        this.truckTractorId = truckTractorId
        this.semiTrailerId = semiTrailerId
        this.driverId = driverId
        this.transportId = transportId
        this.clientId = clientId
        this.serviceId = serviceId
        this.observation = observation
    }

    isValid() {
        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.isDate(this.dateStart)) return false
        if (!validator.isUUID(this.routeId, 4)) return false
        if (!validator.isUUID(this.truckTractorId, 4)) return false
        if (!validator.isUUID(this.semiTrailerId, 4)) return false
        if (!validator.isUUID(this.driverId, 4)) return false
        if (!validator.isUUID(this.transportId, 4)) return false
        if (!validator.isUUID(this.clientId, 4)) return false
        if (!validator.isUUID(this.serviceId, 4)) return false

        //nulls
        if (!validator.isDate(this.dateEnd || '2021/08/11')) return false
        if (!validator.matches(this.grt || '322', /^[0-9-/]{3,1000}$/)) return false
        if (!validator.matches(this.grr || '322', /^[0-9-/]{3,1000}$/)) return false
        if (!validator.matches(this.ton || '12.12', /^[0-9]{1,2}(\.[0-9]{1,2})?$/)) return false
        if (!validator.isInt(this.pallet || '1', { allow_leading_zeroes: false, min: 0, max: 999 })) return false
        if (!validator.isLength(this.observation || 'foo', { min: 3, max: 1000 })) return false

        return true
    }

    static isFormattedIdValid(formattedId) {
        return validator.matches(formattedId || '', /^[fF]\d{6}$/)
    }
}

export class CompressedFreightsQueryBody {

    constructor(
        formattedId,
        dateStart,
        dateEnd,
        grt,
        grr,
        routeName,
        truckTractorLicensePlate,
        semiTrailerLicensePlate,
        driverFullName,
        transportId,
        clientId,
        serviceId
    ) {
        this.formattedId = formattedId.trim()
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.grt = grt.trim()
        this.grr = grr.trim()
        this.routeName = routeName.trim()
        this.truckTractorLicensePlate = truckTractorLicensePlate.trim()
        this.semiTrailerLicensePlate = semiTrailerLicensePlate.trim()
        this.driverFullName = driverFullName.trim()
        this.transportId = transportId
        this.clientId = clientId
        this.serviceId = serviceId
        // this.page = page 
    }

    /**Para filtrar por lo menos un campo tiene que estar validado correctamente*/
    areQueryFieldsValid() {
        let isThereAtLeastOneApprovedProp = false
        if (this.formattedId)
            if (validator.matches(this.formattedId, /^F?[0-9]{3,6}$/i)) {
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

        if (this.driverFullName)
            if (validator.matches(this.driverFullName, /^[a-zA-Z ]{3,50}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.routeName)
            if (validator.matches(this.routeName, /^[a-zA-Z ]{3,100}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.serviceId)
            if (validator.isUUID(this.serviceId, '4')) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.transportId)
            if (validator.isUUID(this.transportId, '4')) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.truckTractorLicensePlate)
            if (validator.matches(this.truckTractorLicensePlate, /^[a-zA-Z0-9-]{3,7}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.semiTrailerLicensePlate)
            if (validator.matches(this.semiTrailerLicensePlate, /^[a-zA-Z0-9-]{3,7}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.dateStart || this.dateEnd)
            if (validator.isDate(this.dateStart) &&
                validator.isDate(this.dateEnd)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.grt)
            if (validator.matches(this.grt, /^[0-9-/]{3,1000}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        if (this.grr)
            if (validator.matches(this.grr, /^[0-9-/]{3,1000}$/)) {
                isThereAtLeastOneApprovedProp = true
            } else {
                return false
            }

        // if (!validator.isInt(this.page, { allow_leading_zeroes: false, gt: 0 }))
        //     return false

        return isThereAtLeastOneApprovedProp
    }

    isMaximumDateRangeOneYear() {
        //si tiene contenido validar el rango, sino, debe ser campos nulos y retornar true
        if (this.dateStart && this.dateEnd) {
            const dateStartMls = Date.parse(this.dateStart)
            const dateEndMls = Date.parse(this.dateEnd)
            const oneDayInMileseconds = 86400000

            const dif = (dateEndMls - dateStartMls) / (oneDayInMileseconds * 366)
            if (dif <= 1) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    setPage(page = 1) {
        this.page = page
    }
}

export class FreightsNotLiquidatedQueryBody {
    constructor(transportId, driverId, dateStart, dateEnd) {
        this.transportId = transportId
        this.driverId = driverId
        this.dateStart = dateStart
        this.dateEnd = dateEnd
    }

    areQueryFieldsValid() {
        if (!validator.isUUID(this.transportId, 4)) return false
        if (!validator.isUUID(this.driverId, 4)) return false
        if (!validator.isDate(this.dateStart)) return false
        if (!validator.isDate(this.dateEnd)) return false
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

export class ClientFreightsQueryBody {
    constructor(
        clientId,
        liquidated,
        dateStart,
        dateEnd
    ) {
        this.clientId = clientId
        this.liquidated = liquidated
        this.dateStart = dateStart
        this.dateEnd = dateEnd
    }

    isValid() {
        if (!validator.isUUID(this.clientId || '', 4)) return false
        this.liquidated.toLowerCase()
        if (!(this.liquidated === 'true' || this.liquidated === 'false')) return false
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