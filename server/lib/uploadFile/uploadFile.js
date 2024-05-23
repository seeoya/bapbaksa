const multer = require("multer");
const fs = require("fs");
const uuid4 = require("uuid4");
const path = require("path");

const upload = {
    UPLOAD_MIDDLEWARE: () => {
        const upload = multer({
            storage: multer.diskStorage({
                destination(req, file, done) {
                    let fileDir = `/home/ubuntu/user/upload/profile_imgs/${req.body.u_id}/`;
                    //let fileDir = `C:\\bapbaksa\\upload\\profile_imgs\\${req.body.u_id}\\`;
                    if (!fs.existsSync(fileDir)) {
                        fs.mkdirSync(fileDir, { recursive: true });
                    }

                    done(null, fileDir);
                },
                filename(req, file, done) {
                    let uuid = uuid4();
                    let extName = path.extname(file.originalname);
                    let fileName = uuid + extName;

                    done(null, fileName);
                },
            }),
            limits: {
                fileSize: 1024 * 1024,
            },
        });

        return upload.single("u_profile_img");
    },
};
module.exports = upload;
