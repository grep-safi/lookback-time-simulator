import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import MainView from './MainView.jsx';
import TimelineSlider from "./TimelineSlider";

export default class LookbackTimeSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            radiusLight: 0,
            superNovaButtonTxt: "Go Supernova",
            animationPlaying: false,
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
        if (!this.state.animationPlaying) {
            this.raf = requestAnimationFrame(this.animate.bind(this));
        } else {
            cancelAnimationFrame(this.raf);
        }

        this.setState({
            animationPlaying: !this.state.animationPlaying,
            superNovaButtonTxt: this.state.animationPlaying ? "Resume" : "Pause"
        })
    }

    animate() {
        console.log(`playing: ${this.state.radiusLight}`);
        this.setState({
            radiusLight: this.state.radiusLight + 1
        });

        if (this.state.radiusLight > 500 || !this.state.animationPlaying) {
            cancelAnimationFrame(this.raf);
        } else {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
}
