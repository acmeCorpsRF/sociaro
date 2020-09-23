import './Layout.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Router from '../Router';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {sendCurrentCityData} from '../../actions/citiesAction';
import classNames from 'classnames';

class Layout extends Component {

    static propTypes = {
        sendCurrentCityData: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {sendCurrentCityData} = this.props;
        fetch('http://localhost:3000/tokens')
            .then(response => response.json())
            .then(response => {
                if (navigator.geolocation) {
                    let geoSuccess = (position) => {
                        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${response[0].token}&units=metric`)
                            .then(response => response.json())
                            .then(response => {
                                sendCurrentCityData(response);
                            });
                    };
                    navigator.geolocation.getCurrentPosition(geoSuccess);
                } else {
                    console.log('Geolocation is not supported for this Browser/OS version yet.');
                }
            });
    }

    render() {
        const {currentCityData} = this.props;
        const currentTime = Number(((new Date(new Date().getTime())).toString()).slice(16, 18));
        let operand,
            timesOfDay;
        if (currentCityData.hasOwnProperty('city')) {
            operand = Number(currentCityData.list[0].dt_txt.slice(11, 13));
        } else {
            operand = currentTime;
        }
        if (operand > 6 && operand < 18) {
            timesOfDay = classNames('times-of-day', {'day': true, 'night': false});
        } else {
            timesOfDay = classNames('times-of-day', {'day': false, 'night': true});
        }
        return (
            <div className="container">
                <div className={timesOfDay}></div>
                <Router/>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    currentCityData: citiesReducer.currentCityData
});
const mapDispatchToProps = dispatch => bindActionCreators({
    sendCurrentCityData
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);