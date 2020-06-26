import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import TimelineSlider from "./TimelineSlider";
import { select } from 'd3/dist/d3';

const radiusLightToYears = (radius) => radius * (3000 / 246);
const yearsToRadiusLight = (years) => years * (246 / 3000);

const observerEyeX = 246;

export default class LookbackTimeSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            // 246 radiusLight corresponds to 3000 years
            radiusLight: 0,
            startTime: 1200,
            hasStarted: false,
            isPlaying: false,
            endOfTimeReached: false,
            superNovaButtonTxt: "Go Supernova",
            resetCounter: 0,
            reachedObserver: false,
            separationTime: 3000,
        };

        this.displayObservationText = false;

        this.state = this.initialState;
        this.raf = null;
    }

    render() {
        return (
            <React.Fragment>
                <div className="navigation-bar">
                    <NavigationBar
                        onReset={this.onReset.bind(this)}
                    />
                </div>

                <MainView
                    radiusLight={this.state.radiusLight}
                    hasStarted={this.state.hasStarted}
                    resetCounter={this.state.resetCounter}
                    onChange={this.onChange.bind(this)}
                />

                <div className={"controls"}>
                    <h3 id={"head-text"}>Timeline and Controls</h3>

                    <TimelineSlider
                        radiusLight={this.state.radiusLight}
                        hasStarted={this.state.hasStarted}
                        isPlaying={this.state.isPlaying}
                        startTime={this.state.startTime}
                        updateSupernovaStart={this.updateSupernovaStart.bind(this)}
                        resetCounter={this.state.resetCounter}
                        reachedObserver={this.state.reachedObserver}
                        separationTime={this.state.separationTime}
                    />

                    <button
                        className={"go-supernova-btn"}
                        disabled={this.state.endOfTimeReached}
                        onClick={this.modifyAnimation.bind(this)}
                    >
                        {this.state.superNovaButtonTxt}
                    </button>

                    <p id={"time-text"}>Supernova occurs: {this.getYearString()} <br />{this.getObservedYearString()}</p>

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
            this.setState({ radiusLight: yearsToRadiusLight(newStartTime - this.state.startTime) });
        }
    }

    getYearString() {
        const currStart = Math.round(this.state.startTime);
        return currStart > 0 ? `${currStart} AD` : `${-currStart} BC`;
    }

    getObservedYearString() {
        if (this.displayObservationText) {
            const currStart = Math.round(this.state.startTime) + Math.round(this.state.separationTime);
            return currStart > 0 ? `Is Observed: ${currStart} AD` : `Is Observed: ${-currStart} BC`;
        }
        return "";
    }

    animate() {
        this.setState({ radiusLight: this.state.radiusLight + 0.5 });

        if (!(radiusLightToYears(this.state.radiusLight) + this.state.startTime >= 10000 || !this.state.isPlaying)) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.hasStarted && this.state.reachedObserver) {
            this.displayObservationText = true;
        }
    }

    onChange(bool, newSeparationTime) {
        if (this.state.reachedObserver !== bool || this.state.separationTime !== newSeparationTime) {
            this.setState({
                reachedObserver: bool,
                separationTime: newSeparationTime,
            });
        }
    }

    onReset() {
        this.displayObservationText = false;
        cancelAnimationFrame(this.raf);
        this.raf = null;

        this.setState({
            ...this.initialState,
            resetCounter: this.state.resetCounter + 1
        });
    }
}
