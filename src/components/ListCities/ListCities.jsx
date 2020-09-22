import './ListCities.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {Link} from 'react-router-dom';
import {sendCurrentCityData, removeCity} from '../../actions/citiesAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class ListCities extends Component {

    static propTypes = {
        savedCities: PropTypes.array.isRequired,
        sendCurrentCityData: PropTypes.func.isRequired,
        removeCity: PropTypes.func.isRequired
    };

    render() {
        const {savedCities, sendCurrentCityData, removeCity} = this.props;
        const listCities = savedCities.map((item, index) => {
            return (
                <li className="cities__list-item" key={index}>
                    <Link
                        className="cities__list-item-link"
                        to="/current_city/"
                        onClick={() => sendCurrentCityData(item)}
                    >
                        <span className="cities__list-item-name">{item.city.name}, {item.city.country}</span>
                        <span className="cities__list-item-temperature">
                            {((item.list[0].main.temp).toString()).split('.')[0]}&deg;C
                        </span>
                    </Link>
                    <IconButton
                        className="cities__list-item-delete"
                        onClick={() => removeCity(item.city.id)}
                        title="Удалить">
                        <DeleteForeverIcon fontSize="small"/>
                    </IconButton>
                </li>
            );
        });
        return (
            <div className="cities">
                <ul className="cities__list">
                    {listCities}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    savedCities: citiesReducer.savedCities
});
const mapDispatchToProps = dispatch => bindActionCreators({
    sendCurrentCityData,
    removeCity
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ListCities);