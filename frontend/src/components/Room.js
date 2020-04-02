import React from 'react'
import firebase from '../firebase.js'
import {withRouter} from 'react-router-dom'

class Room extends React.Component{

    constructor(props){
        super(props)

        this.seeNetworkStats = this.seeNetworkStats.bind(this)
        this.saveMetrics = this.saveMetrics.bind(this)

        this.metricsHistory = []
    }

    seeNetworkStats(){ // continuously calls frontend library method getNetworkStats() every 1 second
        if (this.callFrame.meetingState() === "left-meeting"){
            return
        }
        this.callFrame.getNetworkStats().then(function(data){
            setTimeout(this.seeNetworkStats, 1000)
            const metricsTemp = data.stats.latest
            if (metricsTemp.timestamp == null){
                return
            }
            this.metricsHistory.push({ // collect 4 needed metrics
                videoRecvBitsPerSecond: metricsTemp.videoRecvBitsPerSecond,
                videoSendBitsPerSecond: metricsTemp.videoSendBitsPerSecond,
                videoRecvPacketLoss: metricsTemp.videoRecvPacketLoss,
                videoSendPacketLoss: metricsTemp.videoSendPacketLoss
            })
        }.bind(this)).catch(function(error){
            console.log(error)
        })
    }

    saveMetrics(){ // saves personal call metrics to the host's room
        var emailID = window.location.pathname.split("/")[3]
        this.db.collection("users").doc(emailID).collection("rooms").doc(this.roomID).collection("participants").doc().set({
            videoRecvBitsPerSecondARR: this.metricsHistory.map(data => data.videoRecvBitsPerSecond),
            videoSendBitsPerSecondARR: this.metricsHistory.map(data => data.videoSendBitsPerSecond),
            videoRecvPacketLossARR: this.metricsHistory.map(data => data.videoRecvPacketLoss),
            videoSendPacketLossARR: this.metricsHistory.map(data => data.videoSendPacketLoss)
        }).then(function(){
            console.log("saved participant metrics to database")
            if (localStorage.getItem("emailID") || "" !== ""){ // user previously logged in to dashboard (the room host)
                this.props.history.push("/Dashboard/" + emailID)
            }
        }.bind(this)).catch(function(error){
            console.log(error)
        })
    }

    componentDidMount(){
        this.db = firebase.firestore()
        setTimeout(() => {
            this.callFrame = window.DailyIframe.createFrame({ // create call frame
                showLeaveButton: true, 
                iframeStyle: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: "100%",
            }});
            this.roomID = window.location.pathname.split("/")[2]
            this.callFrame.join({ url: "https://dailydemoapp.daily.co/" + this.roomID}).then(function(){ // join call room
                setTimeout(this.seeNetworkStats, 1000)
            }.bind(this)).catch(function(error){
                console.log(error)
            })
            this.callFrame.on('left-meeting', () => { // saves metrics when the user leaves the call room (must click "leave" to save)
                this.callFrame.iframe().style.visibility = "hidden"
                this.saveMetrics()
            })
        }, 2000)
    }

    render(){
        return(
            <div></div>
        )
    }

}

export default withRouter(Room)