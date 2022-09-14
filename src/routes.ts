import { Router } from "express"
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategroyController } from "./controllers/category/CreateCategroyController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import uploadConfig from "./config/multer"
import multer from 'multer'
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))


// -- ROTAS USER --
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().hanlde)
router.get("/me", isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY
router.post("/category", isAuthenticated, new CreateCategroyController().handle)
router.get("/category", isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle)
router.get("/category/product", isAuthenticated, new ListByCategoryController().handle)

// -- ROTAS ORDER
router.post("/order", isAuthenticated, new CreateOrderController().handle)
router.delete("/order", isAuthenticated, new RemoveOrderController().handle)

// add um item na Order do cliente
router.post("/order/add", isAuthenticated, new AddItemController().handle)
// remove um item na order do cliente
router.delete("/order/item", isAuthenticated, new RemoveItemController().handle)

export { router }