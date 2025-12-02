const Joi = require('joi');

// Schéma pour un item de commande
const orderItemSchema = Joi.object({
  productId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.empty': 'L\'ID du produit est requis',
      'string.pattern.base': 'L\'ID du produit doit être un ObjectId MongoDB valide'
    }),
  
  quantity: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .required()
    .messages({
      'number.base': 'La quantité doit être un nombre',
      'number.min': 'La quantité doit être au moins 1',
      'number.max': 'La quantité ne peut pas dépasser 100',
      'any.required': 'La quantité est requise'
    }),
  
  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Le prix doit être un nombre',
      'number.positive': 'Le prix doit être positif',
      'any.required': 'Le prix est requis'
    })
});

// Schéma pour l'adresse de livraison
const shippingAddressSchema = Joi.object({
  street: Joi.string()
    .required()
    .messages({
      'string.empty': 'La rue est requise'
    }),
  
  city: Joi.string()
    .required()
    .messages({
      'string.empty': 'La ville est requise'
    }),
  
  postalCode: Joi.string()
    .pattern(/^\d{5}$/)
    .required()
    .messages({
      'string.empty': 'Le code postal est requis',
      'string.pattern.base': 'Le code postal doit contenir 5 chiffres'
    }),
  
  country: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le pays est requis'
    })
});

// Schéma pour la création de commande
const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(orderItemSchema)
    .min(1)
    .required()
    .messages({
      'array.min': 'La commande doit contenir au moins un article',
      'any.required': 'Les articles sont requis'
    }),
  
  shippingAddress: shippingAddressSchema.required(),
  
  paymentMethod: Joi.string()
    .valid('Carte bancaire', 'PayPal', 'Virement')
    .required()
    .messages({
      'any.only': 'Le moyen de paiement doit être: Carte bancaire, PayPal ou Virement',
      'any.required': 'Le moyen de paiement est requis'
    }),
  
  shippingMethod: Joi.string()
    .valid('colissimo', 'chronopost')
    .required()
    .messages({
      'any.only': 'La méthode de livraison doit être: colissimo ou chronopost',
      'any.required': 'La méthode de livraison est requise'
    })
});

// Schéma pour la mise à jour du statut
const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('En attente', 'En cours de traitement', 'Expédiée', 'Délivrée', 'Annulée')
    .required()
    .messages({
      'any.only': 'Le statut doit être: En attente, En cours de traitement, Expédiée, Délivrée ou Annulée',
      'any.required': 'Le statut est requis'
    })
});

// Schéma pour la validation d'un ObjectId MongoDB
const objectIdSchema = Joi.object({
  orderId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'L\'ID de commande doit être un ObjectId MongoDB valide',
      'any.required': 'L\'ID de commande est requis'
    })
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  objectIdSchema
};