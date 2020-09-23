import update from 'react-addons-update';
import {
    SEND_CURRENT_CITY_DATA,
    ADD_CITY,
    REMOVE_CITY
} from '../actions/citiesAction';

const initialStore = {
    currentCityData: {},
    savedCities: []
};

export default function citiesReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_CURRENT_CITY_DATA: {
            return update(store, {
                currentCityData: {
                    $set: action.response
                }
            });
        }
        case ADD_CITY: {
            let newSavedCities = store.savedCities;
            if (store.savedCities.length !== 0) {
                if (!(store.savedCities.some(item => item.city.name === action.response.city.name))) {
                    newSavedCities.push(action.response);
                }
            } else {
                newSavedCities.push(action.response);
            }
            newSavedCities.sort(function (a, b) {
                let nameA = a.city.name.toLowerCase(), nameB = b.city.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            console.log(newSavedCities);
            return update(store, {
                savedCities: {
                    $merge: newSavedCities
                }
            });
        }
        case REMOVE_CITY: {
            let newSavedCities = store.savedCities.filter(item => item.city.id !== action.cityId);
            return update(store, {
                savedCities: {
                    $set: newSavedCities
                }
            });
        }
        default:
            return store;
    }
}
