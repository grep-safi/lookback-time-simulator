import React from 'react';
import {select, drag, event} from 'd3/dist/d3';

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

        const minPixel = -378.0;
        const maxPixel = 363.5;

        // TODO add dragging function that changes props so that we can "go back" in time
        const handleDrag = drag()
            .on('end', function() {
                // console.log(`helooooooo`);
            })
            .on('drag', function() {
                const me = select(this);
                let x = event.x - sizeX;
                // console.log(`x this is x       ${x}`);
                if (x > maxPixel) x = maxPixel;
                if (x < minPixel) x = minPixel;
                updateX(x);
                me
                    .attr("transform", `translate(${x}, 0)`)
            });

        select(this.ref.current)
            .attr('transform', `translate(390.0, 0)`)
            .append('path')
            .attr('d', 'M0 20 L 25 20 L 12.5 45 L 0 20 Z')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        const scalingFunction = (radius) => (110.5 / 245) * radius;
        select(this.ref.current)
            .attr('transform', `translate(${this.x + scalingFunction(this.props.radiusLight)}, 0)`);
    }

    render() {
        console.log(`this is the x: ${this.x}`);

        return <React.Fragment>
            <g ref={this.ref} />
            <g>
                <line x1={this.x} y1={25} x2={this.x} y2={60} strokeWidth={1} stroke={"red"} visibility={"visible"} />
            </g>
        </React.Fragment>
    }
}