import React from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_SELECTED_VIEW } from './redux/actions';
import { Menu } from './styles';

const SideMenu = () => {
  const dispatch = useDispatch();

  const options = [
    'Champions',
    'Games'
  ];
  
  return (
    <Menu>
      {options.map((x, i) => {
        return (
          <div key={i}>
            <span
              onClick={() => dispatch({ type: CHANGE_SELECTED_VIEW, payload: x })}
            >
              {x}
            </span>
            <br />
          </div>
        );
      })}
    </Menu>
  );
};

export default SideMenu;
