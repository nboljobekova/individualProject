import React, { Component } from 'react'
import moment from 'moment';


class DatePrettify extends Component {

    render() {
        return (
            moment(this.props.children).format('MMMM Do YYYY')
        )
    }
}

export default DatePrettify