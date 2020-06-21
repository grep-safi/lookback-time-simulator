import React from 'react';
import {select, drag, event, scaleLinear} from 'd3/dist/d3';

// The boundaries of the timeline in pixels
const minPixel = 38;
const maxPixel = 838;

const scalingFunction = (radius) => (110.5 / 245) * radius;
const yearScale = scaleLinear().domain([-8000, 10000]).range([minPixel, maxPixel]);

export default class SliderIcon extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    updateX(x) {
        this.x = x;
    }

    componentDidMount() {
        const initialYear = 1200;
        const handleDrag = this.dragFunction();

        select(this.ref.current)
            .append('path')
            .attr('transform', `translate(${yearScale(initialYear)}, 0)`)
            .attr('d', 'M0 20 L 25 20 L 12.5 45 L 0 20 Z')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);
    }

    dragFunction() {
        // Width of the slider icon
        const widthIcon = 12.5;

        const updateX = this.updateX.bind(this);
        // const updateSupernovaStart = this.props.updateSupernovaStart.bind(this);
        const updateSupernovaStart = this.props.updateSupernovaStart;

        return drag()
            .on('drag', function() {
                let x = event.x - widthIcon;
                if (x > maxPixel) x = maxPixel;
                if (x < minPixel) x = minPixel;
                updateX(x);
                const newStartYear = yearScale.invert(x);
                // console.log(`yearscale inverted; ${yearScale.invert(x)}`);
                updateSupernovaStart(Math.round(newStartYear));
                select(this).attr("transform", `translate(${x}, 0)`);
            });
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        // select(this.ref.current)
        //     .attr('transform', `translate(${this.x + scalingFunction(this.props.radiusLight)}, 0)`);
    }

    render() {
        return <React.Fragment>
            <g ref={this.ref} />
        </React.Fragment>
    }
}