Parse.Cloud.afterSave("Alert", function(request) {
	if (request.object.get("seen") == false) {
		Parse.Push.send({
			channels: [ request.object.get('user_id').toString() ],
		  	data: {
		    		alert: request.object.get("event_type") + " Detected."
		  	}
		}, {
			success: function() {
				console.log("Push Successfully Sent")
			},
			error: function(error) {
				console.error("Push Couldnt Be Sent: " + error.message)
			}
		});
	}	
});
