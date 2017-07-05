// helloWorld.jsx
import React, { Component } from 'react';

class HelloWorld extends Component {
    state = {
        switch: 0,
        name: this.props.name1
    }

    clickHander = () => {
        const { name1, name2 } = this.props;

        if (this.state.switch === 0) {
            console.log(name1);
            this.setState({
                switch: 1,
                name: name2
            })
        } else {
            console.log(name2);
            this.setState({
                switch: 0,
                name: name1
            })
        }
    }

    render () {
        return (
            <div onClick={this.clickHander}>{ this.state.name } say: Hello World!</div>
        )
    }
}

export default HelloWorld;