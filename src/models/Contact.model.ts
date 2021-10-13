import { Joi } from 'celebrate'

export const ContactModel = Joi.object().keys({
  type: Joi.string().valid('email', 'whatsapp', 'phone').required(),
  personId: Joi.string().not().empty().required(),
  value: Joi.string().when('type', {
    is: 'email',
    then: Joi.string().email().normalize(),
    otherwise: Joi.string().min(2).max(32)
  }).required()
})

export const ContactModelExtended = Joi.alternatives().try(Joi.array().items(ContactModel), ContactModel)
