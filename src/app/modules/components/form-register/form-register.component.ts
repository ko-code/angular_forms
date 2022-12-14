import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  
  
  registerForm!: FormGroup;
  submited = false;

  constructor(private fb: FormBuilder){
    this.myForm();
  }
  ngOnInit(): void {
    
  }
  myForm(){
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.pattern('^[a-zA-Z]+$'), Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      pLastName: ['', Validators.compose([Validators.pattern('^[a-zA-Z]+$'), Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      mLastName: ['', Validators.compose([Validators.pattern('^[a-zA-Z]+$'), Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      fBorn: ['', Validators.required ],
      pEmail: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      // pEmail: ['', Validators.email],
      // cPhone: ['', Validators.compose([Validators.pattern('^(+56[-]*(9)[0-9][-]*){8}+$'), Validators.required])],
      cPhone: ['', Validators.required ],
      landLine:['', Validators.required ],
      street: ['', Validators.compose([Validators.pattern('^[a-zA-Z]+$'), Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      eNumber: [null, Validators.required],
      iNumber: [null, Validators.required],
      region: ['', Validators.required],
      commune: ['', Validators.required],
      postal: ['', Validators.required],
      isCheked: [false, Validators.requiredTrue]
    });
    
  }

  form_validation_message = {
    name: [
      {type: 'required', message: 'Nombre es requerido'},
      {type: 'minlength', message: 'el nombre debe contener minimo 3 caracteres'},
      {type: 'maxlength', message: 'el nombre debe contener maximo 15 caracteres'},
      {type: 'pattern', message: 'tu nombre solo debe contener letras'}
    ],
    pLastName: [
      {type: 'required', message: 'El apellido paterno es requerido'},
      {type: 'minlength', message: 'El apellido paterno debe contener minimo 3 caracteres'},
      {type: 'maxlength', message: 'El apellido paterno debe contener maximo 15 caracteres'},
      {type: 'pattern', message: 'Tu apellido paterno solo debe contener letras'}
    ],
    mLastName: [
      {type: 'required', message: 'El apellido materno es requerido'},
      {type: 'minlength', message: 'El apellido materno nombre debe contener minimo 3 caracteres'},
      {type: 'maxlength', message: 'El apellido materno nombre debe contener maximo 15 caracteres'},
      {type: 'pattern', message: 'Tu apellido materno solo debe contener letras'}
    ],
    pEmail: [
      {type: 'required', message: 'el email es requerido'},
      {type: 'pattern', message: 'ingresa un email valido'}
    ],
    street: [
      {type: 'required', message: 'El nombre de la calle es requerido'},
      {type: 'minlength', message: 'El nombre de la calle contener minimo 3 caracteres'},
      {type: 'maxlength', message: 'El nombre de la calle debe contener maximo 15 caracteres'},
      {type: 'pattern', message: 'Solo se aceptan letras'}
    ],
  }
  
  
  regionalizacion = {
   
    "regiones": [
        {
            "region": "Arica y Parinacota",
            "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
        },
        {
            "region": "Tarapac??",
            "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Cami??a", "Colchane", "Huara", "Pica"]
        },
        {
            "region": "Antofagasta",
            "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollag??e", "San Pedro de Atacama", "Tocopilla", "Mar??a Elena"]
        },
        {
            "region": "Atacama",
            "comunas": ["Copiap??", "Caldera", "Tierra Amarilla", "Cha??aral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
        },
        {
            "region": "Coquimbo",
            "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicu??a", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbal??", "Monte Patria", "Punitaqui", "R??o Hurtado"]
        },
        {
            "region": "Valpara??so",
            "comunas": ["Valpara??so", "Casablanca", "Conc??n", "Juan Fern??ndez", "Puchuncav??", "Quintero", "Vi??a del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa Mar??a", "Quilpu??", "Limache", "Olmu??", "Villa Alemana"]
        },
        {
            "region": "Regi??n del Libertador Gral. Bernardo O???Higgins",
            "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Do??ihue", "Graneros", "Las Cabras", "Machal??", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requ??noa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Ch??pica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
        },
        {
            "region": "Regi??n del Maule",
            "comunas": ["Talca", "Constituci??n", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "R??o Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curic??", "Huala????", "Licant??n", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuqu??n", "Linares", "Colb??n", "Longav??", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
        },
        {
            "region": "Regi??n de ??uble",
            "comunas": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "R??nquil", "Treguaco", "Bulnes", "Chill??n Viejo", "Chill??n", "El Carmen", "Pemuco", "Pinto", "Quill??n", "San Ignacio", "Yungay", "Coihueco", "??iqu??n", "San Carlos", "San Fabi??n", "San Nicol??s"]
        },
        {
            "region": "Regi??n del Biob??o",
            "comunas": ["Concepci??n", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tom??", "Hualp??n", "Lebu", "Arauco", "Ca??ete", "Contulmo", "Curanilahue", "Los ??lamos", "Tir??a", "Los ??ngeles", "Antuco", "Cabrero", "Laja", "Mulch??n", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa B??rbara", "Tucapel", "Yumbel", "Alto Biob??o"]
        },
        {
            "region": "Regi??n de la Araucan??a",
            "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufqu??n", "Puc??n", "Saavedra", "Teodoro Schmidt", "Tolt??n", "Vilc??n", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacaut??n", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Pur??n", "Renaico", "Traigu??n", "Victoria"]
        },
        {
            "region": "Regi??n de Los R??os",
            "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "M??fil", "Mariquina", "Paillaco", "Panguipulli", "La Uni??n", "Futrono", "Lago Ranco", "R??o Bueno"]
        },
        {
            "region": "Regi??n de Los Lagos",
            "comunas": ["Puerto Montt", "Calbuco", "Cocham??", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maull??n", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de V??lez", "Dalcahue", "Puqueld??n", "Queil??n", "Quell??n", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "R??o Negro", "San Juan de la Costa", "San Pablo", "Chait??n", "Futaleuf??", "Hualaihu??", "Palena"]
        },
        {
            "region": "Regi??n Ais??n del Gral. Carlos Ib????ez del Campo",
            "comunas": ["Coihaique", "Lago Verde", "Ais??n", "Cisnes", "Guaitecas", "Cochrane", "O???Higgins", "Tortel", "Chile Chico", "R??o Ib????ez"]
        },
        {
            "region": "Regi??n de Magallanes y de la Ant??rtica Chilena",
            "comunas": ["Punta Arenas", "Laguna Blanca", "R??o Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Ant??rtica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
        },
        {
            "region": "Regi??n Metropolitana de Santiago",
            "comunas": ["Cerrillos", "Cerro Navia", "Conchal??", "El Bosque", "Estaci??n Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maip??", "??u??oa", "Pedro Aguirre Cerda", "Pe??alol??n", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaqu??n", "San Miguel", "San Ram??n", "Vitacura", "Puente Alto", "Pirque", "San Jos?? de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhu??", "Curacav??", "Mar??a Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Pe??aflor"]
         }
    ]
}
changed(e:any){
  console.log(e.target.value)
  return e.target.data;
}

//
  onSubmit(){
    this.submited =true;
    if(this.registerForm.valid){
      alert('??nvio exitoso');
      return console.table(this.registerForm.value);
      
    }
  }
}
