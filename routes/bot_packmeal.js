const express = require('express');
const router = express.Router();
const db = require('../models/index');


// GET help listing command.
router.get('/:shift', async function(req, res, next) {
   try {
		data_packmeal = await db.sequelize.query(`
		SELECT DATA_ABS1.dbo.QLembur2.shift, tblLokasiMesin_1.lokasi, DATA_ABS1.dbo.QLembur2.Dept, COUNT(DATA_ABS1.dbo.QLembur2.nrp) AS total
		FROM DATA_ABS1.dbo.QLembur2 LEFT OUTER JOIN
		DATA_ABS1.dbo.tblLokasiMesin AS tblLokasiMesin_1 ON DATA_ABS1.dbo.QLembur2.NoMesin1 = tblLokasiMesin_1.ID
		WHERE (CONVERT(varchar, DATA_ABS1.dbo.QLembur2.tanggal, 105) = CONVERT(varchar, GETDATE(), 105)) AND (DATA_ABS1.dbo.QLembur2.[in] IS NOT NULL)
		AND DATA_ABS1.dbo.QLembur2.shift = (CASE WHEN :shift LIKE '%mining%-s1' THEN 1 
		WHEN :shift LIKE '%mining%-s2' then 2 ELSE 0 END)
		GROUP BY tblLokasiMesin_1.LOKASI, DATA_ABS1.dbo.QLembur2.shift, DATA_ABS1.dbo.QLembur2.Dept
		`, {
		replacements: {shift: req.params.shift},
		type: db.sequelize.QueryTypes.SELECT
		});
		
		if (data_packmeal.length !== 0) {
		  res.json({
			'status': 'OK BUNGAS',
			'response': 'pencarian data bahasil ...',
			'data': {
				'result': JSON.stringify(data_packmeal, null, '\t') + '\n kembali kasih . . . 🙏🏻'
			}
		  })
		} else {
		  res.json({
			'status': 'ERROR',
			'response': 'EMPTY',
			'data': {'result': ' mohon maaf data tidak di temukan 🙏🏻'}
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


module.exports = router;