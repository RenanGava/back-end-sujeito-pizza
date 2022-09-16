import { Router } from "express"
import uploadConfig from "./config/multer"
import multer from 'multer'

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategroyController } from "./controllers/category/CreateCategroyController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";

import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

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
// enviar o pedido ou "Order" do client
router.put("/order/send", isAuthenticated, new SendOrderController().handle)
// lista todos os pedidos
router.get("/order", isAuthenticated,  new ListOrdersController().handle)
// detalhes do pedido
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle)
// concluir o pedido
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export { router }