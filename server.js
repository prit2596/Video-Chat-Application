var fs=require('fs');
var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var webrtcSupport = require('webrtcsupport');
var DetectRTC = require('detectrtc');
var cors = require('cors');
//var ExpressPeerServer = require('peer').ExpressPeerServer;

var port = process.env.PORT || 443;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

var PeerServer=require('peer').PeerServer;
var server=PeerServer({port:9000,path:'/peerjs',ssl: {
    key: fs.readFileSync('/path/to/your/ssl/key/here.key'),
    cert: fs.readFileSync('/path/to/your/ssl/certificate/here.crt')});
/*
var server = require('http').createServer(app);
var option={
    debug:true
}

app.use('/peerjs',ExpressPeerServer(server,option));
*/

/*DetectRTC.load(function() {
    if(DetectRTC.isWebRTCSupported){
        console.log("Supported");
    }
    else{
        console.log("Not Supported");
    }

});*/
//server.listen(9000);
app.listen(port, function(){
    console.log('Server running at port ' + port);
});
