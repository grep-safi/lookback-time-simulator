import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import TimelineSlider from "./TimelineSlider";

const radiusLightToYears = (radius) => radius * (3000 / 246);

export default class LookbackTimeSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            // 246 radiusLight corresponds to 3000 years
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
                        startTime={this.state.startTime}
                        updateSupernovaStart={this.updateSupernovaStart.bind(this)}
                    />

                    <button
                        className={"go-supernova-btn"}
                        onClick={this.modifyAnimation.bind(this)}
                    >
                        {this.state.superNovaButtonTxt}
                    </button>

                    <p id={"time-text"}>Supernova occurs: {this.getYearString()}</p>
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

    // If the simulation hasn't started playing yet, update the start time
    updateSupernovaStart(newStartTime) {
        if (!this.state.hasStarted) {
            this.setState({ startTime: newStartTime });
        } else {
            // this.setState({ radiusLightYears: radiusLightToYears(newStartTime) })
        }
    }

    getYearString() {
        const currStart = this.state.startTime;
        return currStart > 0 ? `${currStart} AD` : `${-currStart} BC`;
    }

    animate() {
        this.setState({ radiusLight: this.state.radiusLight + 0.5 });
        if (!(radiusLightToYears(this.state.radiusLight) + this.state.startTime >= 10000 || !this.state.isPlaying)) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}
