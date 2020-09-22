import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import CurrentCity from '../containers/CurrentCity/CurrentCity';
import Location from '../containers/Location/Location';

class Router extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/current_city' component={CurrentCity}/>
                <Route exact path='/' component={Location}/>
            </Switch>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Router);

