import { Joi } from 'celebrate'

export const PersonModel = Joi.object().keys({
  name: Joi.string().min(2).max(32).required(),
  city: Joi.string().min(2).max(32).required()
})

export const PersonModelExtended = Joi.alternatives().try(Joi.array().items(PersonModel), PersonModel)
