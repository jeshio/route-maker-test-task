import React, { Component } from "react";
import PropTypes from "prop-types";
import toJSHOC from "modules/Core/hocs/toJS";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({ value, id, deletePoint }) => (
  <li>
    <DragHandle />
    &nbsp;
    {value}
    &nbsp;
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        deletePoint(id);
      }}
    >
      x
    </a>
  </li>
));

const SortableList = SortableContainer(({ points, deletePoint }) => {
  return (
    <ul>
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
