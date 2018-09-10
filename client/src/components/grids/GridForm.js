import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addGrid} from "../../actions/gridActions";
import TextFieldGroup from "../common/TextFieldGroup";


class GridForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            rows:3,
            columns:3,
            errors:{}

        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors:newProps.errors})
        }
    };

    onSubmit(e) {
        e.preventDefault();

        const newGrid = {
            title:this.state.title,
            description:this.state.description,
            rows:this.state.rows,
            columns:this.state.columns
        };

        this.props.addGrid(newGrid);
        this.setState({title:'', description:''})

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Create a new communication board
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className={"form-group"}>
                                <TextFieldGroup
                                    placeholder={"grid title"}
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    name={"title"}
                                    error={errors.title}

                                />
                            </div>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder={"description of communication board"}
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    name={"description"}
                                    error={errors.description}
                                />
                            </div>
                            <div className="form-group">
                                <TextFieldGroup
                                    placeholder={"number of rows"}
                                    type={'number'}
                                    onChange={this.onChange}
                                    value={this.state.gridRows}
                                    name={"rows"}

                                />
                            </div>
                            <div className="form-group">
                                <TextFieldGroup
                                    placeholder={"number of columns"}
                                    type={'number'}
                                    onChange={this.onChange}
                                    value={this.state.gridColumns}
                                    name={"columns"}


                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
GridForm.propTypes = {
    addGrid: PropTypes.func.isRequired,

    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

    errors:state.errors
});



export default connect(mapStateToProps, {addGrid})(GridForm);