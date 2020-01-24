import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Login.css';

export default function Login() {
  const [name, setName] = useState('');

  return (
    <div className="loginOuterContainer">
      <div className="loginInnerContainer">
        <h1 className="heading">Welcome</h1>
        <div>
          <input placeholder="Name" className="loginInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}`}>
          <button className={'button mt-20'} type="submit">ENTER</button>
        </Link>
      </div>
    </div>
  );
}
