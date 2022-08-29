
const multer = require("multer");

const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: "./public/assets/img/users",

    filename: function (req, file, cb) {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf(".")
      );
      cb(null, Date.now() + extension);
    },
  });

  const upload = multer({ storage: storage }).single("thumbnail");
  return upload;
};

module.exports =  uploadFile;