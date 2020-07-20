import React from 'react';
import { Timer } from '../timer';

export default {
    title: "Timer"
}

const timer1 = {
    type: "blah",
    minutes: 10,
    seconds: 0
}

export const withTimer = () => <Timer timer={timer1} isActive={true} /> 