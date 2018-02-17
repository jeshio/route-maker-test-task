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

  componentWillReceiveProps(nextProps) {
    if (!this.ymaps) return true;
    if (nextProps.points.length === this.props.points.length) return true;

    const { props } = this;
    const ymaps = this.ymaps;
    const points = nextProps.points.map(p => ({
      type: "wayPoint",
      point: p.coordinates,
      balloon: p.name
    }));
    console.log(points);
    ymaps.route(points).then(route => {
      // добавляем маршрут на карту
      route.editor.start({ editWayPoints: true });
      // route.getWayPoints().options.set({
      //   draggable: true
      // });
      const { geoObjects } = this.map;
      geoObjects.removeAll().add(route);
    });
  }

  render() {
    const { props, state } = this;

    return (
      <div className="Map">
        <YMaps onApiAvaliable={ymaps => (this.ymaps = ymaps)}>
          <YMap
            state={state}
            onActionEnd={e => this.updateMap(e)}
            onActionBreak={e => this.updateMap(e)}
            instanceRef={ref => (this.map = ref)}
          />
        </YMaps>
      </div>
    );
  }
}

Map.propTypes = {};

export default Map;

export const MapHOC = toJSHOC(Map);
