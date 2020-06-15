import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import TimelineSlider from "./TimelineSlider";

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
                    <h3 id={"head-text"}>Timeline and Controls</h3>

                    <TimelineSlider

                    />

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
