const { body } = require('express-validator');

const validation = {

    registerValidation: function () {
        var validation = [
          body('studentid', 'Student ID should be 8 digits.').isLength({min: 8}),
          body('name', 'Name should not be empty.').notEmpty(),
			    body('email', 'Email should be valid.').isEmail(),
          body('college', 'College should not be empty.').notEmpty(),
          body('program', 'Program should not be empty.').notEmpty(),
          body('password', 'Passwords should contain at least 8 characters.').isLength({min: 6}),
          body('confirmpw').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
            .custom((value, { req }) => {
              if (value !== req.body.password) {
                throw new Error("Passwords must match.");
              }
            })
        ];
        return validation;
    }
}

module.exports = validation;