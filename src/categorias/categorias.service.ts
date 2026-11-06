import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
@Injectable()
export class CategoriasService {
  private categorias: Categoria[] = [];
  private siguienteId = 1;
  create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = {
      id: this.siguienteId++,
      ...createCategoriaDto,
    };
    this.categorias.push(categoria);
    return categoria;
  }
  findAll() {
    return this.categorias;
  }
  findOne(id: number) {
    const categoria = this.categorias.find(c => c.id === id);
    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }
    return categoria;
  }
  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return categoria;
  }
  remove(id: number) {
    this.findOne(id);
    this.categorias = this.categorias.filter(c => c.id !== id);
    return { mensaje: 'Categoria eliminada correctamente' };
  }
}