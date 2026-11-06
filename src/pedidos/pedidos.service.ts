import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
@Injectable()
export class PedidosService {
  private pedidos: Pedido[] = [];
  private siguienteId = 1;
  create(createPedidoDto: CreatePedidoDto) {
    const pedido = {
      id: this.siguienteId++,
      ...createPedidoDto,
    };
    this.pedidos.push(pedido);
    return pedido;
  }
  findAll() {
    return this.pedidos;
  }
  findOne(id: number) {
    const pedido = this.pedidos.find(p => p.id === id);
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return pedido;
  }
  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = this.findOne(id);
    Object.assign(pedido, updatePedidoDto);
    return pedido;
  }
  remove(id: number) {
    this.findOne(id);
    this.pedidos = this.pedidos.filter(p => p.id !== id);
    return { mensaje: 'Pedido eliminado correctamente' };
  }
}