const Joi = require('joi');

// Schéma pour la création d'un produit
const createProductSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Le nom du produit est requis',
      'string.min': 'Le nom doit contenir au moins 3 caractères',
      'string.max': 'Le nom ne peut pas dépasser 100 caractères'
    }),
  
  price: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Le prix doit être un nombre',
      'number.positive': 'Le prix doit être positif',
      'any.required': 'Le prix est requis'
    }),
  
  description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.empty': 'La description est requise',
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    }),
  
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Le stock doit être un nombre',
      'number.min': 'Le stock ne peut pas être négatif',
      'any.required': 'Le stock est requis'
    })
});

// Schéma pour la mise à jour du stock
const updateStockSchema = Joi.object({
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Le stock doit être un nombre',
      'number.min': 'Le stock ne peut pas être négatif',
      'any.required': 'Le stock est requis'
    })
});

module.exports = {
  createProductSchema,
  updateStockSchema
};