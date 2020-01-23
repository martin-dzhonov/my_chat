import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoContainer from '../InfoContainer/InfoContainer';

import './Chat.css';

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');

    const ENDPOINT = 'http://localhost:5000';


    useEffect(() => {
        const { name } = queryString.parse(location.search);
        setName(name);

        socket = io(ENDPOINT);

        socket.emit('join', { name }, (error) => {
            if(error) {
              alert(error);
            }
        });

      }, [ENDPOINT, location.search]);

      useEffect(() => {
    
        socket.on('chatData', ({ users }) => {
          setUsers(users);
        })
    
        return () => {
          socket.emit('disconnect');
    
          socket.off();
        }
      }, [messages])
    return (
        <div className="outerContainer">
            <div className="container">
                <Messages messages={messages} name={name} />
            </div>
            <InfoContainer users={users}/>
        </div>
      );
}


export default Chat;