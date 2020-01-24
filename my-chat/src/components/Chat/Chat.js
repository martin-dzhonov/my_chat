import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import io from "socket.io-client";
import { toggle } from '../../utils/actions';

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

    const dispatch = useDispatch();

    useEffect(() => {
        const { name } = queryString.parse(props.location.search);
        setName(name);

        socket = io(ENDPOINT);

        socket.emit('join', { name }, (error) => {
            console.log('join')
            if (error) {
                alert(error);
            }
        });

    }, [ENDPOINT, props.location.search]);

    useEffect(() => {

        socket.on('chatData', ({ users }) => {
            console.log('chatData');
            setUsers(users);
        });


        socket.on('message', (message) => {
            console.log('message');
            setMessages([...messages, message]);
        });

        return () => {
            socket.off();
        }

    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', { user: name, message: message }, () => {console.log('send message'); setMessage('')});
        }
    }

    const toggleOnline = (event) => {
        event.preventDefault();
        dispatch(toggle());
    }

    const logout = (event) => {
        event.preventDefault();

        socket.emit('logout', { user: name }, () => {socket.off();props.history.push('/')});
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Messages messages={messages} name={name} />
                <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <InfoContainer users={users} logout={logout} toggleOnline={toggleOnline} />
        </div>
    );
}


export default Chat;