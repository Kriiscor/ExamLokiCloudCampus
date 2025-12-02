const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Le nom d\'utilisateur est requis',
      'string.min': 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
      'string.max': 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères',
      'string.alphanum': 'Le nom d\'utilisateur ne peut contenir que des lettres et chiffres'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'L\'email est requis',
      'string.email': 'L\'email doit être valide'
    }),
  
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
    .messages({
      'string.empty': 'Le mot de passe est requis',
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
    })
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le nom d\'utilisateur est requis'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Le mot de passe est requis'
    })
});

module.exports = {
  registerSchema,
  loginSchema
};