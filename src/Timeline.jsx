import React from 'react';
import { select, selectAll, scaleLinear, axisBottom } from 'd3/dist/d3';

const MAX_TIME = 10000;
const MIN_TIME = -8000;
const VISIBLE_INCREMENT = 2000;
const INCREMENT = 500;

const WIDTH = 800;
const HEIGHT = 100;

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const ticks = [];
        for (let i = MIN_TIME; i <= MAX_TIME; i += INCREMENT) {
            ticks.push( { value: i, isVisible: i % VISIBLE_INCREMENT === 0, isMajor: i % INCREMENT && !(i % VISIBLE_INCREMENT)});
        }
        const tickValues = ticks.map((t) => t.value)

        const xScale = scaleLinear()
            .domain(tickValues[0], tickValues[tickValues.length - 1])
            .range(20, WIDTH);
        
        // const xAxis = axisBottom(xScale)
        //     .tickSize(10)
        //     .tickPadding(5)
        //     .tickValues(tickValues)
        //     .tickFormat((d, i) => ticks[i].isVisible ? d : "");

        const xAxis = axisBottom(xScale)
            .tickSize(10)
            .tickPadding(5)
            .tickValues(tickValues)
            .tickFormat(function (d, i) {
                return ticks[i].isVisible ? d : "";
            });

        const timeline = select(this.ref.current)
            .append("g")
            // .attr("id", "timeline")
            // .attr("class", "x axis")
            // .attr("transform", "translate(0, " + HEIGHT / 2 + ")")
            .call(xAxis)
            // .selectAll("g")
            // .filter((d, i) => !ticks[i].isVisible )
            // .classed("minor", true);

        // Add the class 'minor' to all minor ticks
        // timeline.selectAll("g")
        //     .filter((d, i) => !i.isVisible )
        //     .classed("minor", true);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        // const scalingFunction = (radius) => (110.5 / 245) * radius;
        //
        // select(this.ref.current)
        //     .attr('transform', `translate(${this.x + scalingFunction(this.props.radiusLight)}, 0)`);
    }

    render() {
        return (
            <g ref={this.ref} />
        );
    }
}