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
    const { points } = nextProps;

    if (!this.ymaps) return true;
    if (isEqual(nextProps.points, this.props.points)) return true;
    // fix on one point
    if (points.length <= 1) {
      this.map.geoObjects.removeAll();
      if (points.length === 1) {
        const point = points[0];
        const placemark = new this.ymaps.Placemark(
          point.coordinates,
          {
            balloonContent: point.name
          },
          { draggable: true }
        );
        placemark.events.add("dragend", e => this.onWaypointDragEnd(e, 0));
        this.map.geoObjects.add(placemark);
      }
    }

    const ymaps = this.ymaps;
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
    // add route to map
    ymaps.route(routePoints).then(route => {
      route.editor.start({ editWayPoints: true });
      if (this.yListeners) this.yListeners.removeAll();

      this.yListeners = route
        .getWayPoints()
        .events.group()
        .add("dragend", e => {
          this.onWaypointDragEnd(e);
        });
      const { geoObjects } = this.map;
      geoObjects.removeAll().add(route);

      const { points } = this.props;
      route.getWayPoints().each(o => {
        const index = o.properties.get("index");
        o.properties.set({
          balloonContent: points[index].name
        });
      });
    });
  }

  onWaypointDragEnd(e, defaultIndex) {
    const wayPoint = e.get("target");
    const coords = wayPoint.geometry.getCoordinates();
    const index = wayPoint.properties.get("index") || defaultIndex;
    this.props.setCoordinatesPoint(index, coords);
  }

  render() {
    const { state } = this;
    const { points } = this.props;

    return (
      <div className="Map">
        <YMaps onApiAvaliable={ymaps => (this.ymaps = ymaps)}>
          <YMap
            state={state}
            onActionEnd={e => this.updateMap(e)}
            onActionBreak={e => this.updateMap(e)}
            instanceRef={ref => (this.map = ref)}
            width="100%"
            height={500}
          />
        </YMaps>
      </div>
    );
  }
}

export default Map;

export const MapHOC = toJSHOC(Map);
