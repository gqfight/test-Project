import React,{Component} from 'react';
import {DeckGL, PathLayer} from "deck.gl";
import {StaticMap} from 'react-map-gl'
import  axios from 'axios'
//mapbox令牌
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ3FmaWdodCIsImEiOiJja2E2dG40NGswY29mMnpvengzOW01dDhkIn0.MDj2UqJPvBxFUPDhWH-Lnw'
const INITIAL_VIEW_STATE = {
  longitude: 101.278,
  latitude: 21.778,
  zoom: 13,
  pitch: 0,
  bearing: 0
};
export default class Test extends Component {
  state = {
    data:{},
    layer:[]
  }
  async componentDidMount() {
    let data = await axios.get("http://localhost:8078/login");
    data = data.data;
    this.setState({data})
    let layer = new PathLayer({
      id: 'path-layer',
      data:this.state.data,
      pickable: true,
      widthScale: 5,
      widthMinPixels: 1,
      getPath: d => d.path,
      getColor: d => {
        const hex = d.color;
        // convert to RGB
        return hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16));
      },
      getWidth: d => 5
    })
    this.setState({layer})
  }

  render() {
    const {layer} = this.state;
    return (
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layer}
        >
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
    );
  }
}
