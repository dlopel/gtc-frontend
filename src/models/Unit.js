import validator from 'validator'
import isFileValid from '../libs/isFileValid'

export default class Unit {
    constructor(
        id,
        licensePlate,
        brand,
        model,
        engineNumber,
        chassisNumber,
        color,
        numberCylinders,
        numberAxles,
        numberTires,
        dryWeight,
        grossWeight,
        length,
        height,
        width,
        usefulLoad,
        numberSeats,
        bodyType,
        policyId,
        technicalReviewImage,
        technicalReviewDateStart,
        technicalReviewDateEnd,
        mtcImage,
        mtcDateStart,
        mtcDateEnd,
        propertyCardImage,
        propertyCardDateStart,
        propertyCardDateEnd,
        soatImage,
        soatDateStart,
        soatDateEnd,
        observation,
        transportId,
        year
    ) {
        this.id = id
        this.licensePlate = licensePlate
        this.brand = brand
        this.model = model || null
        this.engineNumber = engineNumber || null
        this.chassisNumber = chassisNumber || null
        this.color = color
        this.numberCylinders = numberCylinders || null
        this.numberAxles = numberAxles || null
        this.numberTires = numberTires || null
        this.dryWeight = dryWeight || null
        this.grossWeight = grossWeight || null
        this.length = length || null
        this.height = height || null
        this.width = width || null
        this.usefulLoad = usefulLoad || null
        this.numberSeats = numberSeats || null
        this.bodyType = bodyType
        this.policyId = policyId || null
        this.technicalReviewImage = technicalReviewImage || null
        this.technicalReviewDateStart = technicalReviewDateStart || null
        this.technicalReviewDateEnd = technicalReviewDateEnd || null
        this.mtcImage = mtcImage || null
        this.mtcDateStart = mtcDateStart || null
        this.mtcDateEnd = mtcDateEnd || null
        this.propertyCardImage = propertyCardImage || null
        this.propertyCardDateStart = propertyCardDateStart || null
        this.propertyCardDateEnd = propertyCardDateEnd || null
        this.soatImage = soatImage || null
        this.soatDateStart = soatDateStart || null
        this.soatDateEnd = soatDateEnd || null
        this.observation = observation || null
        this.transportId = transportId
        this.year = year || null
    }
    isValid() {
        if (!validator.isUUID(this.id || '', 4)) return false
        if (!validator.matches(this.licensePlate || '', /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/)) return false
        if (!validator.isLength(this.licensePlate || '', { min: 7, max: 7 })) return false
        if (!validator.isAlpha(this.brand || '')) return false
        if (!validator.isLength(this.brand || '', { min: 3, max: 25 })) return false
        if (!validator.matches(this.color || '', /^[a-zA-Z ]+$/)) return false
        if (!validator.isLength(this.color || '', { min: 3, max: 25 })) return false
        if (!validator.isAlpha(this.bodyType || '')) return false
        if (!validator.isLength(this.bodyType || '', { min: 3, max: 25 })) return false
        if (!validator.isUUID(this.transportId || '', 4)) return false

        //null fields
        //when value is null, default value is set to pass filter 
        if (!validator.isInt(this.year || '1900', { allow_leading_zeroes: false, min: 1900, max: 2100 })) return false
        if (!validator.isAlphanumeric(this.model || 'FOOO-11', 'en-US', { ignore: ' -' })) return false
        if (!validator.isLength(this.model || 'FOO', { min: 3, max: 25 })) return false
        if (!validator.isAlphanumeric(this.engineNumber || 'FOO11')) return false
        if (!validator.isLength(this.engineNumber || 'FOO', { min: 3, max: 25 })) return false
        if (!validator.isAlphanumeric(this.chassisNumber || 'FOO11')) return false
        if (!validator.isLength(this.chassisNumber || 'FOO', { min: 3, max: 25 })) return false
        if (!validator.isInt(this.numberCylinders || '0', { allow_leading_zeroes: false, gt: -1 })) return false
        if (!validator.isInt(this.numberAxles || '0', { allow_leading_zeroes: false, gt: -1 })) return false
        if (!validator.isInt(this.numberTires || '0', { allow_leading_zeroes: false, gt: -1 })) return false
        if (!validator.matches(this.dryWeight || '12.123', /^[0-9]{1,2}(\.[0-9]{1,3})?$/)) return false
        if (!validator.matches(this.grossWeight || '12.123', /^[0-9]{1,2}(\.[0-9]{1,3})?$/)) return false
        if (!validator.matches(this.length || '12.12', /^[0-9]{1,2}(\.[0-9]{1,2})?$/)) return false
        if (!validator.matches(this.height || '12.12', /^[0-9]{1,2}(\.[0-9]{1,2})?$/)) return false
        if (!validator.matches(this.width || '12.12', /^[0-9]{1,2}(\.[0-9]{1,2})?$/)) return false
        if (!validator.matches(this.usefulLoad || '12.123', /^[0-9]{1,2}(\.[0-9]{1,3})?$/)) return false
        if (!validator.isInt(this.numberSeats || '0', { allow_leading_zeroes: false, gt: -1 })) return false
        if (!validator.isUUID(this.policyId || 'd3545a7f-4cbb-4798-a08a-8021bc690245', 4)) return false
        if (!validator.isDate(this.technicalReviewDateStart || '2021/08/11')) return false
        if (!validator.isDate(this.technicalReviewDateEnd || '2021/08/11')) return false
        if (!validator.isDate(this.mtcDateStart || '2021/08/11')) return false
        if (!validator.isDate(this.mtcDateEnd || '2021/08/11')) return false
        if (!validator.isDate(this.propertyCardDateStat || '2021/08/11')) return false
        if (!validator.isDate(this.propertyCardDateEnd || '2021/08/11')) return false
        if (!validator.isDate(this.soatDateStart || '2021/08/11')) return false
        if (!validator.isDate(this.soatDateEnd || '2021/08/11')) return false
        if (!validator.isLength(this.observation || 'FOO', { min: 3, max: 1000 })) return false

        //validating images, images are null fields
        if (this.technicalReviewImage) {
            if (!isFileValid(this.technicalReviewImage)) return false
        }
        if (this.mtcImage) {
            if (!isFileValid(this.mtcImage)) return false
        }
        if (this.propertyCardImage) {
            if (!isFileValid(this.propertyCardImage)) return false
        }
        if (this.soatImage) {
            if (!isFileValid(this.soatImage)) return false
        }
        return true
    }

