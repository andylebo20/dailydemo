import React from 'react'

class CallCell extends React.Component{

    constructor(props){
        super(props)

        this.seeMetricsForCall = this.seeMetricsForCall.bind(this)
    }

    seeMetricsForCall(){ // sends id for this call room up to Dashboard method for further querying and preparation of data
        this.props.loadAllParticipantMetricsForRoom(this.props.id)
    }

    render(){
        return(
            <div>
                <div className="callCell">
                    <button className="roomIDInCallCell" onClick={this.seeMetricsForCall}>{this.props.id}</button>
                </div>
                <hr/>
            </div>
        )
    }
}

export default CallCell