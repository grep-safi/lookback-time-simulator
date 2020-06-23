import React from 'react';

// radius 245 is when we hit the guy
const WIDTH = 950;
const HEIGHT = 350;

const observerEyeX = 246;

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {

    }

    getStars(xPos, yPos) {
        const imgProps = {
            x: xPos,
            y: yPos,
            href: "./img/star.png",
            height: 50,
            width: 50
        }

        if (this.props.hasStarted && this.props.radiusLight >= 0 && xPos === 100) return null;
        if (this.props.hasStarted && this.props.radiusLight >= observerEyeX) return null;

        return <image {...imgProps} />;
    }

    render() {
        const radiusCircle = this.props.radiusLight < 0 ? 0 : this.props.radiusLight;

        return (
            <div className={"main-view"}>
                <svg width={WIDTH} height={HEIGHT}>
                    <rect width={"100%"} height={"100%"} fill={"black"} />
                    <g>
                        <image x={120} y={160} href={"./img/distance-line.png"} height={250} width={250} />
                        <text x={190} y={320} fill={"aqua"}>3000 Light Years</text>
                        {/*<image x={100} y={160} href={"./img/star.png"} height={50} width={50} />*/}
                        <image x={250} y={25} href={"./img/puzzled-man.jpg"} height={250} width={250} />
                        {/*<image x={345} y={48} href={"./img/star.png"} height={50} width={50} />*/}

                        <g> {this.getStars(100, 160)} </g>
                        <g> {this.getStars(345, 48)} </g>

                        <circle cx={125} cy={186} r={radiusCircle} stroke={"red"} fill={"none"} />
                    </g>
                </svg>
            </div>
        );
    }
}
