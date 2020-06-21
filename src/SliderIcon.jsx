import React from 'react';
import {select, drag, event, scaleLinear} from 'd3/dist/d3';

const scalingFunction = (radius) => (110.5 / 245) * radius;
const yearScale = scaleLinear().domain([-8000, 10000]).range([38, 838]);

export default class SliderIcon extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    updateX(x) {
        this.x = x;
    }

    componentDidMount() {
        const sizeX = 12.5;
        const updateX = this.updateX.bind(this);

        const minPixel = 38;
        const maxPixel = 838;

        // TODO add dragging function that changes props so that we can "go back" in time
        const handleDrag = drag()
            .on('end', function() {
                // console.log(`helooooooo`);
            })
            .on('drag', function() {
                let x = event.x - sizeX;
                if (x > maxPixel) x = maxPixel;
                if (x < minPixel) x = minPixel;
                let v = yearScale(1200);
                console.log(`her is the v ${v}`);
                updateX(x);
                select(this).attr("transform", `translate(${x}, 0)`);
            });

        select(this.ref.current)
            .append('path')
            .attr('transform', `translate(446.88888888888886, 0)`)
            .attr('d', 'M0 20 L 25 20 L 12.5 45 L 0 20 Z')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        select(this.ref.current)
            .attr('transform', `translate(${this.x + scalingFunction(this.props.radiusLight)}, 0)`);
    }

    render() {
        return <React.Fragment>
            <g ref={this.ref} />
            <g>
                <line x1={this.x} y1={25} x2={this.x} y2={60} strokeWidth={1} stroke={"red"} visibility={"visible"} />
            </g>
        </React.Fragment>
    }
}