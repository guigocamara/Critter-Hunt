import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const location = {
    address: 'UCF',
    lat: 28.602869503700095,
    lng: -81.20011172453141,
}

const CardPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <CardUI />
        </div>
    );
}
export default CardPage;