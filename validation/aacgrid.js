const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAacGridInput(data){
    let errors = {};

    data.title =!isEmpty(data.title)?data.title:'';



    if(Validator.isEmpty(data.title)){
        errors.title = 'title field is required'
    }

    if(!Validator.isLength(data.title, {min:1, max:40})){
        errors.title = 'minimum of 1 character and maximum of 40 for title'
    }
    if(Validator.isEmpty(data.rows)){
        errors.rows = 'number of rows is required'
    }
    if(!Validator.isInt(data.rows, {min:1, max:6})){
        errors.rows = 'minimum of 1 row and maximum of 6 rows'
    }
    if(Validator.isEmpty(data.columns)){
        errors.columns = 'number of columns is required'
    }
    if(!Validator.isInt(data.columns, {min:1, max:6})){
        errors.columns = 'minimum of 1 column and maximum of 6 columns'
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }
};