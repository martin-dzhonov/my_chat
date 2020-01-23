import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './InfoContainer.css';
import { useSelector } from 'react-redux';


const InfoContainer = ({ users, logout, toggleOnline }) => {

const sidebarVisible = useSelector(state => state.sidebarVisible);

return (
  <div className="textContainer">
    {
      users
        ? (
            <div>
                <button className="logoutButton" onClick={e => logout(e)}>Logout</button>
                
            <div>
            <h1>Online: {sidebarVisible}</h1>
            <input type="checkbox" onChange={e => toggleOnline(e)}></input>
            {sidebarVisible ?<div className="activeContainer">
              <h2>
                  {users
                  .filter(user => user.active === true)
                  .map((user, index) => (
                    <div key={index} className="activeItem">
                      {user.name}
                      <img alt="Online Icon" src={onlineIcon}/>
                    </div>
                  ))}
              </h2>
            </div>: ''}
            
          </div>
          </div>
        )
        : null
    }
  </div>
)};

export default InfoContainer;