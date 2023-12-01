import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PeticionClasesService {

    private baseUrl: string = "http://localhost:3000/api/usuarios/";

    httpClient = inject(HttpClient);

    constructor() { }

    // Metodo para aceptar la conexion profesor-alumno
    aceptarSolicitud(profesorId: number, alumnoId: number): Promise<any> {

        return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}${profesorId}/alumnos/`, {alumnoId}))
            .then(response => {
                if (response.suces) {
                    response.activo = true;
                } 
                return response;
            })
    }


    // Metodo para cancelar la conexion profesor-alumno
    cancelarSolicitud(profesorId: number, alumnoId: number): Promise<any> {

        return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${profesorId}/alumnos`, {body: {alumnoId} })
        )};
    }
