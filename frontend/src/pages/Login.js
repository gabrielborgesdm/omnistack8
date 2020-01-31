import React, { useState } from 'react';
import api from '../services/api';
import './Login.css';
import tinderLogo from '../assets/tinder.svg';


export default function Login({ history }){
    const [ username, setUsername ] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const response = await api.post('/devs', {username});
        const { _id } = response.data;
        console.log(response);
        history.push(`./dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img alt="tindev" src={tinderLogo} />
                <input 
                    type="text"
                    placeholder="Digite seu usuário no github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}