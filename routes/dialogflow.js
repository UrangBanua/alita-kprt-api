var express = require('express');
var router = express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');

/* GET dialogflow listing. */
router.post('/:botId', async function(req, res, next) {
console.log('');	
console.log('========= [START Whatsapp >>> Dialogflow] =========');	
	console.log('SessionId: '+req.body.sender.id);
	try {
	dfData = await runSample(req.params.botId, req.body.sender.id, req.body.body.toLowerCase());
    if (dfData.length !== 0) {
      res.json(dfData)
    } else {
      res.json({
        'status': 'ERROR',
        'response': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'response': err.messages,
      'data': {}
    })
  }

console.log('========= [END Whatsapp >>> Dialogflow] ==========');	
	
});


// Send a query to the dialogflow agent, and return the query result.
async function runSample(projectId, sessionId, inputQuery) {
  // A unique identifier for the given session
  //const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        //text: 'assalamualaikum',
        text: inputQuery,
        // The language used by the client (en-US)
        languageCode: 'id',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Text: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    console.log(`  Action: ${result.action}`);
	
	var jsonData = { 
					dfQuery: result.queryText, 
					dfRespon: result.fulfillmentText, 
					dfIntent: result.intent.displayName
				  };
				  
	return data = jsonData;
	
  } else {
    console.log(`  No intent matched.`);
  }
}


module.exports = router;
