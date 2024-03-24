const cloudinary = require('cloudinary').v2;
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) =>{
      //console.log(JSON.stringify(req.file.filename));
      if(req.file) cloudinary.uploader.destroy(req.file.filename);
      next(err);
    });
  };
};
