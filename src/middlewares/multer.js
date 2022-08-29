
const multer = require("multer");

const uploadFile = (req, res) => {
  const storage = multer.diskStorage({
    destination: "./public/assets/img/users",

    filename: function (req, file, cb) {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      // cb(null, Date.now() + extension);
      cb(null, req.body.email + extension);
    },
  });

  const upload = multer({ storage: storage }).single("thumbnail");
  return upload;
};

module.exports =  uploadFile;