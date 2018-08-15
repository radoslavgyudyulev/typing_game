// import React from 'react';
// import Countdown from 'react-countdown-moment'
// import moment from 'moment'
// import '../../App.css'

// const endDate = moment().add(60, 'second')

// function counter(props) {
//     const { score, counter } = props
//     return (
//         <div className="counter-wrapper" container="true">
//             <h4 className="counter">
//                 Time : {counter} 
//             </h4>
//             <h4 className="counter">
//                 Score : {score}
//             </h4>
//         </div>
//     )
// }

// export default counter





import React, { Component } from 'react'

import ReactCountdownClock from 'react-countdown-clock'

export default class componentName extends Component {
    render() {
        return (
            <div>
                <ReactCountdownClock seconds={60}
                     color="#000"
                     alpha={0.9}
                     size={300} />
            </div>
        )
    }
}
