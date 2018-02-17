import React, { Component } from "react";
import PropTypes from "prop-types";
import toJSHOC from "modules/Core/hocs/toJS";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <span className="List__drag-handler">::</span>
));

const SortableItem = SortableElement(({ value, id, deletePoint }) => (
  <li className="List__item">
    <DragHandle />
    &nbsp;
    <span className="List__point-name">{value}</span>
    &nbsp;
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        deletePoint(id);
      }}
      className="List__delete-link"
    >
      x
    </a>
  </li>
));

const SortableList = SortableContainer(({ points, deletePoint }) => {
  return (
    <ul className="List">
      {points.map((point, index) => (
        <SortableItem
          key={`point-${point.id}`}
          index={index}
          value={point.name}
          id={point.id}
          deletePoint={deletePoint}
        />
      ))}
    </ul>
  );
});

class List extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
    deletePoint: PropTypes.func.isRequired,
    swapPoint: PropTypes.func.isRequired
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.swapPoint(oldIndex, newIndex);
  };

  render() {
    return (
      <SortableList {...this.props} onSortEnd={this.onSortEnd} useDragHandle />
    );
  }
}

export default List;

export const ListHOC = toJSHOC(List);
