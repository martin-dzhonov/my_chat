import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import './InfoContainer.css';
import { useSelector } from 'react-redux';

const InfoContainer = ({ users, logout, toggleOnline, currentUser }) => {

const sidebarVisible = useSelector(state => state.sidebarVisible);
const trimmedName = currentUser.trim().toLowerCase();

return (
  <div className="textContainer">
    {
      users
        ? (
            <div>
            <div>
            <div className="onlineMessage">Online right now {sidebarVisible}</div>
            <div className={sidebarVisible ? "toggleButton toggleVisible" : "toggleButton toggleHidden" } onClick={e => toggleOnline(e)}>
                {sidebarVisible ? "Hide": "Show"}
            </div>
            {sidebarVisible ?
            <div className="activeContainer">
              <div>
                  {users
                  .filter(user => user.active === true)
                  .map((user, index) => (
                    <div key={index} className="activeItem">
                       <img alt="Online Icon" src={onlineIcon}/>

                      <div className="usernameContainer"> {user.name} {(user.name === trimmedName) ? " (You)" : ""}</div>
                      </div>
                  ))}
              </div>
            </div> : ''}
            </div>
            <button className="logoutButton" onClick={e => logout(e)}>Logout</button>

          </div>
        )
        : null
    }
  </div>
)};

export default InfoContainer;