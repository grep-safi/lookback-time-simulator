import React from 'react';
import {select, event, drag, scaleLinear} from "d3/dist/d3";

// radius 245 is when we hit the guy
const WIDTH = 950;
const HEIGHT = 350;

const observerEyeX = 246;

const scale = scaleLinear()
    .domain([1000, 10000])
    .range([220, 875]);

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {

        };

        this.state = this.initialState;

        this.ref = React.createRef();
        this.time = 3000;
        this.personX = scale(this.time);
    }

    componentDidMount() {
        this.container = select(this.ref.current)
            .append('g')
            // .call(this.dragFunction());

        this.puzzledMan = this.container
            .append('image')
            .attr('href', './img/puzzled-man.jpg')
            .attr('id', 'man')
            .attr('height', 250)
            .attr('width', 250)
            .attr('transform', `translate(250, 25)`)
            .call(this.dragFunction());

        this.star = this.container
            .append('image')
            .attr('href', './img/star.png')
            .attr('id', 'star')
            .attr('height', 50)
            .attr('width', 50)
            .attr('transform', 'translate(345, 48)');
    }

    dragFunction() {
        const updatePosition = this.updatePosition.bind(this);

        return drag()
            .on('drag', function() {
                let xPos = event.x;

                console.log(`x: ${xPos}`);
                // Ensures that object cannot move outside of bounds
                if (xPos <= 220) xPos = 220;
                if (xPos >= WIDTH - 75) xPos = WIDTH - 75;

                select('#man')
                    .attr('transform', `translate(${xPos - 125}, 25)`);
                select('#star')
                    .attr('transform', `translate(${xPos - 25}, 48)`);

                updatePosition(xPos);
            });
    }

    updatePosition(x) {
        this.personX = x;
        this.time = scale.invert(this.personX);
        this.setState(this.state);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.resetCounter !== this.props.resetCounter) {
            this.time = 3000;
            this.personX = scale(this.time);

            select('#man')
                .attr('transform', `translate(${this.personX - 125}, 25)`);
            select('#star')
                .attr('transform', `translate(${this.personX - 25}, 48)`);

            this.setState(this.state);
        }

        const radiusCircle = this.props.radiusLight < 0 ? 0 : this.props.radiusLight;
        this.props.onChange(125 + radiusCircle >= this.personX, this.time);
        // console.log(`stuff: ${125 + radiusCircle >= this.personX}`);
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
        // const end = 370;
        const end = this.personX;
        const center = (start + end) / 2;

        // console.log(`required: ${scale.invert(125 + radiusCircle)}`);

        return (
            <div className={"main-view"}>
                <svg width={WIDTH} height={HEIGHT}>
                    <rect width={"100%"} height={"100%"} fill={"black"} />
                    <g>
                        <text x={center - 60} y={320} fill={"aqua"}>{Math.round(this.time)} Light Years</text>
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
