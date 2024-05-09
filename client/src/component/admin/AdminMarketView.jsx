import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminMarketView = () => {
    const { param } = useParams();

    useEffect(() => {
        console.log(param);
    }, [param]);


    return (
        <div>
            view
        </div>
    );
};

export default AdminMarketView;