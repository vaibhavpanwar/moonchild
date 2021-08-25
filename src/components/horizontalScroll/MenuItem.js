import React from 'react';
import {VisibilityContext} from 'react-horizontal-scrolling-menu';

export default function MenuItem({
  onClick,
  selected,
  title,
  itemId,
  currentItem,
}) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      className={`menu-item ${selected ? 'active' : ''}`}>
      <div className="title">{title}</div>
      <div></div>
    </div>
  );
}
