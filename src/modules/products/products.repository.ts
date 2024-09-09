import { Injectable } from "@nestjs/common";
import { Product } from "./entities/Product";
import { ProductDTO } from "./entities/ProductDTO";

@Injectable()
export class ProductsRepository{

    private products: Product[] = [
        { id: 1, name: "Laptop", description: "Powerful laptop with 16GB RAM and 512GB SSD.", price: 1200.99, stock: true, imgUrl: "https://example.com/laptop.jpg" },
        { id: 2, name: "Smartphone", description: "Latest model with OLED screen and 128GB storage.", price: 799.49, stock: true, imgUrl: "https://example.com/smartphone.jpg" },
        { id: 3, name: "Headphones", description: "Noise-cancelling over-ear headphones.", price: 199.99, stock: false, imgUrl: "https://example.com/headphones.jpg" },
        { id: 4, name: "Smartwatch", description: "Water-resistant smartwatch with fitness tracking.", price: 149.95, stock: true, imgUrl: "https://example.com/smartwatch.jpg" },
        { id: 5, name: "Gaming Console", description: "Next-gen console with 1TB storage.", price: 499.99, stock: true, imgUrl: "https://example.com/console.jpg" },
        { id: 6, name: "Bluetooth Speaker", description: "Portable speaker with 10-hour battery life.", price: 69.95, stock: false, imgUrl: "https://example.com/speaker.jpg" },
        { id: 7, name: "Camera", description: "Mirrorless camera with 4K video recording.", price: 999.99, stock: true, imgUrl: "https://example.com/camera.jpg" },
        { id: 8, name: "Monitor", description: "27-inch 4K UHD monitor.", price: 299.49, stock: true, imgUrl: "https://example.com/monitor.jpg" },
        { id: 9, name: "Keyboard", description: "Mechanical keyboard with RGB lighting.", price: 89.99, stock: false, imgUrl: "https://example.com/keyboard.jpg" },
        { id: 10, name: "Mouse", description: "Wireless ergonomic mouse.", price: 49.95, stock: true, imgUrl: "https://example.com/mouse.jpg" },
        { id: 11, name: "Tablet", description: "10-inch tablet with stylus support.", price: 399.99, stock: true, imgUrl: "https://example.com/tablet.jpg" },
        { id: 12, name: "Smart TV", description: "55-inch 4K Smart TV.", price: 799.99, stock: true, imgUrl: "https://example.com/smarttv.jpg" },
        { id: 13, name: "External Hard Drive", description: "2TB external USB-C hard drive.", price: 129.99, stock: false, imgUrl: "https://example.com/harddrive.jpg" },
        { id: 14, name: "Wireless Charger", description: "Fast wireless charger for smartphones.", price: 29.95, stock: true, imgUrl: "https://example.com/charger.jpg" },
        { id: 15, name: "Drone", description: "Drone with 1080p camera and GPS.", price: 399.95, stock: false, imgUrl: "https://example.com/drone.jpg" },
        { id: 16, name: "Fitness Tracker", description: "Fitness tracker with heart rate monitor.", price: 99.95, stock: true, imgUrl: "https://example.com/tracker.jpg" },
        { id: 17, name: "VR Headset", description: "Virtual reality headset with motion tracking.", price: 499.99, stock: false, imgUrl: "https://example.com/vrheadset.jpg" },
        { id: 18, name: "Electric Scooter", description: "Folding electric scooter with 20-mile range.", price: 299.99, stock: true, imgUrl: "https://example.com/scooter.jpg" },
        { id: 19, name: "Air Purifier", description: "HEPA air purifier for small rooms.", price: 149.99, stock: true, imgUrl: "https://example.com/airpurifier.jpg" },
        { id: 20, name: "Coffee Maker", description: "Automatic coffee maker with grinder.", price: 99.95, stock: false, imgUrl: "https://example.com/coffeemaker.jpg" }
      ];

      private id: number = 21;
    
    getAll() {
      return this.products
    }

    getById(id:string) {
      const pId = Number(id)
      const result = this.products.find(product => product.id === pId)
      if(!result) {
        return `No se encontro el producto con el id ${pId}`
      } else return result
    }

    createProduct(data:ProductDTO):Product {
      const nProduct = {...data, id:this.id}
      this.products.push(nProduct)
      return nProduct
    }

    updateProduct(id: string, data:ProductDTO):Product {
      const pId = Number(id)
      let product = this.products.find(product => product.id === pId)
      if(product) {
        product.description = data.description
        product.name = data.name
        product.imgUrl = data.imgUrl
        product.price = data.price
        product.stock = data.stock
      }
      return product
    }

    deleteProduct(id:string):string {
      const pId = Number(id)
      const index = this.products.findIndex(product => product.id === pId)
      this.products.splice(index, 1)
      return `Se elimino el usuario con el id ${pId}`
  }
}