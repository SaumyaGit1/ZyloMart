import multer from "multer";
const storage=multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        cb(null, file.originalname);
    }
})
const upload=multer({storage})
export default upload