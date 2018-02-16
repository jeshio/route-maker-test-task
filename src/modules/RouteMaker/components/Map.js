import React, { Component } from "react";
// import PropTypes from "prop-types";
import { YMaps, Map as YMap, Placemark } from "react-yandex-maps";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: [55.76, 37.64],
      zoom: 11
    };
  }

  render() {
    const { props, state } = this;

    return (
      <div className="Map">
        <YMaps>
          <YMap state={state}>
            <Placemark
              geometry={{
                coordinates: [55.751574, 37.573856]
              }}
              properties={{
                hintContent: "Собственный значок метки",
                balloonContent: "Это красивая метка"
              }}
              options={{
                iconLayout: "default#image",
                iconImageHref: "images/myIcon.gif",
                iconImageSize: [30, 42],
                iconImageOffset: [-3, -42]
              }}
            />
          </YMap>
        </YMaps>
      </div>
    );
  }
}

Map.propTypes = {};

export default Map;
