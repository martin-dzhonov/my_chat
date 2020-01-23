import React, { useState, useEffect } from "react";
import queryString from 'query-string';

import Messages from '../Messages/Messages';
import InfoContainer from '../InfoContainer/InfoContainer';

import './Chat.css';

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');

    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        setName(name)

      }, [ENDPOINT, location.search]);

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