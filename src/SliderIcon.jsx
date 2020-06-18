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

        const handleDrag = drag()
            .on('end', function() {
                // console.log(`helooooooo`);
            })
            .on('drag', function() {
                const me = select(this);
                let x = event.x - sizeX;
                updateX(x);
                me
                    .attr("transform", `translate(${x}, 0)`)
            });


        select(this.ref.current)
            .attr('transform', `translate(404.0, 0)`)
            .append('path')
            .attr('d', 'M0 20 L 25 20 L 12.5 45 L 0 20 Z')
            .attr('fill', "lightpink")
            .attr('stroke', "black")
            .call(handleDrag);

        // select(this.ref.current)
        //     .attr('transform', `translate(404.0, 0)`)
        //     .append('rect')
        //     .attr('width', this.sizeX)
        //     .attr('height', this.sizeY)
        //     .attr('y', 20)
        //     .attr('fill', "red")
        //     .call(handleDrag);
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