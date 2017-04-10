//console.log('123');
var  peer = new Peer({key:'b9fchctm0r16pqfr',config:
                                                  {'iceServers':
                                                                [{ url: 'stun:stun.l.google.com:19302' },
                                                                 { 	url: 'turn:192.158.29.39:3478?transport=udp',
                                                                        	credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                                                                        	username: '28224511:1379330808'
                                                                  }]
                                                  }

                    });
var conn;
var id;
var call;
peer.on('open',function(id)
{
  console.log('test');
  document.getElementById('src').value=id;
  console.log('your id is fucking'+id);
});


function connect()
{
  //console.log("inside connect");
  var dstId=document.getElementById('dst').value;
  //console.log(dstId);
  var con=peer.connect(dstId);
  conn=con;
  document.getElementById('connectionInfo').innerHTML="Connected to "+dstId;
  con.on('open',function()
  {
    listenData();
  });
}

function send()
{
  var data=document.getElementById('s').value;
  conn.send(data);
}



peer.on('connection',function(con)
{
  conn=con;
  listenData();
});


function listenData()
{
  document.getElementById('connectionInfo').innerHTML="Connected to "+conn.peer;
  id=conn.peer;
  conn.on('data',function(data)
  {
    document.getElementById('r').value= "["+id+"]:" + data;
    console.log(data);
  });
}


//receiver receving call
peer.on('call',function(call)
{
  var constraint={video:true,audio:true};
  navigator.getUserMedia(constraint,function(stream)
  {
    var my = document.getElementById('my');
    my.srcObject = stream;
    my.onloadedmetadata = function(e) {
      console.log("own");
      my.play();
 }


    call.answer(stream);
    call.on('stream',function(stream1)
    {
      console.log('inside listen stream');
      var video = document.getElementById('other');
      video.srcObject = stream1;
      video.onloadedmetadata = function(e) {
        video.play();
      }
    });
  //listenStream();
},function(err){
  console.log(err);
});

});

function call()
{
  var constraint={video:true,audio:true};
  console.log('hi');
  navigator.getUserMedia(constraint,function(stream) {    //here stram return own stream
         var my = document.getElementById('my');
         my.srcObject = stream;
         my.onloadedmetadata = function(e) {
           console.log("own");
           my.play();
      }

         /* $('#my').attr('srcObject',stream);
          $('#my').attr('onloadedmetadata',function(e){
              $('#my').play();
          });
	*/
          call = peer.call(id,stream);
          call.on('stream',function(stream1)
          {
            console.log('inside listen stream');
            var video = document.getElementById('other');
            video.srcObject = stream1;
            video.onloadedmetadata = function(e) {
              video.play();
            }
          });
          // listenStream();
      },function(err){
    console.log(err);

  });
}
