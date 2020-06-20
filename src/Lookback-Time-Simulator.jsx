import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import TimelineSlider from "./TimelineSlider";

export default class LookbackTimeSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            radiusLight: 0,
            startTime: 1200,
            hasStarted: false,
            isPlaying: false,
            superNovaButtonTxt: "Go Supernova",
        };

        this.state = this.initialState;
        this.raf = null;
    }

    render() {
        return (
            <React.Fragment>
                <div className="navigation-bar">
                    <NavigationBar

                    />
                </div>

                <MainView
                    radiusLight={this.state.radiusLight}
                />

                <div className={"controls"}>
                    <h3 id={"head-text"}>Timeline and Controls</h3>

                    <TimelineSlider
                        radiusLight={this.state.radiusLight}
                        hasStarted={this.state.hasStarted}
                    />

                    <button
                        type={"box"}
                        className={"go-supernova"}
                        onClick={this.modifyAnimation.bind(this)}
                    >
                        {this.state.superNovaButtonTxt}
                    </button>

                    <p id={"time-text"}>Supernova occurs</p>
                </div>
            </React.Fragment>
        );
    }

    modifyAnimation() {
        if (!this.state.isPlaying) this.raf = requestAnimationFrame(this.animate.bind(this));
        else cancelAnimationFrame(this.raf);

        this.setState({
            hasStarted: true,
            isPlaying: !this.state.isPlaying,
            superNovaButtonTxt: this.state.isPlaying ? "Resume" : "Pause"
        })
    }

    animate() {
        this.setState({ radiusLight: this.state.radiusLight + 0.5 });
        if (!(this.state.radiusLight > 100 || !this.state.isPlaying)) requestAnimationFrame(this.animate.bind(this));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}
