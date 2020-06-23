import React from 'react';
import {select, drag, event, scaleLinear} from 'd3/dist/d3';

// The boundaries of the timeline in pixels
const minPixel = 50.5;
const maxPixel = 850.5;

const minYear = -8000;
const maxYear = 10000;

const observerEyeX = 246;

const scalingFunction = (radius) => (133.3333333 / observerEyeX) * radius;
const yearScale = scaleLinear().domain([minYear, maxYear]).range([minPixel, maxPixel]);

export default class SliderIcon extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.iconWidth = 12.5;
        this.iconX = yearScale(1200) - this.iconWidth;
        this.animationCompleted = false;
    }

    updateX(x) {
        this.iconX = x;
    }

    componentDidMount() {
        const initialYear = 1200;
        const handleDrag = this.dragFunction();

        this.path = select(this.ref.current)
            .append('path')
            .attr('transform', `translate(${yearScale(initialYear) - this.iconWidth}, 5)`)
            .attr('d', 'M0 20 L 25 20 L 12.5 45 L 0 20 Z')
            .attr('id', 'myIcon')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);
    }

    dragFunction() {
        const iconWidth = this.iconWidth;
        const updateSupernovaStart = this.props.updateSupernovaStart.bind(this);
        const updateX = this.updateX.bind(this);
        const animating = this.props.isPlaying;

        return drag()
            .on('drag', function() {
                if (!animating) {
                    let x = event.x - iconWidth;
                    if (x > (maxPixel - iconWidth)) x = maxPixel - iconWidth;
                    if (x < (minPixel - iconWidth)) x = minPixel - iconWidth;
                    updateX(x);

                    const newStartYear = yearScale.invert(x + iconWidth);
                    updateSupernovaStart(Math.round(newStartYear));
                    select('#myIcon').attr("transform", `translate(${x}, 5)`);
                }
            });
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        // Radius light hits viewer's eye at 246
        // let radLightIncrease = scalingFunction(this.props.radiusLight);
        // if (scalingFunction(this.props.radiusLight) < 0) {
        // }

        this.iconX = this.iconX + scalingFunction(this.props.radiusLight - prevProps.radiusLight);
        console.log(`curr: ${this.props.radiusLight} and prev: ${prevProps.radiusLight}`);
        select('#myIcon')
            .attr('transform', `translate(${this.iconX}, 5)`);
    }

    render() {
        const SNOccursVisible = this.props.hasStarted ? `visible` : `hidden`;
        const SNOccursX = yearScale(this.props.startTime);

        if (this.props.hasStarted && this.props.radiusLight >= observerEyeX) {
            this.animationCompleted = true;
        }

        const SNObservedVisible = this.animationCompleted ? `visible` : `hidden`;
        const SNObservedX = yearScale(this.props.startTime + 3000);

        const textWidth = 30;
        const textPosition = yearScale(this.props.startTime) - textWidth;
        return <React.Fragment>
            <g ref={this.ref} />
            <text x={textPosition} y={18}>SN Occurs</text>
            <line x1={SNOccursX} y1={25} x2={SNOccursX} y2={50} strokeWidth={1} stroke={"red"} visibility={SNOccursVisible} />

            <text x={SNObservedX - textWidth} y={18} visibility={SNObservedVisible}>SN Observed</text>
            <line x1={SNObservedX} y1={25} x2={SNObservedX} y2={50} strokeWidth={1} stroke={"red"} visibility={SNObservedVisible} />
        </React.Fragment>
    }
}