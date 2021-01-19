import React from 'react';
import { select, selectAll, scaleLinear, axisBottom } from 'd3/dist/d3';

const MAX_TIME = 10000;
const MIN_TIME = -8000;

const VISIBLE_INCREMENT = 2000;
const INCREMENT = 500;

const WIDTH = 900;
const HEIGHT = 100;

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const margin = {
            left: 50,
            right: 50
        };

        const ticks = [];
        for (let i = MIN_TIME; i <= MAX_TIME; i += INCREMENT) {
            ticks.push( { value: i, isVisible: i % VISIBLE_INCREMENT === 0, isMajor: i % INCREMENT && !(i % VISIBLE_INCREMENT)});
        }
        const tickValues = ticks.map((t) => t.value);

        const xScale = scaleLinear()
            .domain([tickValues[0], tickValues[tickValues.length - 1]])
            .range([margin.left, WIDTH - margin.right]);

        const xAxis = axisBottom(xScale)
            .tickSize(10)
            .tickPadding(5)
            .tickValues(tickValues)
            .tickFormat(function (d, i) {
                let data = d;
                let timePeriod = ' AD';
                if (d < 0) {
                    data *= -1;
                    timePeriod = ' BC'
                }

                return ticks[i].isVisible ? data + timePeriod : "";
            });

        select(this.ref.current)
            .append("g")
            .attr("id", "timeline")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${HEIGHT / 2 + 10})`)
            .call(xAxis)
            .selectAll("g")
            .filter((d, i) => !ticks[i].isVisible )
            .classed("minor", true);
    }

    render() {
        return (
            <g ref={this.ref} />
        );
    }
}