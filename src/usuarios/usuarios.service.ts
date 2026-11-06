import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];
  private siguienteId = 1;
  create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = {
      id: this.siguienteId++,
      ...createUsuarioDto,
    };
    this.usuarios.push(usuario);
    return usuario;
  }
  findAll() {
    return this.usuarios;
  }
  findOne(id: number) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    return usuario;
  }
  remove(id: number) {
    this.findOne(id);
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    return { mensaje: 'Usuario eliminado correctamente' };
  }
}
