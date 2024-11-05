import express from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/controllerUser";
import {
  allImages,
  allProducts,
  createProduct,
  deleteProduct,
  postImage,
  singleProduct,
  updateProduct,
} from "../controllers/controllerProduct";
import {
  allKeys,
  createPixKey,
  deletePixKey,
  keyById,
  updatePixKey,
} from "../controllers/controllerKey";
import multer from "multer";
import { storage } from "../config/multerConfig";
import {
  allAddresses,
  deleteAddress,
  registerAddress,
  singleAddress,
  updatedAddress,
} from "../controllers/controllerAddress";
import {
  allPayments,
  createPayment,
  deletePayment,
} from "../controllers/PaymentController";
import {
  deleteUrl,
  getUrl,
  updateUrl,
  whatsappLink,
} from "../controllers/WhatsappController";

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);
router.get("/users", allUsers);
router.delete("/user/:id", deleteUser);

router.post("/create/address", registerAddress);
router.get("/address/:id", singleAddress);
router.get("/addresses", allAddresses);
router.put("/address/:id", updatedAddress);
router.delete("/address/:id", deleteAddress);

router.post("/product/create", upload.single("imagem"), createProduct);
router.post("/product/image", upload.single("imagem"), postImage);

router.get("/images", allImages);
router.get("/products", allProducts);
router.get("/product/:id", singleProduct);
router.put("/product/:id", upload.single("imagem"), updateProduct);
router.delete("/product/:id", deleteProduct);

router.post("/key/create", createPixKey);
router.get("/keys", allKeys);
router.get("/key/:id", keyById);
router.put("/key/:id", updatePixKey);
router.delete("/key/:id", deletePixKey);

router.post("/payment/create", createPayment);
router.get("/payments", allPayments);
router.delete("/payments/:id", deletePayment);

router.post("/url", whatsappLink);
router.put("/url", updateUrl);
router.get("/url", getUrl);
router.delete("/url", deleteUrl);

export default router;
