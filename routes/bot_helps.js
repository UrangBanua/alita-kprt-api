const express = require('express');
const router = express.Router();
const model = require('../models/index');

/* // GET help listing.
router.get('/', function(req, res, next) {
    var data =  {
				'status': 'OK BUNGAS',
				'response': 
`Hi.. Ketemu lagi dengan saya Alita, 
ada yang bisa saya bantu ?
				
Berikut list command yg bisa ditanyakan,
	- /greencard?
	- /observasi?
	- /pto?
	- /ss?
	- /dfast?
	- /help_harrcon?
	- /help_packmeal?`,
				}
    res.json(data);
	//res.send('respond help with a get apps');
    res.end();
});
 */
// GET help listing command.
router.get('/:apps', async function(req, res, next) {
    console.log("content :" + JSON.stringify(req.body));
   try {
    const bot_api = await model.bot_helps.findOne({where: {apps: req.params.apps}});
    if (bot_api.length !== 0) {
      res.json({
        'status': 'OK BUNGAS, '+ req.params.apps,
        'data': bot_api,
		'response': 'pencarian data bahasil ...',
      })
    } else {
      res.json({
        'status': 'ERROR',
		'response': 'pencarian data bahasil ...',
		'data': {
				'result': JSON.stringify(data_packmeal, null, '\t') + '\n kembali kasih . . . 🙏🏻'
				}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'response': err.message,
      'data': {'commands': 'tidak ada dikamus saya, silahkan dicoba kembali command yang lain . .'}
    })
  }
});

// POST bot_helps
router.post('/', async function (req, res, next) {
  try {
    const {
      apps,
      commands
    } = req.body;
    const bot_helps = await model.bot_helps.create({
     apps,
     commands
    });
  if (bot_helps) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'command berhasil ditambahkan',
      'data': bot_helps,
    })
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'messages': err.message,
     'data': {}
   })
 }
});

// UPDATE bot_helps
router.patch('/:id', async function (req, res, next) {
  try {
    const bot_helpsId = req.params.id;
    const {
      apps,
      commands
    } = req.body;
    const bot_helps = await model.bot_helps.update({
      apps,
      commands
    }, {
      where: {
        id: bot_helpsId
      }
    });
    if (bot_helps) {
      res.json({
        'status': 'OK',
        'messages': 'command berhasil diupdate',
        'data': bot_helps,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});

// DELETE bot_helps
router.delete('/:id', async function (req, res, next) {
  try {
    const bot_helpsId = req.params.id;
    const bot_helps = await model.Todo.destroy({ where: {
      id: bot_helpsId
    }})
    if (bot_helps) {
      res.json({
        'status': 'OK',
        'messages': 'command berhasil dihapus',
        'data': bot_helps
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});

module.exports = router;