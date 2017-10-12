import React, { Component } from 'react';
import Header from './header';
import { render } from 'react-dom';
// import MindMap from 'react-mindmap';
import {HeaderBanner} from "./header2";
import { MindMapMain } from 'mind-map';

class MindMap2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "title": "learn anything - programming - programming languages - python"
    }

    this.state.HIERARCHY_RULES = {
      ROOT: {
        name: 'root',
        backgroundColor: '#7EC6E1',
        getChildren: () => [
          this.state.HIERARCHY_RULES.SALES_MANAGER,
          this.state.HIERARCHY_RULES.SHOW_ROOM,
          this.state.HIERARCHY_RULES.SALES_TEAM
        ]
      },
      SALES_MANAGER: {
        name: 'sales_manager',
        color: '#000000',
        backgroundColor: '#616161',
        getChildren: () => [
          this.state.HIERARCHY_RULES.SHOW_ROOM,
          this.state.HIERARCHY_RULES.SALES_TEAM
        ]
      },
      SHOW_ROOM: {
        name: 'show_room',
        color: '#000000',
        backgroundColor: '#989898',
        getChildren: () => [
          this.state.HIERARCHY_RULES.SALES_TEAM
        ]
      },
      SALES_TEAM: {
        name: 'sales_team',
        color: '#000000',
        backgroundColor: '#C6C6C6',
        getChildren: () => []
      }
    };

    this.state.option = {
      container: 'jsmind_container2',
      theme: 'normal',
      editable: true,
      depth: 4,
      hierarchyRule: this.state.HIERARCHY_RULES
    };

    this.state.mind = {
      "format": "nodeTree",
        "data": {
          "id": 1,
          "topic": "OCP Deployment",
          "selectedType": false,
          "backgroundColor": "#cccccc",
          "children": [
            {
              "id": 2,
              "color": "#000000",
              "topic": "Operations",
              "direction": "right",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": [{
                "id": 41,
                "color": "#000000",
                "topic": "Log & Mon",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
              },{
                "id": 42,
                "color": "#000000",
                "topic": "DR",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
              }]
            },
            {
              "id": 3,
              "color": "#000000",
              "topic": "AppDev",
              "direction": "right",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": [
                {
                  "id": 4,
                  "color": "#000000",
                  "topic": "App Monitoring",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#99d1f1",
                },
                {
                  "id": 20,
                  "color": "#000000",
                  "topic": "CI/CD Flow",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#99d1f1",
                },
                {
                  "id": 21,
                  "color": "#000000",
                  "topic": "Images",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#99d1f1",
                },
                {
                  "id": 22,
                  "color": "#000000",
                  "topic": "App Logging",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#99d1f1",
                },
                {
                  "id": 23,
                  "color": "#000000",
                  "topic": "Versioning",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#99d1f1",
                }
              ]
            },
            {
              "id": 5,
              "color": "#000000",
              "topic": "Security",
              "direction": "right",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": [{
                "id": 24,
                "color": "#000000",
                "topic": "Secrets",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
              },{
                "id": 25,
                "color": "#000000",
                "topic": "Certificates",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
                "children": [{
                  "id": 26,
                  "color": "#000000",
                  "topic": "Dedicated",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#ff8e81",
                },{
                  "id": 27,
                  "color": "#000000",
                  "topic": "Wildcards",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#ff8e81",
                },{
                  "id": 28,
                  "color": "#000000",
                  "topic": "Self-Signed",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#ff8e81",
                }]
              }]
            },
            {
              "id": 6,
              "color": "#000000",
              "topic": "Automation",
              "direction": "right",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": []
            },
            {
              "id": 7,
              "color": "#000000",
              "topic": "Networking",
              "direction": "right",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": []
            },
            {
              "id": 10,
              "color": "#000000",
              "topic": "Strategy",
              "direction": "left",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": []
            },
            {
              "id": 11,
              "color": "#000000",
              "topic": "Storage",
              "direction": "left",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": [{
                "id": 50,
                "color": "#000000",
                "topic": "Storage Types",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
              },{
                "id": 51,
                "color": "#000000",
                "topic": "App Storage",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
              },{
                "id": 52,
                "color": "#000000",
                "topic": "Infa Component Storage",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
                "children": [{
                  "id": 53,
                  "color": "#000000",
                  "topic": "Storage Types",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#ff8e81",
                  "children": [{
                    "id": 60,
                    "color": "#000000",
                    "topic": "Speed",
                    "direction": "right",
                    "selectedType": false,
                    "backgroundColor": "#ffe179",
                  },{
                    "id": 61,
                    "color": "#000000",
                    "topic": "types",
                    "direction": "right",
                    "selectedType": false,
                    "backgroundColor": "#ffe179",
                  }]
                },{
                  "id": 54,
                  "color": "#000000",
                  "topic": "App Storage",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#ff8e81",
                },{
                  "id": 55,
                  "color": "#000000",
                  "topic": "Infa Component Storage",
                  "direction": "right",
                  "selectedType": false,
                  "backgroundColor": "#ff8e81",
                }]
              }]
            },
            {
              "id": 12,
              "color": "#000000",
              "topic": "BCR & DR",
              "direction": "left",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": [{
                "id": 29,
                "color": "#000000",
                "topic": "DR",
                "direction": "right",
                "selectedType": false,
                "backgroundColor": "#99d1f1",
              }]
            },
            {
              "id": 8,
              "color": "#000000",
              "topic": "Provisioning",
              "direction": "left",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": []
            },
            {
              "id": 9,
              "color": "#000000",
              "topic": "External Dep",
              "direction": "left",
              "selectedType": false,
              "backgroundColor": "#a3db7e",
              "children": []
            }
          ]
        }
      };

  }


  componentDidMount() {

    var that = this;
    // setTimeout(function() {
    //   MindMapMain.show(that.state.option, that.state.mind);
    // }, 4000);
    MindMapMain.show(this.state.option, this.state.mind);
  }

  render() {

    const curUser={
      email:"user@email.com"
    };

    return (
      <rhmindmap>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>
          <div className="show_mind_map" id="jsmind_container2"></div>
        </div>
      </rhmindmap>
    )
  }
}

export default MindMap2;



// import { Component } from 'react';
// import { render } from 'react-dom';
// import MindMap from 'react-mindmap';
// import { nodes, connections } from './my-map.json';

// class Example extends Component {
//   render() {
//     return (
//       <MindMap
//         nodes={this.props.nodes}
//         connections={this.props.connections}
//       />
//     );
//   }
// }

// render(
//   <Example nodes={nodes} connections={connections} />,
//   document.getElementById('target')
// );