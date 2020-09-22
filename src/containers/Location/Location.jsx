import './Location.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import {addCity} from '../../actions/citiesAction';
import ListCities from '../../components/ListCities/ListCities';

class Location extends Component {

    state = {
        inputStateWhenSearchingError: false,
        inputStateWhenSearchingFound: false,
        showMessage: false,
        textMessage: '',
        messageStateWhenSearchingHidden: true,
        messageStateWhenSearchingVisible: false,
        inputValue: '',
        responseValue: {}
    };

    static propTypes = {
        addCity: PropTypes.func.isRequired,
        savedCities: PropTypes.array.isRequired
    };

    sendTextValueForCity = (value) => {
        this.setState({
            inputValue: value
        });
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=ecea112d8ce63958d041afca1667c087&units=metric`)
            .then(response => response.json())
            .then(response => {
                if (response.hasOwnProperty('city')) {
                    this.setState({
                        inputStateWhenSearchingError: false,
                        inputStateWhenSearchingFound: true,
                        showMessage: true,
                        textMessage: `${response.city.name}, ${response.city.country}`,
                        messageStateWhenSearchingHidden: false,
                        messageStateWhenSearchingVisible: true,
                        responseValue: response
                    });
                } else {
                    this.setState({
                        inputStateWhenSearchingError: true,
                        inputStateWhenSearchingFound: false,
                        showMessage: true,
                        textMessage: response.message,
                        messageStateWhenSearchingHidden: false,
                        messageStateWhenSearchingVisible: true
                    });
                }
            })
    };

    checkResult = (value) => {
        if (this.state.inputStateWhenSearchingFound === true) {
            this.props.addCity(value);
            this.setState({
                inputStateWhenSearchingError: false,
                inputStateWhenSearchingFound: false,
                messageStateWhenSearchingHidden: true,
                messageStateWhenSearchingVisible: false,
                inputValue: ''
            });
        }
    };

    inputOnBlur = () => {
        if (this.state.inputStateWhenSearchingFound === false) {
            this.setState({
                inputStateWhenSearchingError: false,
                inputStateWhenSearchingFound: false,
                messageStateWhenSearchingHidden: true,
                messageStateWhenSearchingVisible: false,
                inputValue: ''
            });
        }
    };

    render() {
        let classesInput = classNames('location__form-input', {
                'error': this.state.inputStateWhenSearchingError,
                'found': this.state.inputStateWhenSearchingFound
            }),
            classesMessage = classNames('location__form-message', {
                'hidden': this.state.messageStateWhenSearchingHidden,
                'visible': this.state.messageStateWhenSearchingVisible
            });
        return (
            <div className="location">
                <span className="location__title">Location</span>
                <form className="location__form">
                    <input
                        className={classesInput}
                        type="text"
                        placeholder="Find city..."
                        autoComplete="on"
                        value={this.state.inputValue}
                        onChange={(e) => this.sendTextValueForCity(e.target.value)}
                        onBlur={() => this.inputOnBlur()}/>
                    <div
                        className={classesMessage}
                        onClick={() => {
                            this.checkResult(this.state.responseValue);
                        }}>
                        {this.state.textMessage}</div>
                </form>
                <ListCities/>
            </div>
        )
    }
}

const mapStateToProps = ({citiesReducer}) => ({
    savedCities: citiesReducer.savedCities
});
const mapDispatchToProps = dispatch => bindActionCreators({addCity}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Location);