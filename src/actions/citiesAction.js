export const SEND_CURRENT_CITY_DATA = 'SEND_CURRENT_CITY_DATA';
export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';

export const sendCurrentCityData = (response) => ({
    type: SEND_CURRENT_CITY_DATA,
    response
});

export const addCity = (response) => ({
    type: ADD_CITY,
    response
});

export const removeCity = (cityId) => ({
    type: REMOVE_CITY,
    cityId
});