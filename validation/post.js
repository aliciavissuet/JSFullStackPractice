const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){
    let errors = {};

    data.text = !isEmpty(data.text)?data.text : '';
    data.title =!isEmpty(data.title)?data.title:'';




    if(Validator.isEmpty(data.text)){
        errors.text = 'text field is required'
    }
    if(Validator.isEmpty(data.title)){
        errors.title = 'title field is required'
    }
    if(!Validator.isLength(data.text, {min:1, max:600})){
        errors.text = 'text field must be at least 1 character and less than 600'
    }
    if(!Validator.isLength(data.title, {min:1, max:40})){
        errors.title = 'minimum of 1 character and maximum of 40 for title'
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}