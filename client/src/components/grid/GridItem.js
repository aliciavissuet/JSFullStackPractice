import React from 'react'
import Artyom from 'artyom.js';
import TextFieldGroup from "../common/TextFieldGroup";
import {connect} from 'react-redux'
import {addGridItem} from "../../actions/gridActions";
import PropTypes from 'prop-types';
import PopoverItem from './PopoverItem';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Jarvis = new Artyom();



class GridItem extends React.Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
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
            id:this.props.index
        };
        this.props.addGridItem(this.props.grids.grid._id, gridItem)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleClick = () => {
        Jarvis.say(this.props.text)
    };


    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }


    render(){




        Jarvis.initialize ({
            lang:"en-US"
        });
        return (
            <div className={"grid-item"}>

                <PopoverItem index={this.props.index} text={this.props.text} image={this.props.image}/>
                <img src={this.props.image} onClick={this.handleClick} style={{height:"100%", maxHeight:"150px"}}/>
                <p>{this.props.text}</p>

            </div>
        )
    }
}

GridItem.propTypes ={
    addGridItem:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    grids:state.grids,
    errors:state.errors
});
export default connect(mapStateToProps, {addGridItem: addGridItem})(GridItem);
