import React from 'react'

class CallCell extends React.Component{

    constructor(props){
        super(props)

        this.seeMetricsForCall = this.seeMetricsForCall.bind(this)
    }

    seeMetricsForCall(){ // sends metrics from this video call to the dashboard for display
        this.props.seeMetricsForCall({
            videoRecvBitsPerSecondARR: this.props.callData["videoRecvBitsPerSecondARR"],
            videoSendBitsPerSecondARR: this.props.callData["videoSendBitsPerSecondARR"],
            videoRecvPacketLossARR: this.props.callData["videoRecvPacketLossARR"],
            videoSendPacketLossARR: this.props.callData["videoSendPacketLossARR"]
        })
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