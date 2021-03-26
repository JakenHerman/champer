import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_SELECTED_VIEW } from './redux/actions';
import { Menu } from 'semantic-ui-react';

const SubMenu = () => {
  const dispatch = useDispatch();
  const view = useSelector(state => state.view);

  const options = [
    'Champions',
    'Games'
  ];
  
  return (
    <Menu inverted secondary>
      {options.map((x, i) => {
        return (
          <Menu.Item active={view === x} key={i} onClick={() => dispatch({ type: CHANGE_SELECTED_VIEW, payload: x })}>
              {x}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default SubMenu;
