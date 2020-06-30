const express = require('express');
const router = express.Router();
const db = require('../models/index');


// post webhook listing command.
router.post('/:botId', async function(req, res, next) {
	const dBody 		= req.body
	const dSessionId 	= dBody.session;
	const dText 		= dBody.queryResult.queryText;
	const dAction 		= dBody.queryResult.action;
	const dDB 		= dBody.queryResult.parameters.pDB;
	const dQuery 	= dBody.queryResult.fulfillmentText;
	console.log('');	
	console.log('     ========= [START Dialogflow >>> Webhook] =========');	
	console.log('     SessionId: '+dSessionId);
	console.log('     Text: '+dText);
	console.log('     Action: '+dAction);
	console.log('     DB: '+dDB);
	console.log('     Query: '+dQuery);
   try {
		data_webhook = await db.sequelize.query(` USE ${dDB}
												${dQuery}
												`, 
		{
		replacements: {botId: req.params.botId},
		type: db.sequelize.QueryTypes.SELECT
		});
		
		const json = `{ "data": ${JSON.stringify(data_webhook)} }`;
		const obj = JSON.parse(json);
		
		if (typeof(obj.data[0]) != "undefined") {
			fText = obj.data[0].Fulfillment;
		} else { fText = null; }
		
		if (fText !== null) {
			res.json(
				{
				  'fulfillmentText': fText,
				  'fulfillmentMessages': [
					{
					  'text': {
						'text': [
						  fText
						]
					  }
					}
				  ]
				}
			)
		} else {
			res.json(
				{
				  'fulfillmentText': 'mohon maaf data yang anda minta tidak di temukan \n 🙏🏻',
				  'fulfillmentMessages': [
					{
					  'text': {
						'text': [
						  'mohon maaf data tidak di temukan \n 🙏🏻'
						]
					  }
					}
				  ]
				}
			)
		}
	   
	   
  } catch (err) {
    res.json(
				{
				  'fulfillmentText': 'Maaf terdapat pesan error pada query : "' + err.message + '". \n Mohon hubungi developer terkait, terima kasih 🙏🏻' ,
				  'fulfillmentMessages': [
					{
					  'text': {
						'text': [
						  'Maaf terdapat pesan error pada query : "' + err.message + '". \n Mohon hubungi developer terkait, terima kasih 🙏🏻'
						]
					  }
					}
				  ]
				}
			)
  }
  
   console.log('     ========= [END Dialogflow >>> Webhook] =========');
   console.log('');	

});


module.exports = router;