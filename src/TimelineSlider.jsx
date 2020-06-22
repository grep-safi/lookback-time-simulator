import React from 'react';
import SliderIcon from "./SliderIcon";
import Timeline from "./Timeline";

const WIDTH = 900;
const HEIGHT = 100;

export default class TimelineSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {
        const size = 800;
        const shiftUp = -330;

        // 24.5 is the minimum limit
        // 766 us the maximum limit
        const lineX = 24.5;

        return (
            <div className={"timeline-slider"}>
                <svg width={WIDTH} height={HEIGHT}>

                    {/*<rect width={"100%"} height={"100%"} fill={"#777"} />*/}

                    <g>
                        <Timeline

                            />
                    </g>

                    <g>
                        <SliderIcon
                            radiusLight={this.props.radiusLight}
                            startTime={this.props.startTime}
                            hasStarted={this.props.hasStarted}
                            updateSupernovaStart={this.props.updateSupernovaStart}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}