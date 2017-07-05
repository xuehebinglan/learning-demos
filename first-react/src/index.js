// src/index.js
// eslint-disable-next-line
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import News from './News';


const root = document.querySelector('#root');

// 将下面这一句放于render函数的jsx模板中即可


// render(<App />, root);

render(<News />, root);