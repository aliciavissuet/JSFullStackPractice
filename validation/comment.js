const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(data){
    let errors = {};

    data.text = !isEmpty(data.text)?data.text : '';





    if(Validator.isEmpty(data.text)){
        errors.text = 'text field is required'
    }

    if(!Validator.isLength(data.text, {min:1, max:600})){
        errors.text = 'text field must be at least 1 character and less than 600'
    }




    return {
        errors,
        isValid: isEmpty(errors)
    }
}