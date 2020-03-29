var express = require('express');
var router = express.Router();
const model = require('../models/index');

/* GET bot_api listing. */
router.get('/', async function(req, res, next) {
    console.log("content :" + JSON.stringify(req.body));
   try {
    const bot_api = await model.bot_api.findAll({});
    if (bot_api.length !== 0) {
      res.json({
        'status': 'OK BUNGAS',
        'response': 'sya tdk mengerti yg anda maksud ...',
        'data': bot_api
      })
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
});

// POST bot_api
router.post('/', async function (req, res, next) {
    console.log("content :" + JSON.stringify(req.body));
  try {
    const {
		id,
		body,
		type,
		t,
		notifyName,
		from,
		to,
		self,
		ack,
		invis,
		isNewMsg,
		star,
		recvFresh,
		broadcast,
//		mentionedJidList,
		isForwarded,
		labels,
//		sender,
		timestamp,
		content,
		isGroupMsg,
		isMMS,
		isMedia,
		isNotification,
		isPSA,
//		chat,
		chatId
//		quotedMsgObj,
//		mediaData
    } = req.body;
    const bot_api = await model.bot_api.create({
		id_m: id,
		body,
		type,
		t,
		notifyName,
		from,
		to,
		self,
		ack,
		invis,
		isNewMsg,
		star,
		recvFresh,
		broadcast,
//		mentionedJidList,
		isForwarded,
		labels,
//		sender,
		timestamp,
		content,
		isGroupMsg,
		isMMS,
		isMedia,
		isNotification,
		isPSA,
//		chat,
		chatId
//		quotedMsgObj,
//		mediaData
    });
  if (bot_api) {
    res.status(201).json({
      'status': 'OK BUNGAS',
      'response': `laporan sudah saya catat,
terima kasih atas kerjasamanya . . . 🙏🏻`,
	  //'file': './images/help2.png',
      'data': bot_api,
    })
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'response': err.message,
     'data': {},
   })
 }
});

// UPDATE bot_api
router.patch('/:id', async function (req, res, next) {
  try {
    const bot_apiId = req.params.id;
    const {
      name,
      email,
      gender,
      phoneNumber
    } = req.body;
    const bot_api = await model.bot_api.update({
      name,
      email,
      gender,
      phone_number: phoneNumber
    }, {
      where: {
        id: bot_apiId
      }
    });
    if (bot_api) {
      res.json({
        'status': 'OK BUNGAS',
        'response': 'User berhasil diupdate',
        'data': bot_api,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'response': err.message,
      'data': {},
    })
  }
});

// DELETE bot_api
router.delete('/:id', async function (req, res, next) {
  try {
    const bot_apiId = req.params.id;
    const bot_api = await model.Todo.destroy({ where: {
      id: bot_apiId
    }})
    if (bot_api) {
      res.json({
        'status': 'OK',
        'response': 'User berhasil dihapus',
        'data': bot_api,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'response': err.message,
      'data': {},
    })
  }
});

module.exports = router;
