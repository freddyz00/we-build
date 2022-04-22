import nextConnect from "next-connect";
import multer from "multer";
import { sanityClient } from "../../lib/sanity";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("file");

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  res.status(200).json({ name: "John Doe" });
  console.log(req.file);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
