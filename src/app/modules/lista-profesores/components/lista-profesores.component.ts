import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaProfesoresService } from '../services/listaProfesores.service';


@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css'] 
})
export class ListaProfesoresComponent {

  arrProfesores: any[] = [];
  public id: number | any;
  nombreEspecialidad: string | any;
  puntuacion: string = "";
  marcadores: any[] = [];
  centro: google.maps.LatLng | any;
  zoom: number = 10;
  icono: string = "."
    
    
  circleOptions: any = {
    fillColor: '#cfb3fc',
    strokeColor: '#cfb3fc',
  }

  activatedRoute = inject(ActivatedRoute);
  listaProfesoresService = inject(ListaProfesoresService);

  async ngOnInit(): Promise<void> {
    this.centro = new google.maps.LatLng(40.4,-3.5)

    this.activatedRoute.params.subscribe(async (params: any) => {

      try {
      this.id = params.especialidadId;
        if (this.id) {
        this.listaProfesoresService.getProfesoresByEspecialidadId(this.id).then(data => {
          this.arrProfesores = data;
          this.arrProfesores.forEach(profesor => {

            this.listaProfesoresService.getPuntuacionesByProfesorId(profesor.id).then(data => {
              let puntuacionMedia = 0;
              data.forEach(puntuacion => {
                puntuacionMedia = puntuacion.puntuacion + puntuacionMedia
              });
              
              this.puntuacion = (puntuacionMedia/data.length).toFixed(1);
              profesor.puntuacion = this.puntuacion;
              })

              console.log(this.arrProfesores)
            
              if (profesor.activo == 1){
                this.marcadores.push({coordenadas: new google.maps.LatLng(profesor.lat,profesor.lon), centroMarcador: new google.maps.LatLng(profesor.lat+0.01,profesor.lon+0.01), label: {text: profesor.nombre, color: "#cfb3fc"}});
              }
            
          });

          //Por defecto ordenamos los profesores por puntuacion 
          this.arrProfesores.sort((a, b) => {
            if(a.puntuacion < b.puntuacion) {
              return -1;
            }
            if(a.puntuacion > b.puntuacion) {
              return 1;
            }
            if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
              return -1;
            }
            if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
              return 1;
            }
            return 0;
  
          })
          console.log(this.arrProfesores)

          })
        this.listaProfesoresService.getNombreEspecialidad().then(nombre => {
          let especialidad = nombre.find((esp)=> esp.id == this.id);
          this.nombreEspecialidad =  (especialidad.especialidad).toUpperCase();
        })       
      
      }
      } catch (error) {
        alert(error)
      }
    });
  }

}
