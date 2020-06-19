import React from 'react';
import {select, drag, event} from 'd3/dist/d3';

export default class SliderIcon extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.x = 404.0;
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
                console.log(`x this is x       ${x}`);
                if (x > maxPixel) x = maxPixel;
                if (x < minPixel) x = minPixel;
                updateX(x);
                me
                    .attr("transform", `translate(${x}, 0)`)
            });


        // TODO change initial starting position to 1200
        select(this.ref.current)
            .attr('transform', `translate(390.0, 0)`)
            .append('path')
            .attr('d', 'M0 20 L 25 20 L 12.5 45 L 0 20 Z')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        select(this.ref.current)
            .attr('transform', `translate(${this.x + this.props.radiusLight * (110.5 / 245)}, 0)`);
    }

    render() {
        return (
            <g ref={this.ref} />
        );
    }
}