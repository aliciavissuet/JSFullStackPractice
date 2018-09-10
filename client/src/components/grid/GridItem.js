import React from 'react'
import Artyom from 'artyom.js';
const Jarvis = new Artyom();

class GridItem extends React.Component {

    handleClick = () => {
        Jarvis.say(this.props.text)
    };

    render(){
        Jarvis.initialize ({
            lang:"en-US"
        });
        return (
            <div className={"grid-item"}>

                <i className="fas fa-edit text-info mr-1 grid-item-config"></i>
                <img src={this.props.image} onClick={this.handleClick} style={{height:"100%"}}/>
                <p>{this.props.text}</p>

            </div>
        )
    }
}
export default GridItem