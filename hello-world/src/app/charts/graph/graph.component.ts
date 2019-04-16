import { Component, OnInit } from '@angular/core';
import {PayableService} from '../../services/payable.service';
import {Payable} from '../../payable/Payable';
declare const d3;
import {GraphService} from '../../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {
  payables: Payable[] = [];
  datasetN = [];
  dataset = [];

  constructor(
    private payableFormService: PayableService,
    private graphFormService: GraphService,
  ) {
  }

  ngOnInit() {
    this.listPayable();
    this.graphFormService.graphComponent = this;
  }

  async listPayable() {
    this.datasetN = [];
    this.dataset = [];
    this.payables = await this.payableFormService.listPayables().toPromise() as Payable[];
    this.loadGraph();
  }


  renderingGraph() {

    const pie = d3.layout.pie()
      .value((d) => d.percent)
      .sort(null)
      .padAngle(.03);


    const w = 300;
    const h = 300;

    const outerRadius = w / 2;
    const innerRadius = 100;

    const color = d3.scale.category10();

    const arc = d3.svg.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    const svg = d3.select('#chart')
      .append('svg')
      .attr({
        width: w,
        height: h,
        class: 'shadow'
      }).append('g')
      .attr({
        transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
      });
    const path = svg.selectAll('path')
      .data(pie(this.dataset))
      .enter()
      .append('path')
      .attr({
        d: arc,
        fill: (d) => {
          return color(d.data.name);
        }
      });

    path.transition()
      .duration(1000)
      .attrTween('d', (d) => {
        const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return (t) => {
          return arc(interpolate(t));
        };
      });


    const restOfTheData = () => {
      const text = svg.selectAll('text')
        .data(pie(this.dataset))
        .enter()
        .append('text')
        .transition()
        .duration(200)
        .attr('transform', (d) => {
          return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('dy', '.4em')
        .attr('text-anchor', 'middle')
        .text((d) => {
          return d.data.percent;
        })
        .style({
          fill: '#fff',
          'font-size': '10px'
        });

      const legendRectSize = 20;
      const legendSpacing = 7;
      const legendHeight = legendRectSize + legendSpacing;


      const legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr({
          class: 'legend',
          transform: (d, i) => {
            return 'translate(-35,' + ((i * legendHeight) - 65) + ')';
          }
        });
      legend.append('rect')
        .attr({
          width: legendRectSize,
          height: legendRectSize,
          rx: 20,
          ry: 20
        })
        .style({
          fill: color,
          stroke: color
        });

      legend.append('text')
        .attr({
          x: 30,
          y: 15
        })
        .text((d) => {
          return d;
        }).style({
        fill: '#929DAF',
        'font-size': '14px'
      });
    };

    setTimeout(restOfTheData, 1000);
  }

  loadGraph() {
    for (const payable of this.payables) {
      this.datasetN.push({name: payable.placement.name, percent: payable.amount});
    }
    this.firstData(this.datasetN);

    for (const data of this.datasetN) {
      if (this.compareData(data) !== false) {
        this.sumAmount(data.name, data.percent, this.compareData(data));
      } else {
        this.includeData(data.name, data.percent);
      }
    }
    this.renderingGraph();
  }

  firstData(data) {
    this.dataset = [];
    if (data[0]) {
      this.dataset.push({name: data[0].name, percent: data[0].percent});
      this.datasetN.splice(0, 1);
    }
  }

  sumAmount(name, percent, index) {
    this.dataset[index].percent = this.dataset[index].percent + percent;
  }

  includeData(nameD, percentD) {
    this.dataset.push({name: nameD, percent: percentD});
  }

  compareData(aux) {
    for (const data of this.dataset) {
      if (data.name === aux.name) {
        return this.dataset.indexOf(data);
      }
    }
    return false;
  }
}
