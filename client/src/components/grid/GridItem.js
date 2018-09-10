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
            <div>
                <button onClick={this.handleClick} ><img src={this.props.image} />{this.props.text}</button>
            </div>
        )
    }
}
export default GridItem