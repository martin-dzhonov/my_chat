import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoContainer from '../InfoContainer/InfoContainer';
import MessageInput from '../MessageInput/MessageInput';

import './Chat.css';

let socket;

const Chat = (props) => {

    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'http://localhost:5000';


    useEffect(() => {
        const { name } = queryString.parse(props.location.search);
        setName(name);

        socket = io(ENDPOINT);

        socket.emit('join', { name }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
        }

    }, [ENDPOINT, props.location.search]);

    useEffect(() => {

        socket.on('chatData', ({ users }) => {
            setUsers(users);
        });


        socket.on('message', (message) => {
            setMessages([...messages, message ]);
        });

    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    const logout = (event) => {
        event.preventDefault();

        socket.emit('logout', '', () => props.history.push('/'));
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Messages messages={messages} name={name} />
                <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <InfoContainer users={users} logout={logout} />
        </div>
    );
}


export default Chat;