import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';

const WIDTH = 950;
const HEIGHT = 300;

export default class LookbackTimeSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {

        };

        this.state = this.initialState;
    }

    render() {
        return (
            <React.Fragment>
                <div className="NavigationBar">
                    <NavigationBar
                        // onReset={this.handleReset.bind(this)}
                    />
                </div>
            </React.Fragment>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}
