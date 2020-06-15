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
        const shiftUp = -350;
        return (
            <div className={"timeline-slider"}>
                <svg width={WIDTH} height={HEIGHT}>
                    {/*<rect width={"100%"} height={"100%"} fill={"black"} />*/}
                    <circle cx={125} cy={50} r={20} stroke={"red"} fill={"red"} />
                    <image x={0} y={shiftUp} href={"./img/background.png"} height={size} width={size} />
                </svg>
            </div>
        );
    }
}