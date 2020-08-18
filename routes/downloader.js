const router = require('express').Router();
const File = require('../models/file');

router.get('/:id', async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id });
        return res.render('download', { fileName: file.filename, fileSize: file.size, downloadLink: 'http://download/xjennewfnjwne' });
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});

router.get('/download/:link', async (req, res) => {
   // Extract link and get file from storage send download stream 
   const file = await File.findOne({ _id: req.params.link });
   const filePath = `${__dirname}/../${file.path}`;
   res.download(filePath);
});


module.exports = router;