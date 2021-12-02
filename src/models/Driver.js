import validator from 'validator'
import isFileValid from '../libs/isFileValid'

export default class Driver {
    constructor(
        id,
        dni,
        dniImage,
        dniDateStart,
        dniDateEnd,
        license,
        licenseImage,
        licenseDateStart,
        licenseDateEnd,
        name,
        lastname,
        cellphoneOne,
        cellphoneTwo,
        dateStart,
        dateEnd,
        contractImage,
        observation,
        transportId) {
        this.id = id
        this.dni = dni
        this.dniImage = dniImage
        this.dniDateStart = dniDateStart
        this.dniDateEnd = dniDateEnd
        this.license = license
        this.licenseImage = licenseImage
        this.licenseDateStart = licenseDateStart
        this.licenseDateEnd = licenseDateEnd
        this.name = name
        this.lastname = lastname
        this.cellphoneOne = cellphoneOne
        this.cellphoneTwo = cellphoneTwo
        this.dateStart = dateStart
        this.dateEnd = dateEnd
        this.contractImage = contractImage
        this.observation = observation
        this.transportId = transportId
    }

    isValid() {

        if (!validator.isUUID(this.id, 4)) return false
        if (!validator.isInt(this.dni, { allow_leading_zeroes: true, gt: -1 })) return false
        if (!validator.isLength(this.dni, { min: 8, max: 8 })) return false
        if (!validator.isAlphanumeric(this.license)) return false
        if (!validator.isLength(this.license, { min: 9, max: 9 })) return false
        if (!validator.matches(this.name, /^[a-zA-Z ]+$/)) return false
        if (!validator.isLength(this.name, { min: 3, max: 50 })) return false
        if (!validator.matches(this.lastname, /^[a-zA-Z ]+$/)) return false
        if (!validator.isLength(this.lastname, { min: 3, max: 50 })) return false
        if (!validator.isInt(this.cellphoneOne, { min: 900000000, max: 999999999 })) return false
        if (!validator.isDate(this.dateStart)) return false
        if (!validator.isUUID(this.transportId, 4)) return false

        if (this.dniDateStart)
            if (!validator.isDate(this.dniDateStart)) return false

        if (this.dniDateEnd)
            if (!validator.isDate(this.dniDateEnd)) return false

        if (this.licenseDateStart)
            if (!validator.isDate(this.licenseDateStart)) return false

        if (this.licenseDateEnd)
            if (!validator.isDate(this.licenseDateEnd)) return false

        if (this.dniImage)
            if (!isFileValid(this.dniImage)) return false

        if (this.licenseImage)
            if (!isFileValid(this.licenseImage)) return false

        if (this.cellphoneTwo)
            if (!validator.isInt(this.cellphoneTwo, { min: 900000000, max: 999999999 })) return false

        if (this.dateEnd)
            if (!validator.isDate(this.dateEnd)) return false

        if (this.contractImage)
            if (!isFileValid(this.contractImage)) return false

        if (this.observation)
            if (!validator.isLength(this.observation, { min: 0, max: 1000 })) return false

        return true
    }

    getFormData() {
        let formData = new FormData()
        formData.append('id', this.id)
        formData.append('dni', this.dni)
        formData.append('dniImage', this.dniImage)
        formData.append('dniDateStart', this.dniDateStart)
        formData.append('dniDateEnd', this.dniDateEnd)
        formData.append('license', this.license)
        formData.append('licenseImage', this.licenseImage)
        formData.append('licenseDateStart', this.licenseDateStart)
        formData.append('licenseDateEnd', this.licenseDateEnd)
        formData.append('name', this.name)
        formData.append('lastname', this.lastname)
        formData.append('cellphoneOne', this.cellphoneOne)
        formData.append('cellphoneTwo', this.cellphoneTwo)
        formData.append('dateStart', this.dateStart)
        formData.append('dateEnd', this.dateEnd)
        formData.append('contractImage', this.contractImage)
        formData.append('observation', this.observation)
        formData.append('transportId', this.transportId)
        return formData
    }

}

export class DriverQueryBody {
    constructor(name, lastname, transportId) {
        this.name = name
        this.lastname = lastname
        this.transportId = transportId
    }

    isValid() {

        if (this.name.length === 1 || this.name.length === 2) return false
        if (this.lastname.length === 1 || this.lastname.length === 2) return false
        if (this.transportId.length > 0 && this.transportId.length < 36) return false

        let isTherePropertyWithThreeCharacters = false
        if (this.name.length >= 3)
            if (validator.matches(this.name, /[a-zA-Z ]+/)) {
                isTherePropertyWithThreeCharacters = true
            } else {
                return false
            }

        if (this.lastname.length >= 3)
            if (validator.matches(this.lastname, /[a-zA-Z ]+/)) {
                isTherePropertyWithThreeCharacters = true
            } else {
                return false
            }

        if (this.transportId.length === 36)
            if (validator.isUUID(this.transportId, '4')) {
                isTherePropertyWithThreeCharacters = true
            } else {
                return false
            }

        return isTherePropertyWithThreeCharacters
    }
}