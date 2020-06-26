import React from 'react';
import {select} from "d3/dist/d3";

// radius 245 is when we hit the guy
const WIDTH = 950;
const HEIGHT = 350;

const observerEyeX = 246;

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.container = select(this.ref.current)
            .append('g');

        this.puzzledMan = this.container
            .append('image')
            .attr('href', './img/puzzled-man.jpg')
            // .attr('x', 250)
            // .attr('y', 25)
            .attr('height', 250)
            .attr('width', 250)
            .attr('transform', `translate(250, 25)`);

        this.star = this.container
            .append('image')
            .attr('href', './img/star.png')
            .attr('height', 50)
            .attr('width', 50)
            .attr('transform', 'translate(345, 48)');
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
        const start = 100;
        const end = 370;
        const center = (start + end) / 2;

        return (
            <div className={"main-view"}>
                <svg width={WIDTH} height={HEIGHT}>
                    <rect width={"100%"} height={"100%"} fill={"black"} />
                    <g>
                        <text x={190} y={320} fill={"aqua"}>3000 Light Years</text>
                        <g ref={this.ref} />
                        {/*<image x={250} y={25} href={"./img/puzzled-man.jpg"} height={250} width={250} />*/}

                        Horizontal
                        <line x1={start} x2={end} y1={290} y2={290} stroke={'red'} />
                        Vertical Left
                        <line x1={start} x2={start} y1={290} y2={280} stroke={'red'} />
                        Vertical Right
                        <line x1={end} x2={end} y1={290} y2={280} stroke={'red'} />
                        Center
                        <line x1={center} x2={center} y1={290} y2={300} stroke={'red'} />

                        <g> {this.getStars(100, 160)} </g>
                        {/*<g> {this.getStars(345, 48)} </g>*/}

                        <circle cx={125} cy={186} r={radiusCircle} stroke={"red"} fill={"none"} />
                    </g>
                </svg>
            </div>
        );
    }
}
