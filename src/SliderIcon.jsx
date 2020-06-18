import React from 'react';
import {select, drag, event} from 'd3/dist/d3';

export default class SliderIcon extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.sizeX = 5;
        this.sizeY = 30;
        this.x = 404.0;
    }

    updateX(x) {
        this.x = x;
    }

    componentDidMount() {
        const sizeX = this.sizeX / 2;
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
            .append('rect')
            .attr('width', this.sizeX)
            .attr('height', this.sizeY)
            .attr('y', 20)
            .attr('fill', "red")
            .call(handleDrag);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        select(this.ref.current)
            .attr('transform', `translate(${this.x + this.props.radiusLight / 2}, 0)`);
    }

    render() {
        return (
            <g ref={this.ref} />
        );
    }
}