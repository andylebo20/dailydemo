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
      metricsForOneRoom: []
    }

    this.createRoom = this.createRoom.bind(this)
    this.seeMetricsForCall = this.seeMetricsForCall.bind(this)
    this.loadAllParticipantMetricsForRoom = this.loadAllParticipantMetricsForRoom.bind(this)
  }

  loadAllParticipantMetricsForRoom(roomID){ // load call data for each call participant; called from CallCell component
      var participantsData = []
      this.db.collection("users").doc(this.emailID).collection("rooms").doc(roomID).collection("participants").get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          participantsData.push(doc.data())
        })
        this.seeMetricsForCall(participantsData)
      }.bind(this))
  }

  seeMetricsForCall(callData){ // preparing data for display by setting 15 sec granularity
      var granularData = this.granularizeData(callData, 15)
      this.setState({metricsForOneRoom: granularData})
  }

  granularizeData(participantsData, interval){
      /*
        returns participantsData--but in granular intervals to be used for metric graphs: 
        cycles through each second in each participants's data, calculates averages across the interval parameter (in seconds)
      */
      var collectiveData = []
      for (var i = 0; i < participantsData.length; i++){
          var metricsObj = {videoRecvBitsPerSecondNUM: 0, videoSendBitsPerSecondNUM: 0, videoRecvPacketLossNUM: 0, videoSendPacketLossNUM: 0}
          var participantData = participantsData[i]
          var dataArrForThisParticipant = []
          for (var j = 0; j < participantData.videoRecvBitsPerSecondARR.length; j++){
            metricsObj.videoRecvBitsPerSecondNUM += participantData.videoRecvBitsPerSecondARR[j]
            metricsObj.videoSendBitsPerSecondNUM += participantData.videoSendBitsPerSecondARR[j]
            metricsObj.videoRecvPacketLossNUM += participantData.videoRecvPacketLossARR[j]
            metricsObj.videoSendPacketLossNUM += participantData.videoSendPacketLossARR[j]
            if ((j+1) % interval == 0){
                dataArrForThisParticipant.push({
                    timestamp: j+1,
                    videoRecvBitsPerSecond: metricsObj.videoRecvBitsPerSecondNUM / interval,
                    videoSendBitsPerSecond: metricsObj.videoSendBitsPerSecondNUM / interval,
                    videoRecvPacketLoss: metricsObj.videoRecvPacketLossNUM / interval,
                    videoSendPacketLoss: metricsObj.videoSendPacketLossNUM / interval,
                })
                metricsObj.videoRecvBitsPerSecondNUM = 0
                metricsObj.videoSendBitsPerSecondNUM = 0
                metricsObj.videoRecvPacketLossNUM = 0
                metricsObj.videoSendPacketLossNUM = 0
            }
          }
          collectiveData.push(dataArrForThisParticipant)
      }
      return collectiveData
  }

  createRoom(){ // tells backend to create a new room, then saves new room to database, then creates a url for that room
    fetch("/createRoom", {method: "post"}).then(function(res){
      return res.json()
    }).then(function(data){
        this.db.collection("users").doc(this.emailID).collection("rooms").doc(data.name).set({
          createdAt: new Date()
        }).then(function(){
          this.setState({callLink: "https://morning-mesa-27765.herokuapp.com/Room/" + data.name + "/" + this.emailID})
        }.bind(this)).catch(function(error){
          console.log(error)
        })
    }.bind(this)).catch(function(error){
      console.log(error)
    })
  }

  componentDidMount(){
      this.db = firebase.firestore()
      this.emailID = window.location.pathname.split("/")[2]
      this.db.collection("users").doc(this.emailID).collection("rooms").get().then(function(querySnapshot){ // loads all call rooms created by this user
          var callHistoryTemp = []
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
      <div className="dashboard">
        <div className="createRoomHolder">
            <button className="createRoomBtn" onClick={this.createRoom}>Click here to create a room and generate a link</button>
            <a className="roomLink" target="_blank" href={this.state.callLink}>{this.state.callLink}</a>
        </div>
        <div className="metricsDisplay"> {/* Setting up graph displays (if call was selected from list) */}
            {this.state.metricsForOneRoom.length > 0 ?
                this.state.metricsForOneRoom.map((participantData, index) => 
                    <div>
                      <LineChart key={index} width={780} height={200} data={participantData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis label={"Seconds since participant " + (index+1) + " joined call"} dataKey="timestamp" tick={false} height={30} />
                        <YAxis tick={{fontSize: "12px"}}/>
                        <Tooltip/>
                        <Legend wrapperStyle={{fontSize: "13px"}}/>
                        <Line type="monotone" dataKey="videoRecvBitsPerSecond" stroke="#152CFE" activeDot={{ r: 8 }}/>
                        <Line type="monotone" dataKey="videoSendBitsPerSecond" stroke="#00C613" activeDot={{ r: 8 }}/>
                        <Line type="monotone" dataKey="videoRecvPacketLoss" stroke="#B200FF" activeDot={{ r: 8 }}/>
                        <Line type="monotone" dataKey="videoSendPacketLoss" stroke="#00C6CD" activeDot={{ r: 8 }}/>
                      </LineChart>
                      <hr/>
                    </div>
                ) :
                <label className="inGraphLbl">Please select a room ID from the list below to see that call's metrics.{<br/>}If the selected call lasted for less than 15 seconds, data will not appear.</label>
            }
        </div>
        <div className="roomsListHolder"> {/* Displaying list of user's calls (if # of calls > 0) */}
            <label className="roomsTitle">Rooms:</label>
            {this.state.callHistory.length > 0 ?
                this.state.callHistory.map(call => 
                    <CallCell key={call.id} id={call.id} loadAllParticipantMetricsForRoom={this.loadAllParticipantMetricsForRoom}/>
                ) :
                <label className="noVideoCallsLbl">You have not completed any video calls. Please click the button at the top to get started.</label>
            }
        </div>
      </div>
    );
  }
}

export default Dashboard