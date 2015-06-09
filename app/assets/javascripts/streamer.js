


$(function() {
var append, pubnub;
pubnub = PUBNUB.init({
     subscribe_key: 'demo'
 });

pubnub.subscribe({
    channel: 'pubnub_chat',
    message: function(m){
    console.log("message received from server");   
    console.log(m);
    append(m); 
    },
    error: function (error) {
      console.log(JSON.stringify(error));
    }
 });

append = function(message) {
  var author, msg, timetoken;
  timetoken = parseInt($("#timetoken").html());
  message["timetoken"] = message["author"];
  message["created_at"] = message["author"];
    msg = jQuery("<div/>", {
      text: message["message"],
      "class": 'list-group-item'
    });
    author = jQuery("<span/>", {
      text: message["author"] + "@" + message["created_at"],
      "class": 'badge'
    });
    author.appendTo(msg);
    msg.appendTo("#messages");
    $("#messages").stop().animate({
      scrollTop: $("#messages")[0].scrollHeight
    }, 800);
    $("#timetoken").html(message["timetoken"]);
    return $("#message-field").val('');
  
};

$('#send-button').click(function() {
     $.ajax({
      url: "publish",
      data: {
        author: $("#author-field").val(),
        message: $("#message-field").val()
      }
    });
  });

    function get_xirsys_servers() {
        var servers;
        $.ajax({
            type: 'POST',
            url: 'https://api.xirsys.com/getIceServers',
            data: {
                room: 'default',
                application: 'default',
                domain: 'www.pubnub-example.com',
                ident: 'pubnub',
                secret: 'dec77661-9b0e-4b19-90d7-3bc3877e64ce',
            },
            success: function(res) {
                res = JSON.parse(res);
                if (!res.e) servers = res.d.iceServers;
            },
            async: false
        });
        return servers;
    }
});

