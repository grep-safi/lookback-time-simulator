import React from 'react';
import SliderIcon from "./SliderIcon";
import Timeline from "./Timeline";

const WIDTH = 900;
const HEIGHT = 100;

export default class TimelineSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"timeline-slider"}>
                <svg width={WIDTH} height={HEIGHT}>
                    <g>
                        <Timeline

                            />
                    </g>

                    <g>
                        <SliderIcon
                            radiusLight={this.props.radiusLight}
                            startTime={this.props.startTime}
                            hasStarted={this.props.hasStarted}
                            isPlaying={this.props.isPlaying}
                            updateSupernovaStart={this.props.updateSupernovaStart}
                            resetCounter={this.props.resetCounter}
                            reachedObserver={this.props.reachedObserver}
                            separationTime={this.props.separationTime}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}