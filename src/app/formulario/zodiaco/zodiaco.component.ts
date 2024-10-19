import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html'
})


export class ZodiacoComponent{
    formGroup: FormGroup;
    nombreCompleto: string = '';
    imageWidth: number = 100;
    imageMargin: number = 2;
    muestraImg: boolean = true;
    edad: number = 0;
    signoZodiacal: 'Rata' | 'Buey' | 'Tigre' | 'Conejo' | 'Dragón' | 'Serpiente' | 'Caballo' | 'Cabra' | 'Mono' | 'Gallo' | 'Perro' | 'Cerdo' = 'Rata'; // valor por defecto
  
    imagenSigno: string = '';
  
    constructor(private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        nombre: ['', Validators.required],
        Apaterno: ['', Validators.required],
        Amaterno: ['', Validators.required],
        dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
        mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        año: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
        sexo: ['', Validators.required]
      });
    }
  
/*     onSubmit() {
        console.log('Formulario enviado');
        if (this.formGroup.valid) {
      if (this.formGroup.valid) {
        const { nombre, Apaterno, Amaterno, dia, mes, año, sexo } = this.formGroup.value;
        this.nombreCompleto = `${nombre} ${Apaterno} ${Amaterno}`;
        this.edad = new Date().getFullYear() - año;
        this.signoZodiacal = this.calcZodiaco(año);
        this.imagenSigno = this.obtSigno(this.signoZodiacal);
      }
    }
  } */
    onSubmit() {
      if (this.formGroup.valid) {
        const { nombre, Apaterno, Amaterno, dia, mes, año, sexo } = this.formGroup.value;
        this.nombreCompleto = `${nombre} ${Apaterno} ${Amaterno}`;
        this.edad = new Date().getFullYear() - año;
        this.signoZodiacal = this.calcZodiaco(año);
        this.imagenSigno = this.obtSigno(this.signoZodiacal);
        console.log('Nombre completo:', this.nombreCompleto);
        console.log('Edad:', this.edad);
        console.log('Signo zodiacal:', this.signoZodiacal);
        console.log('Imagen del signo:', this.imagenSigno);
      } else {
        console.log('Formulario inválido:', this.formGroup.errors);
      }
    }

    calcZodiaco(año: number): 'Rata' | 'Buey' | 'Tigre' | 'Conejo' | 'Dragón' | 'Serpiente' | 'Caballo' | 'Cabra' | 'Mono' | 'Gallo' | 'Perro' | 'Cerdo' {
      const animales = [
        'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón',
        'Serpiente', 'Caballo', 'Cabra', 'Mono',
        'Gallo', 'Perro', 'Cerdo'
      ];

      const indiceAnimal = (año - 1900) % 12;
      return animales[indiceAnimal] as 'Rata' | 'Buey' | 'Tigre' | 'Conejo' | 'Dragón' | 'Serpiente' | 'Caballo' | 'Cabra' | 'Mono' | 'Gallo' | 'Perro' | 'Cerdo';
    }

    mostrarImagen(): void {
      this.muestraImg = !this.muestraImg;
    }
  
    obtSigno(signo: 'Rata' | 'Buey' | 'Tigre' | 'Conejo' | 'Dragón' | 'Serpiente' | 'Caballo' | 'Cabra' | 'Mono' | 'Gallo' | 'Perro' | 'Cerdo'): string {
      const imagenes = {
        'Rata': 'https://www.clarin.com/img/westernastrology/rata.svg',
        'Buey': 'https://www.clarin.com/img/westernastrology/bufalo.svg',
        'Tigre': 'https://www.clarin.com/img/westernastrology/tigre.svg',
        'Conejo': 'https://www.clarin.com/img/westernastrology/conejo.svg',
        'Dragón': 'https://www.clarin.com/img/westernastrology/dragon.svg',
        'Serpiente': 'https://www.clarin.com/img/westernastrology/serpiente.svg',
        'Caballo': 'https://www.clarin.com/img/westernastrology/caballo.svg',
        'Cabra': 'https://www.clarin.com/img/westernastrology/cabra.svg',
        'Mono': 'https://www.clarin.com/img/westernastrology/mono.svg',
        'Gallo': 'https://www.clarin.com/img/westernastrology/gallo.svg',
        'Perro': 'https://www.clarin.com/img/westernastrology/perro.svg',
        'Cerdo': 'https://www.clarin.com/img/westernastrology/chancho.svg'
      };
  
      return imagenes[signo] || '';
    }
  }
  
