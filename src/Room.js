import React from '../node_modules/@types/react'


class Room extends React.Component{

    constructor(props){
        super(props)

        this.getTheNetworkStats = this.getTheNetworkStats.bind(this)
    }

    getTheNetworkStats(){
        this.call.getNetworkStats().then(function(data){
            console.log(data)
        }).catch(function(error){
            console.log(error)
        })
    }

    componentDidMount(){
        var callFrame = window.DailyIframe.createFrame({showLeaveButton: true});
        callFrame.join({ url: "https://dailydemoapp.daily.co/" + window.location.pathname.split("/")[2]})
        this.call = callFrame
    }

    render(){
        return(
            <div>
                <button onClick={this.getTheNetworkStats}>Get Network Stats</button>
            </div>
        )
    }

}

export default Room