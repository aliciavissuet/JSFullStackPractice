import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';
import {addGridItem} from "../../actions/gridActions";



class AddWord extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            text:'',
            image:'',
            errors:{}

        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const gridItem = {
            text: this.state.text,
            image: this.state.image,
            index:this.props.index
        };
        this.props.addGridItem(this.props.grids.grid._id, gridItem, this.props.history)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }


    render(){
       const {errors} = this.props;
        return (
            <div className="add-education">
                <div className="container">
                    <div className={"row"}>
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Word</h1>
                            <p className="lead text-center">Add a word and image to appear within your communication board</p>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="text"
                                    onChange={this.onChange}
                                    value={this.state.text}
                                    name="text"
                                    error={errors.text}
                                />
                                <TextFieldGroup
                                    placeholder="image url"
                                    onChange={this.onChange}
                                    value={this.state.image}
                                    name="image"
                                    error={errors.image}
                                />
                                <input
                                    type={"submit"}
                                    value={"submit"}
                                    className={"btn btn-info btn-block mt-4"}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddWord.propTypes ={
    addGridItem:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    grids:state.grids,
    errors:state.errors
});
export default connect(mapStateToProps, {addGridItem: addGridItem})(AddWord);