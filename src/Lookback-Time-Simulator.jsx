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
                <div className="navigation-bar">
                    <NavigationBar

                    />
                </div>

                <MainView

                />

                <div className={"controls"}>
                    <h1 id={"head-text"}>Timeline and Controls</h1>
                    <button
                        type={"box"}
                        className={"go-supernova"}
                        >
                        Go Supernova
                    </button>
                </div>
            </React.Fragment>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}
