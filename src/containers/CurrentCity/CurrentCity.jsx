import './CurrentCity.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import ListDays from '../../components/ListDays/ListDays';

class CurrentCity extends Component {

    static propTypes = {
        currentCityData: PropTypes.object.isRequired
    };

    render() {
        const {currentCityData} = this.props;
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const sky = classNames('current-city__sky', `${(currentCityData.list[0].weather[0].main).toLowerCase()}`);
        let cityName = currentCityData.city.name,
            cityCountry = currentCityData.city.country,
            mainWeather = currentCityData.list[0].weather[0].main,
            temp = ((currentCityData.list[0].main.temp).toString()).split('.')[0],
            tempMin = ((currentCityData.list[0].main.temp_min).toString()).split('.')[0],
            tempMax = ((currentCityData.list[0].main.temp_max).toString()).split('.')[0],
            humidity = currentCityData.list[0].main.humidity,
            pressure = currentCityData.list[0].main.pressure,
            wind = ((currentCityData.list[0].wind.speed).toString()).split('.')[0],
            sunrise = `${Number(((new Date(currentCityData.city.sunrise * 1000)).toString()).slice(16, 18))}h ${Number(((new Date(currentCityData.city.sunrise * 1000)).toString()).slice(19, 21))}min`,
            sunset = `${Number(((new Date(currentCityData.city.sunset * 1000)).toString()).slice(16, 18))}h ${Number(((new Date(currentCityData.city.sunset * 1000)).toString()).slice(19, 21))}min`,
            daytime = `${Number(((new Date((currentCityData.city.sunset - currentCityData.city.sunrise) * 1000)).toString()).slice(16, 18))}h ${Number(((new Date((currentCityData.city.sunset - currentCityData.city.sunrise) * 1000)).toString()).slice(19, 21))}min`,
            time = ((new Date(new Date().getTime())).toString()).slice(16, 21);
        return (
            <div className="current-city">
                <div className="current-city__short-info">
                    <div className="current-city__date">
                        {days[new Date().getDay()]}, {new Date().getDate()} {(months[new Date().getMonth()]).slice(0, 3)} {new Date().getFullYear()}
                        &nbsp;&nbsp;|&nbsp;&nbsp;{time}</div>
                    <Link className="current-city__name" to="/">{cityName}, {cityCountry}</Link>
                </div>
                <div className="current-city__full-info">
                    <div className="current-city__weather">
                        <div className={sky}>{mainWeather}</div>
                        <div className="current-city__temperature-now">
                            <span className="current-city__temperature-now-value">{temp}</span>
                            <span className="current-city__temperature-now-indicator">&deg;C</span>
                        </div>
                        <div className="current-city__temperature">
                            <span className="current-city__temperature-max">{tempMax}&deg;C</span>
                            <span className="current-city__temperature-min">{tempMin}&deg;C</span>
                        </div>
                        <div className="current-city__humidity">
                            <span className="current-city__humidity-value">{humidity}%</span>
                            <span className="current-city__humidity-title">humidity</span>
                        </div>
                        <div className="current-city__pressure">
                            <span className="current-city__pressure-value">{pressure}mBar</span>
                            <span className="current-city__pressure-title">pressure</span>
                        </div>
                        <div className="current-city__wind">
                            <span className="current-city__wind-value">{wind}m/s</span>
                            <span className="current-city__wind-title">wind</span>
                        </div>
                        <div className="current-city__sunrise">
                            <span className="current-city__sunrise-value">{sunrise}</span>
                            <span className="current-city__sunrise-title">sunrise</span>
                        </div>
                        <div className="current-city__sunset">
                            <span className="current-city__sunset-value">{sunset}</span>
                            <span className="current-city__sunset-title">sunset</span>
                        </div>
                        <div className="current-city__daytime">
                            <span className="current-city__daytime-value">{daytime}</span>
                            <span className="current-city__daytime-title">daytime</span>
                        </div>
                    </div>
                </div>
                <ListDays forecast={currentCityData}/>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    currentCityData: citiesReducer.currentCityData
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CurrentCity);