    getFormData() {
        let formData = new FormData()
        formData.append('id', this.id)
        formData.append('licensePlate', this.licensePlate)
        formData.append('brand', this.brand)
        formData.append('model', this.model)
        formData.append('engineNumber', this.engineNumber)
        formData.append('chassisNumber', this.chassisNumber)
        formData.append('color', this.color)
        formData.append('numberCylinders', this.numberCylinders)
        formData.append('numberAxles', this.numberAxles)
        formData.append('numberTires', this.numberTires)
        formData.append('dryWeight', this.dryWeight)
        formData.append('grossWeight', this.grossWeight)
        formData.append('length', this.length)
        formData.append('height', this.height)
        formData.append('width', this.width)
        formData.append('usefulLoad', this.usefulLoad)
        formData.append('numberSeats', this.numberSeats)
        formData.append('bodyType', this.bodyType)
        formData.append('policyId', this.policyId)
        formData.append('technicalReviewImage', this.technicalReviewImage)
        formData.append('technicalReviewDateStart', this.technicalReviewDateStart)
        formData.append('technicalReviewDateEnd', this.technicalReviewDateEnd)
        formData.append('mtcImage', this.mtcImage)
        formData.append('mtcDateStart', this.mtcDateStart)
        formData.append('mtcDateEnd', this.mtcDateEnd)
        formData.append('propertyCardImage', this.propertyCardImage)
        formData.append('propertyCardDateStart', this.propertyCardDateStart)
        formData.append('propertyCardDateEnd', this.propertyCardDateEnd)
        formData.append('soatImage', this.soatImage)
        formData.append('soatDateStart', this.soatDateStart)
        formData.append('soatDateEnd', this.soatDateEnd)
        formData.append('observation', this.observation)
        formData.append('transportId', this.transportId)
        formData.append('year', this.year)
        return formData
    }
}

export class UnitQueryBody {
    constructor(licensePlate, brand, bodyType, transportId) {
        this.licensePlate = licensePlate
        this.brand = brand
        this.bodyType = bodyType
        this.transportId = transportId
    }
    isValid() {

        if (this.licensePlate.length === 1 || this.licensePlate.length === 2) return false
        if (this.brand.length === 1 || this.brand.length === 2) return false
        if (this.bodyType.length === 1 || this.bodyType.length === 2) return false
        if (this.transportId.length === 1 || this.transportId.length === 2) return false

        let isTherePropertyWithThreeCharacters = false
        if (this.licensePlate.length >= 3 ||
            this.brand.length >= 3 ||
            this.bodyType.length >= 3 ||
            this.transportId.length >= 3)
            isTherePropertyWithThreeCharacters = true

        return isTherePropertyWithThreeCharacters
    }
}