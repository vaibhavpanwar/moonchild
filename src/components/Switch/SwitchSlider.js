import React from 'react';

const SwitchSlider = ({name, checked, clicked, disabled}) => (
  <label className="switch" htmlFor={name}>
    <input
      type="checkbox"
      aria-label={name}
      name={name}
      checked={checked}
      onChange={clicked}
      disabled={disabled}
      className="slider-checkbox__input-check"
    />
    <span className="slider round"></span>
  </label>
);

export default SwitchSlider;
