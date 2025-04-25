import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

export const getImageController = async (req, res) => {
  try {
    const fileId = req.params.id;
    const _id = new mongoose.Types.ObjectId(fileId);
    
    gfs.files.findOne({ _id }, (err, file) => {
      if (err || !file) {
        return res.status(404).json({ error: 'Файл не найден' });
      }
      res.set('Content-Type', file.contentType);
      const readstream = gfs.createReadStream({ _id });
      readstream.pipe(res);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении файла' });
  }
};