const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage = (type) => {
    //Create source folder to store file uploaded
    // const made = mkdirp.sync(`./public/images/`);
    const storage = multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, `./public/images`); //setup the place to store file directory
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname); //rename file to prevent override file-name
        },
    });
    //setup upload file
    const upload = multer({
        storage,
        fileFilter: function (req, file, cb) {
            const extensionImageList = ["jpg", "png", "svg", "jpeg"];
            const extension = file.mimetype?.split("/").pop();
            const check = extensionImageList.includes(extension);
            if (check) {
                // function cb(err, value) {
                //     if (err) return err;
                //     return value;
                // }
                cb(null, true);
            } else {
                cb(new Error("File extension is not suitable"));
            }
        },
    });
    return upload.single(type);
};

module.exports = uploadImage;
