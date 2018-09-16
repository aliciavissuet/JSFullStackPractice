import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import {createProfile, getCurrentProfile} from "../../actions/profileActions";
import {withRouter} from "react-router-dom";
import {addGridItem} from "../../actions/gridActions";

class PopoverItem extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
            text:this.props.text,
            image:this.props.image

        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const gridItemData = {
            text:this.state.text,
            image:this.state.image,
            id:this.props.index
        };

        this.props.addGridItem(this.props.id, gridItemData);
    };
    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    render() {
        const {errors} = this.props;

        return (
            <div>
        <i type="button" className="fas fa-edit text-info mr-1 grid-item-config" id={'Popover-' + this.props.index} onClick={this.toggle}> </i>
        <Popover placement={"top"} isOpen={this.state.popoverOpen} target={'Popover-' + this.props.index} toggle={this.toggle}>
          <PopoverHeader>Edit Button</PopoverHeader>
          <PopoverBody>
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
              </form>
          </PopoverBody>
            <footer>
                <button onClick={this.onSubmit} type="button" className="btn btn-primary" >Save changes</button>
            </footer>
        </Popover>
      </div>
        );
    }
}

PopoverItem.propTypes = {
    addGridItem:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    id:state.grids.grid._id,
    errors:state.errors
});
export default connect(mapStateToProps, {addGridItem})(PopoverItem)

