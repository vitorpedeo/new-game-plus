const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const hash = crypto.randomBytes(4).toString('hex');
    const fileName = `${hash}-${file.originalname}`;

    cb(null, fileName);
  },
  destination: function (req, file, cb) {
    const imgDestination = path.resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      'games'
    );

    cb(null, imgDestination);
  },
});

const fileFilter = (req, file, cb) => {
  const permittedImgTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  if (permittedImgTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.imgTypeError = 'Tipo de imagem inválido!';
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
