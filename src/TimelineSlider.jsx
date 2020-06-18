import React from 'react';

const WIDTH = 800;
const HEIGHT = 100;

const renderOrbitalRadii = () => {
    return (data, index) => {
        const circleProperties = {
            cx: 0,
            cy: HEIGHT / 2,
            r: data.r,
            stroke: data.stroke,
            fill: "none",
            key: index
        }

        return <circle {...circleProperties} />;
    }
}

export default class TimelineSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }


    render() {
        const size = 800;
        const shiftUp = -330;
        return (
            <div className={"timeline-slider"}>
                <svg width={WIDTH} height={HEIGHT}>

                    <g>
                        <SliderIcon

                        />
                    </g>
                    <rect width={"100%"} height={"100%"} fill={"white"} />
                    <image x={0} y={shiftUp} href={"./img/background.png"} height={size} width={size} />
                </svg>
            </div>
        );
    }
}