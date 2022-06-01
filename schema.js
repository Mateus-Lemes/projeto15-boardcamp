import Joi from "joi";


export const categoriesSchema = Joi.object({
    name: Joi.string().required()
})

export const gameValidationSchema = Joi.object({
    name: Joi.string().min(1).required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().greater(0).required(),
    categoryId: Joi.number().required(),
    pricePerDay: Joi.number().greater(0).required(),
})

export const clientsValidationSchema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
    cpf: Joi.string().pattern(/^[0-9]{11}$/).required(),
    birthday: Joi.date().iso()
})