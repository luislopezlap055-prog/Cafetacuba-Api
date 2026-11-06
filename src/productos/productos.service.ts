import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
@Injectable()
export class ProductosService {
  private productos: Producto[] = [];
  private siguienteId = 1;
  create(createProductoDto: CreateProductoDto) {
    const producto = {
      id: this.siguienteId++,
      ...createProductoDto,
    };
    this.productos.push(producto);
    return producto;
  }
  findAll() {
    return this.productos;
  }
  findOne(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }
  update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return producto;
  }
  remove(id: number) {
    const producto = this.findOne(id);
    this.productos = this.productos.filter(p => p.id !== id);
    return { mensaje: 'Producto eliminado correctamente' };
  }
}
