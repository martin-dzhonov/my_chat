import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './InfoContainer.css';

const InfoContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>Online:</h1>
            <div className="activeContainer">
              <h2>
                  {users
                  .filter(user => user.active = true)
                  .map(({name}) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon}/>
                    </div>
                  ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default InfoContainer;