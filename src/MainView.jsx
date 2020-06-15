import React from 'react';

const WIDTH = 950;
const HEIGHT = 350;

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

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    render() {
        return (
            <div className={"main-view"}>
                <svg width={WIDTH} height={HEIGHT}>
                    <rect width={"100%"} height={"100%"} fill={"black"} />
                    <g>
                        <image x={110} y={160} href={"./img/distance-line.png"} height={260} width={260} />
                        <image x={100} y={160} href={"./img/star.png"} height={50} width={50} />
                        <image x={250} y={25} href={"./img/puzzled-man.jpg"} height={250} width={250} />
                        <image x={345} y={50} href={"./img/star.png"} height={50} width={50} />
                        <circle cx={125} cy={186} r={0} stroke={"red"} fill={"none"} />
                    </g>
                </svg>
            </div>
        );
    }
}
