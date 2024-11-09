/* import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {
  empleados: any[] = [];
  nuevoEmpleado: any = {
    matricula: '',
    nombre: '',
    correo: '',
    edad: null,
    horasTrabajadas: null
  };

  agregarEmpleado() {
    this.empleados.push({ ...this.nuevoEmpleado });
    this.nuevoEmpleado = { matricula: '', nombre: '', correo: '', edad: null, horasTrabajadas: null };
  }

  modificarEmpleado(matricula: string) {
    const empleado = this.empleados.find(emp => emp.matricula === matricula);
    if (empleado) {
    
      empleado.horasTrabajadas = prompt('Ingresa las nuevas horas trabajadas:', empleado.horasTrabajadas);
    }
  }

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
  }

  calcularPago(empleado: any): number {
    const tarifaNormal = 70;
    const tarifaExtra = 140;
    const horasNormales = Math.min(40, empleado.horasTrabajadas);
    const horasExtras = Math.max(0, empleado.horasTrabajadas - 40);
    return (horasNormales * tarifaNormal) + (horasExtras * tarifaExtra);
  }

  imprimirTabla() {
    console.log("Tabla de empleados:", this.empleados);
  }
}
 */



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  




@Component({
  selector: 'app-empleados',
  standalone: true,
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  imports: [FormsModule, CommonModule] 
})
export class EmpleadosComponent {
  empleados: any[] = [];
  mostrarTabla: boolean = false;
  totalAPagar: number = 0;

  nuevoEmpleado: any = {
    matricula: '',
    nombre: '',
    correo: '',
    edad: null,
    horasTrabajadas: null,
    horasXPagar: 0, 
    horasExtras: 0, 
    subTotal: 0          
  };

  agregarEmpleado() {
    const empleado = { ...this.nuevoEmpleado }; 
    empleado.horasXPagar = this.calcularHorasPorPagar(empleado.horasTrabajadas);
    empleado.horasExtras = this.calcularHorasExtras(empleado.horasTrabajadas);
    empleado.subTotal = empleado.horasXPagar + empleado.horasExtras;

    this.empleados.push(empleado);
    this.nuevoEmpleado = { matricula: '', nombre: '', correo: '', edad: null, horasTrabajadas: null, horasXPagar: 0, horasExtras: 0, subTotal: 0 };
    
    this.calcularTotalAPagar();
  }

  modificarEmpleado(matricula: string) {
    const empleado = this.empleados.find(emp => emp.matricula === matricula);
    if (empleado) {
      const nuevasHoras = prompt('Ingresa las nuevas horas trabajadas:', empleado.horasTrabajadas?.toString() || '0');
      empleado.horasTrabajadas = nuevasHoras ? parseInt(nuevasHoras, 10) : empleado.horasTrabajadas;
      empleado.horasXPagar = this.calcularHorasPorPagar(empleado.horasTrabajadas);
      empleado.horasExtras = this.calcularHorasExtras(empleado.horasTrabajadas);
      empleado.subTotal = empleado.horasXPagar + empleado.horasExtras;
      
      this.calcularTotalAPagar();
    } else {
      console.warn(`No se encontró un empleado con matrícula ${matricula}`);
    }
  }

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    this.calcularTotalAPagar();
  }

  calcularHorasPorPagar(horasTrabajadas: number): number {
    const tarifaNormal = 70;
    const horasNormales = Math.min(40, horasTrabajadas || 0);
    return horasNormales * tarifaNormal;
  }

  calcularHorasExtras(horasTrabajadas: number): number {
    const tarifaExtra = 140;
    const horasExtras = Math.max(0, (horasTrabajadas || 0) - 40);
    return horasExtras * tarifaExtra;
  }

  calcularTotalAPagar() {
    this.totalAPagar = this.empleados.reduce((acc, emp) => acc + emp.subTotal, 0);
  }

 imprimirTabla() {
    this.mostrarTabla = true;
  }
} 

