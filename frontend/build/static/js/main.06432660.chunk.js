(this.webpackJsonpdailydashboard=this.webpackJsonpdailydashboard||[]).push([[0],{189:function(e,t,a){e.exports=a(384)},194:function(e,t,a){},195:function(e,t,a){},384:function(e,t,a){"use strict";a.r(t);var o=a(1),n=a.n(o),i=a(66),c=a.n(i),s=(a(194),a(18)),r=a(19),l=a(20),d=a(21),m=(a(195),a(28)),h=a(12),u=a(69),v=a.n(u);v.a.initializeApp({apiKey:"AIzaSyDG3goJB9T9DQzoeY56SxFYyebVp9HCuj0",authDomain:"dailydashboard-80ccc.firebaseapp.com",databaseURL:"https://dailydashboard-80ccc.firebaseio.com",projectId:"dailydashboard-80ccc",storageBucket:"dailydashboard-80ccc.appspot.com",messagingSenderId:"19890360437",appId:"1:19890360437:web:06ac7f9b1fc46c853ba83c",measurementId:"G-X44BZG74J5"}),v.a.analytics();var p=v.a,b=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).seeMetricsForCall=o.seeMetricsForCall.bind(Object(h.a)(o)),o}return Object(r.a)(a,[{key:"seeMetricsForCall",value:function(){this.props.loadAllParticipantMetricsForRoom(this.props.id)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{className:"callCell"},n.a.createElement("button",{className:"roomIDInCallCell",onClick:this.seeMetricsForCall},this.props.id)),n.a.createElement("hr",null))}}]),a}(n.a.Component),f=a(16),k=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={callLink:"",callHistory:[],metricsForOneRoom:[]},o.createRoom=o.createRoom.bind(Object(h.a)(o)),o.seeMetricsForCall=o.seeMetricsForCall.bind(Object(h.a)(o)),o.loadAllParticipantMetricsForRoom=o.loadAllParticipantMetricsForRoom.bind(Object(h.a)(o)),o}return Object(r.a)(a,[{key:"loadAllParticipantMetricsForRoom",value:function(e){var t=[];this.db.collection("users").doc(this.emailID).collection("rooms").doc(e).collection("participants").get().then(function(e){e.forEach((function(e){t.push(e.data())})),this.seeMetricsForCall(t)}.bind(this))}},{key:"seeMetricsForCall",value:function(e){var t=this.granularizeData(e,15);this.setState({metricsForOneRoom:t})}},{key:"granularizeData",value:function(e,t){for(var a=[],o=0;o<e.length;o++){for(var n={videoRecvBitsPerSecondNUM:0,videoSendBitsPerSecondNUM:0,videoRecvPacketLossNUM:0,videoSendPacketLossNUM:0},i=e[o],c=[],s=0;s<i.videoRecvBitsPerSecondARR.length;s++)n.videoRecvBitsPerSecondNUM+=i.videoRecvBitsPerSecondARR[s],n.videoSendBitsPerSecondNUM+=i.videoSendBitsPerSecondARR[s],n.videoRecvPacketLossNUM+=i.videoRecvPacketLossARR[s],n.videoSendPacketLossNUM+=i.videoSendPacketLossARR[s],(s+1)%t==0&&(c.push({timestamp:s+1,videoRecvBitsPerSecond:n.videoRecvBitsPerSecondNUM/t,videoSendBitsPerSecond:n.videoSendBitsPerSecondNUM/t,videoRecvPacketLoss:n.videoRecvPacketLossNUM/t,videoSendPacketLoss:n.videoSendPacketLossNUM/t}),n.videoRecvBitsPerSecondNUM=0,n.videoSendBitsPerSecondNUM=0,n.videoRecvPacketLossNUM=0,n.videoSendPacketLossNUM=0);a.push(c)}return a}},{key:"createRoom",value:function(){fetch("/createRoom",{method:"post"}).then((function(e){return e.json()})).then(function(e){this.db.collection("users").doc(this.emailID).collection("rooms").doc(e.name).set({createdAt:new Date}).then(function(){this.setState({callLink:"https://morning-mesa-27765.herokuapp.com/Room/"+e.name+"/"+this.emailID})}.bind(this)).catch((function(e){console.log(e)}))}.bind(this)).catch((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){this.db=p.firestore(),this.emailID=window.location.pathname.split("/")[2],this.db.collection("users").doc(this.emailID).collection("rooms").get().then(function(e){var t=[];e.forEach((function(e){t.push(e)})),this.setState({callHistory:t})}.bind(this)).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"dashboard"},n.a.createElement("div",{className:"createRoomHolder"},n.a.createElement("button",{className:"createRoomBtn",onClick:this.createRoom},"Click here to create a room and generate a link"),n.a.createElement("a",{className:"roomLink",href:this.state.callLink},this.state.callLink)),n.a.createElement("div",{className:"metricsDisplay"}," ",this.state.metricsForOneRoom.length>0?this.state.metricsForOneRoom.map((function(e,t){return n.a.createElement("div",null,n.a.createElement(f.d,{key:t,width:780,height:200,data:e},n.a.createElement(f.a,{strokeDasharray:"3 3"}),n.a.createElement(f.f,{label:"Seconds since participant "+(t+1)+" joined call",dataKey:"timestamp",tick:!1,height:30}),n.a.createElement(f.g,{tick:{fontSize:"12px"}}),n.a.createElement(f.e,null),n.a.createElement(f.b,{wrapperStyle:{fontSize:"13px"}}),n.a.createElement(f.c,{type:"monotone",dataKey:"videoRecvBitsPerSecond",stroke:"#152CFE",activeDot:{r:8}}),n.a.createElement(f.c,{type:"monotone",dataKey:"videoSendBitsPerSecond",stroke:"#00C613",activeDot:{r:8}}),n.a.createElement(f.c,{type:"monotone",dataKey:"videoRecvPacketLoss",stroke:"#B200FF",activeDot:{r:8}}),n.a.createElement(f.c,{type:"monotone",dataKey:"videoSendPacketLoss",stroke:"#00C6CD",activeDot:{r:8}})),n.a.createElement("hr",null))})):n.a.createElement("label",{className:"inGraphLbl"},"Please select a room ID from the list below to see that call's metrics.",n.a.createElement("br",null),"If the selected call lasted for less than 15 seconds, data will not appear.")),n.a.createElement("div",{className:"roomsListHolder"}," ",n.a.createElement("label",{className:"roomsTitle"},"Rooms:"),this.state.callHistory.length>0?this.state.callHistory.map((function(t){return n.a.createElement(b,{key:t.id,id:t.id,loadAllParticipantMetricsForRoom:e.loadAllParticipantMetricsForRoom})})):n.a.createElement("label",{className:"noVideoCallsLbl"},"You have not completed any video calls. Please click the button at the top to get started.")))}}]),a}(n.a.Component),y=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).seeNetworkStats=o.seeNetworkStats.bind(Object(h.a)(o)),o.saveMetrics=o.saveMetrics.bind(Object(h.a)(o)),o.metricsHistory=[],o}return Object(r.a)(a,[{key:"seeNetworkStats",value:function(){"left-meeting"!==this.callFrame.meetingState()&&this.callFrame.getNetworkStats().then(function(e){setTimeout(this.seeNetworkStats,1e3);var t=e.stats.latest;null!=t.timestamp&&this.metricsHistory.push({videoRecvBitsPerSecond:t.videoRecvBitsPerSecond,videoSendBitsPerSecond:t.videoSendBitsPerSecond,videoRecvPacketLoss:t.videoRecvPacketLoss,videoSendPacketLoss:t.videoSendPacketLoss})}.bind(this)).catch((function(e){console.log(e)}))}},{key:"saveMetrics",value:function(){var e=window.location.pathname.split("/")[3];this.db.collection("users").doc(e).collection("rooms").doc(this.roomID).collection("participants").doc().set({videoRecvBitsPerSecondARR:this.metricsHistory.map((function(e){return e.videoRecvBitsPerSecond})),videoSendBitsPerSecondARR:this.metricsHistory.map((function(e){return e.videoSendBitsPerSecond})),videoRecvPacketLossARR:this.metricsHistory.map((function(e){return e.videoRecvPacketLoss})),videoSendPacketLossARR:this.metricsHistory.map((function(e){return e.videoSendPacketLoss}))}).then(function(){console.log("saved participant metrics to database"),localStorage.getItem("emailID")&&this.props.history.push("/Dashboard/"+e)}.bind(this)).catch((function(e){console.log(e)}))}},{key:"componentDidMount",value:function(){var e=this;this.db=p.firestore(),setTimeout((function(){e.callFrame=window.DailyIframe.createFrame({showLeaveButton:!0,iframeStyle:{position:"fixed",top:0,left:0,width:"100%",height:"100%"}}),e.roomID=window.location.pathname.split("/")[2],e.callFrame.join({url:"https://dailydemoapp.daily.co/"+e.roomID}).then(function(){setTimeout(this.seeNetworkStats,1e3)}.bind(e)).catch((function(e){console.log(e)})),e.callFrame.on("left-meeting",(function(){e.callFrame.iframe().style.visibility="hidden",e.saveMetrics()}))}),2e3)}},{key:"render",value:function(){return n.a.createElement("div",null)}}]),a}(n.a.Component),S=Object(m.f)(y),R=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(s.a)(this,a),(o=t.call(this,e)).state={email:""},o.handleChange=o.handleChange.bind(Object(h.a)(o)),o.submitEmail=o.submitEmail.bind(Object(h.a)(o)),o}return Object(r.a)(a,[{key:"handleChange",value:function(e){this.setState({email:e.target.value})}},{key:"submitEmail",value:function(){localStorage.setItem("emailID",this.state.email),p.firestore().collection("users").doc(this.state.email).set({lastLoggedIn:new Date}).then(function(){this.props.history.push("/Dashboard/"+this.state.email)}.bind(this)).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return n.a.createElement("div",{className:"loginBox"},n.a.createElement("label",{className:"welcomeTitle"},"Welcome to your Daily.co dashboard."),n.a.createElement("label",{className:"enterEmailTitle"},"Please enter your email to continue:"),n.a.createElement("input",{className:"emailTF",name:"email",type:"email",placeholder:"Email",onChange:this.handleChange,value:this.state.email}),n.a.createElement("button",{className:"loginBtn",onClick:this.submitEmail},"Continue to Dashboard"))}}]),a}(n.a.Component),P=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement(m.b,{exact:!0,path:"/",component:a},n.a.createElement(m.a,{exact:!0,from:"/",to:"/Login"})),n.a.createElement(m.b,{path:"/Login",component:R}),n.a.createElement(m.b,{exact:!0,path:"/Dashboard/:emailID",component:k}),n.a.createElement(m.b,{path:"/Room/:roomID/:emailID",component:S}))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=a(41);c.a.render(n.a.createElement(g.a,null,n.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[189,1,2]]]);
//# sourceMappingURL=main.06432660.chunk.js.map