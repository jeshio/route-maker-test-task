import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
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
    setMapParams: PropTypes.func.isRequired,
    setCoordinatesPoint: PropTypes.func.isRequired
  };

  componentWillMount() {
    // init map state
    const { mapParams } = this.props;
    this.setState({
      center: mapParams.center,
      zoom: mapParams.zoom
    });
  }

  componentDidMount() {
    this.updateRoute(this.props.points);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.ymaps) return true;
    if (isEqual(nextProps.points, this.props.points)) return true;

    const ymaps = this.ymaps;
    const { points } = nextProps;
    this.updateRoute(points);
  }

  updateMap() {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

    this.props.setMapParams({
      center,
      zoom
    });
  }

  updateRoute(points) {
    const ymaps = this.ymaps;
    if (!ymaps) return false;

    const routePoints = points.map(p => ({
      type: "wayPoint",
      point: p.coordinates,
      balloon: p.name,
      name: p.name
    }));
    ymaps.route(routePoints).then(route => {
      // добавляем маршрут на карту
      route.editor.start({ editWayPoints: true });
      // route.getWayPoints().properties.set({
      //   balloonContent: "test"
      // });
      if (this.yListeners) this.yListeners.removeAll();

      this.yListeners = route
        .getWayPoints()
        .events.group()
        .add("dragend", e => {
          // on drag waypoint update coords in store
          const wayPoint = e.get("target");
          const coords = wayPoint.geometry.getCoordinates();
          const index = wayPoint.properties.get("index");
          this.props.setCoordinatesPoint(index, coords);
        });
      const { geoObjects } = this.map;
      geoObjects.removeAll().add(route);
    });
  }

  render() {
    const { state } = this;

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

export default Map;

export const MapHOC = toJSHOC(Map);
