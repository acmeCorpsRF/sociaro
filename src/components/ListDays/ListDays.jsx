import './ListDays.scss'
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';

export default class ListDays extends Component {

    static propTypes = {
        forecast: PropTypes.object.isRequired
    };

    componentDidMount() {
        $('#slider').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            infinite: false
        });
    }

    render() {
        const {forecast} = this.props;
        const listDays = forecast.list.map((item, index) => {
            const sky = classNames('week__list-item', `${(item.weather[0].main).toLowerCase()}`);
            if (Number(item.dt_txt.slice(11, 13)) === 12 && Number(item.dt_txt.slice(8, 11)) !== new Date().getDate()) {
                return (
                    <li className={sky} key={index}>
                        <span className="week__list-item-date">
                            {((new Date(item.dt * 1000)).toString()).slice(0, 3)},&nbsp;
                            {((new Date(item.dt * 1000)).toString()).slice(8, 11)}
                        </span>
                        <div className="week__list-item-temperature">
                            <span className="week__list-item-temperature-max">
                                {((item.main.temp_min).toString()).split('.')[0]}&deg;C
                            </span>
                            <span className="week__list-item-temperature-min">
                                {((item.main.temp_max).toString()).split('.')[0]}&deg;C
                            </span>
                        </div>
                    </li>
                )
            }
        });
        return (
            <div className="week">
                <ul className="week__list" id="slider">
                    {listDays}
                </ul>
            </div>
        )
    }
}