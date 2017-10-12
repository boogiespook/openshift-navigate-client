import React, { Component } from 'react';
import Header from './header';
import {HeaderBanner} from "./header2";
import { Collection, CollectionItem, Button } from "react-materialize";

class HlArch extends Component {

  browseFiles() {
    console.log('browsing files');
  }

  render() {

    const curUser={
      email:"user@email.com"
    };

    return (
      <hlarch>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>

          <div className="header">
            <div>High Level Architecture</div>
            <span className="flex1"></span>
          </div>

          <Collection>
            <CollectionItem>
              <div>
                <Button onClick={()=>this.browseFiles()} large className='newBtn' waves='light'>
                  Browse Files
                </Button>
              </div>
            </CollectionItem>
          </Collection>

        </div>
      </hlarch>
    )
  }
}

export default HlArch;