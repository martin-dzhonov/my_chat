import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoContainer from '../InfoContainer/InfoContainer';
import MessageInput from '../MessageInput/MessageInput';

import './Chat.css';

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'http://localhost:5000';


    useEffect(() => {
        const { name } = queryString.parse(location.search);
        setName(name);

        socket = io(ENDPOINT);

        socket.emit('join', { name }, (error) => {
            console.log('joined');
            if (error) {
                alert(error);
            }
        });

    }, [ENDPOINT, location.search]);

    useEffect(() => {

        socket.on('chatData', ({ users }) => {
            setUsers(users);
        });

        socket.on('message', (message) => {
            setMessages([...messages, message ]);
        });

        return () => {
            socket.emit('disconnect');
      
            socket.off();
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Messages messages={messages} name={name} />
                <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <InfoContainer users={users} />
        </div>
    );
}


export default Chat;