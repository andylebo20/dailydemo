import React from 'react'
import firebase from './firebase'

class Room extends React.Component{

    constructor(props){
        super(props)

        this.getTheNetworkStats = this.getTheNetworkStats.bind(this)
        this.saveMetrics = this.saveMetrics.bind(this)

        this.metricsHistory = []
    }

    getTheNetworkStats(){
        if (this.callFrame.meetingState() === "left-meeting"){
            return
        }
        this.callFrame.getNetworkStats().then(function(data){
            console.log(data)
            setTimeout(this.getTheNetworkStats, 1000)
            const metricsTemp = data.stats.latest
            if (metricsTemp.timestamp == null){
                return
            }
            this.metricsHistory.push({
                videoRecvBitsPerSecond: metricsTemp.videoRecvBitsPerSecond,
                videoSendBitsPerSecond: metricsTemp.videoSendBitsPerSecond,
                videoRecvPacketLoss: metricsTemp.videoRecvPacketLoss,
                videoSendPacketLoss: metricsTemp.videoSendPacketLoss
            })
        }.bind(this)).catch(function(error){
            console.log(error)
        })
    }

    saveMetrics(){
        console.log(this.metricsHistory)
        this.db.collection("person1").doc().set({ // logs array of metric history for each call that this person creates
            videoRecvBitsPerSecondARR: this.metricsHistory.map(data => data.videoRecvBitsPerSecond),
            videoSendBitsPerSecondARR: this.metricsHistory.map(data => data.videoSendBitsPerSecond),
            videoRecvPacketLossARR: this.metricsHistory.map(data => data.videoRecvPacketLoss),
            videoSendPacketLossARR: this.metricsHistory.map(data => data.videoSendPacketLoss)
        }).then(function(){
            console.log("saved metrics")
        }).catch(function(error){
            console.log(error)
        })
    }

    componentDidMount(){
        this.db = firebase.firestore()
        this.callFrame = window.DailyIframe.createFrame({showLeaveButton: true});
        this.callFrame.join({ url: "https://dailydemoapp.daily.co/" + window.location.pathname.split("/")[2]}).then(function(){
            setTimeout(this.getTheNetworkStats, 1000)
        }.bind(this)).catch(function(error){
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.getTheNetworkStats}>Get Network Stats</button>
                <button onClick={this.saveMetrics}>Save Metrics to Firebase</button>
            </div>
        )
    }

}

export default Room