import React, { Component } from "react";
import PropTypes from "prop-types";
import { YMaps, Map as YMap, Placemark } from "react-yandex-maps";
import toJSHOC from "modules/Core/hocs/toJS";
import List from "./List";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: [0, 0],
      zoom: 0
    };
  }

  static propTypes = {
    points: PropTypes.array.isRequired,
    mapParams: PropTypes.object.isRequired,
    setMapParams: PropTypes.func.isRequired
  };

  componentWillMount() {
    // init map state
    const { mapParams } = this.props;
    this.setState({
      center: mapParams.center,
      zoom: mapParams.zoom
    });
  }

  updateMap() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

    this.props.setMapParams({
      center,
      zoom
    });
  }

  render() {
    const { props, state } = this;

    return (
      <div className="Map">
        <YMaps>
          <YMap
            state={state}
            onActionEnd={e => this.updateMap(e)}
            onActionBreak={e => this.updateMap(e)}
            instanceRef={ref => (this.map = ref)}
          >
            <Placemark
              geometry={{
                coordinates: [55.751574, 37.573856]
              }}
              properties={{
                hintContent: "Собственный значок метки",
                balloonContent: "Это красивая метка"
              }}
            />
            {props.points.map(point => (
              <Placemark
                key={point.id}
                geometry={{
                  coordinates: point.coordinates
                }}
                properties={{
                  balloonContent: point.name
                }}
              />
            ))}
          </YMap>
        </YMaps>
      </div>
    );
  }
}

Map.propTypes = {};

export default Map;

export const MapHOC = toJSHOC(Map);
