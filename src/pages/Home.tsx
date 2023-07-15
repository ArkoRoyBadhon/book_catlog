import React from 'react';
import { useAppSelector } from '../redux/hook';

const Home = () => {
    const { email } = useAppSelector(state => state.user.user)
    console.log("LLL", email);
    
    return (
        <div>
            Hello home page {email}
        </div>
    );
};

export default Home;