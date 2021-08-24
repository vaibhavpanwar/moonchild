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
  // console.log(onClick(visibility));

  // console.log(
  //   itemId + '---' + selected + '---------' + title + '-------' + currentItem,
  // );

  return (
    <div
      onClick={() => onClick(visibility)}
      className={`menu-item ${selected ? 'active' : ''}`}>
      <div className="title">{title}</div>
      <div>
        {/* visible: {JSON.stringify(!!visibility.isItemVisible(itemId))} */}
      </div>
      {/* <div>selected: {JSON.stringify(selected)}</div> */}
    </div>
  );
}
