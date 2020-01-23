import React, { useState, useEffect } from "react";
import Messages from '../Messages/Messages';
import queryString from 'query-string';

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);
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
        </div>
      );
}


export default Chat;