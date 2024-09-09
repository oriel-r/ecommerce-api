import { Body, Controller, Get, Post, Put, Param, Delete, UseGuards} from "@nestjs/common";
import { ProductsServies } from "./prooducts.service";
import { ProductDTO } from "./entities/ProductDTO";
import { AuthGuard } from "../auth/auth.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductsServies) {}
    
    @Get()
    getAll() {
        return this.productsServices.getAll()
    }

    @Get(':id')
    getById(@Param('id') id:string) {
        return this.productsServices.getById(id)
    }
            
    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body() data:ProductDTO) {
        return this.productsServices.createProduct(data)
    }
                
    @Put(':id')
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id:string, @Body() data:ProductDTO) {
        return this.productsServices.updateProduct(id, data)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id:string) {
        return this.productsServices.deleteProduct(id)
    }
}