import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string // forçar tipagem

        const lisByCategory = new ListByCategoryService()

        const products = await lisByCategory.execute({ category_id })

        return res.json(products)
    }
}

export { ListByCategoryController }