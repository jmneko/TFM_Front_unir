export interface IUser {
  id: number;
  nombre: string;
  apellidos: string;
  mail: string;
  pass: string;
  foto: string;
  rol: UserRole;
  tel: string;
  pxh: number;
  experiencia: number;
  lat: number;
  lon: number;
  activo: boolean;
  puntuacion: string;
}

type UserRole = 'admin' | 'alumn' | 'prof';
