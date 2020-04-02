import React from 'react';
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import CallCell from './CallCell'
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

class Dashboard extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      callLink: "",
      callHistory: [],
      metricsForOneCall: []
    }

    this.createRoom = this.createRoom.bind(this)
    this.seeMetricsForCall = this.seeMetricsForCall.bind(this)
  }

  seeMetricsForCall(callData){ // preparing data for display; called from CallCell component
      var granularData = this.granularizeData(callData, 15)
      this.setState({metricsForOneCall: granularData})
  }

  granularizeData(callData, interval){
      /*
        returns callData--but in granularity intervals to be used for metric graph: 
        cycles through each second in call data, calculates averages across the interval parameter (in seconds)
      */
      var newData = []
      var videoRecvBitsPerSecondNUM = 0
      var videoSendBitsPerSecondNUM = 0
      var videoRecvPacketLossNUM = 0
      var videoSendPacketLossNUM = 0

      for (var i = 0; i < callData.videoRecvBitsPerSecondARR.length; i++){
        videoRecvBitsPerSecondNUM += callData.videoRecvBitsPerSecondARR[i]
        videoSendBitsPerSecondNUM += callData.videoSendBitsPerSecondARR[i]
        videoRecvPacketLossNUM += callData.videoRecvPacketLossARR[i]
        videoSendPacketLossNUM += callData.videoSendPacketLossARR[i]
        if ((i+1) % interval == 0){
            newData.push({
                videoRecvBitsPerSecond: videoRecvBitsPerSecondNUM / interval,
                videoSendBitsPerSecond: videoSendBitsPerSecondNUM / interval,
                videoRecvPacketLoss: videoRecvPacketLossNUM / interval,
                videoSendPacketLoss: videoSendPacketLossNUM / interval,
            })
            videoRecvBitsPerSecondNUM = 0
            videoSendBitsPerSecondNUM = 0
            videoRecvPacketLossNUM = 0
            videoSendPacketLossNUM = 0
        }
      }
      return newData
  }

  createRoom(){ // tells backend to create a new room, then creates a url for that room using the new room's name
    fetch("/createRoom", {method: "post"}).then(function(res){
      return res.json()
    }).then(function(data){
      this.setState({callLink: "https://morning-mesa-27765.herokuapp.com/Room/" + data.name})
    }.bind(this)).catch(function(error){
      console.log(error)
    })
  }

  componentDidMount(){
      this.db = firebase.firestore()
      var callHistoryTemp = []
      var emailID = window.location.pathname.split("/")[2]
      this.db.collection(emailID).get().then(function(querySnapshot){ // loads all calls completed by this user
          querySnapshot.forEach(function(doc){
            callHistoryTemp.push(doc)
          })
          this.setState({callHistory: callHistoryTemp})
      }.bind(this)).catch(function(error){
        console.log(error)
      })
  }

  render(){
    return (
      <div className="App">
        <div className="createRoomHolder">
            <button className="createRoomBtn" onClick={this.createRoom}>Click here to create a room and generate a link</button>
            <a className="roomLink" to={this.state.callLink}>{this.state.callLink}</a>
        </div>
        <div className="metricsDisplay"> {/* Setting up graph display (if call was selected) */}
            {this.state.metricsForOneCall.length > 0 ?
                <LineChart width={800} height={230} data={this.state.metricsForOneCall}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis tick={false} height={10}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="videoRecvBitsPerSecond" stroke="#152CFE" activeDot={{ r: 8 }}/>
                    <Line type="monotone" dataKey="videoSendBitsPerSecond" stroke="#32FF45" activeDot={{ r: 8 }}/>
                    <Line type="monotone" dataKey="videoRecvPacketLoss" stroke="#B200FF" activeDot={{ r: 8 }}/>
                    <Line type="monotone" dataKey="videoSendPacketLoss" stroke="#49E1FF" activeDot={{ r: 8 }}/>
                </LineChart> :
                <label className="inGraphLbl">Please select a room ID from the list below to see that call's metrics.{<br/>}If the selected call lasted for less than 15 seconds, data will not appear.</label>
            }
        </div>
        <div className="roomsListHolder"> {/* Displaying list of user's calls (if # of calls > 0) */}
            <label className="roomsTitle">Rooms:</label>
            {this.state.callHistory.length > 0 ?
                this.state.callHistory.map(call => 
                    <CallCell key={call.id} id={call.id} callData={call.data()} seeMetricsForCall={this.seeMetricsForCall}/>
                ) :
                <label className="noVideoCallsLbl">You have not completed any video calls. Please click the button at the top to get started.</label>
            }
        </div>
      </div>
    );
  }
}

export default Dashboard