# ClientePT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

ng g c pages/tipoDocumento/dialogo --skipTests --module=app.module

--------------
DROP TABLE entidad;
DROP TABLE tipo_documento;
DROP TABLE tipo_contribuyente;
DROP TABLE usuario;
--------------
CREATE TABLE tipo_documento(
	id_tipo_documento SERIAL PRIMARY KEY,
	codigo 			  VARCHAR(20),
	nombre			  VARCHAR(100),
	descripcion		  VARCHAR(255),
	estado			  BIT DEFAULT '1'
);
CREATE TABLE  tipo_contribuyente(
	id_tipo_contribuyente SERIAL PRIMARY KEY,
	nombre			  	  VARCHAR(100),
	estado			      BIT DEFAULT '1'
);

CREATE TABLE  entidad(
	id_entidad 				SERIAL PRIMARY KEY,
	id_tipo_documento		INT,
	nro_documento			CHARACTER VARYING(100),
	razon_social 			CHARACTER VARYING(100),
	nombre_comercial 		CHARACTER VARYING(100),
	id_tipo_contribuyente	INT,
	direccion 				CHARACTER VARYING(100),
	telefono 				CHARACTER VARYING(50),
	estado					BIT DEFAULT '1',
	FOREIGN KEY (id_tipo_documento) REFERENCES tipo_documento(id_tipo_documento),
	FOREIGN KEY (id_tipo_contribuyente) REFERENCES tipo_contribuyente(id_tipo_contribuyente)
);
CREATE TABLE usuario(
	id_usuario 			SERIAL PRIMARY KEY,
	nombre				CHARACTER VARYING(255),
	clave 				CHARACTER VARYING(255),
	estado				BIT DEFAULT '1'
	
);
------------------
-- LLENAR CAMPOR tipo_documento
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo01','documeto_tipo01', 'descripcion_01');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo02','documeto_tipo02', 'descripcion_02');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo03','documeto_tipo03', 'descripcion_03');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo04','documeto_tipo04', 'descripcion_04');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo05','documeto_tipo05', 'descripcion_05');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo06','documeto_tipo06', 'descripcion_06');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo07','documeto_tipo07', 'descripcion_07');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo08','documeto_tipo08', 'descripcion_08');
INSERT INTO tipo_documento(codigo, nombre, descripcion)
	 VALUES ('codigo09','documeto_tipo09', 'descripcion_09');

-- LLENAR CAMPOR tipo_contribuyente
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_01');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_02');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_03');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_04');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_05');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_06');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_07');
INSERT INTO tipo_contribuyente( nombre)
	 VALUES ('contribuyente_08');

select * from tipo_documento;
-- LLENAR CAMPOS DE LA TABLA entidad
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('1','nro_01', 'razon_social_01',
	 		 'nombre_com_01','1','direccion_01',
			 'telefono_01');
			 
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('1','nro_02', 'razon_social_02',
	 		 'nombre_com_02','1','direccion_02',
			 'telefono_01');
			 
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('2','nro_03', 'razon_social_03',
	 		 'nombre_com_03','2','direccion_03',
			 'telefono_01');
			 
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('2','nro_04', 'razon_social_04',
	 		 'nombre_com_04','2','direccion_04',
			 'telefono_01');
			 
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('3','nro_05', 'razon_social_05',
	 		 'nombre_com_05','3','direccion_05',
			 'telefono_01');
			 
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('3','nro_06', 'razon_social_06',
	 		 'nombre_com_06','3','direccion_06',
			 'telefono_01');
			 
INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('4','nro_07', 'razon_social_07',
	 		 'nombre_com_07','4','direccion_07',
			 'telefono_01');

INSERT INTO entidad(    id_tipo_documento, nro_documento, razon_social,
						nombre_comercial, id_tipo_contribuyente,direccion,
						 telefono)
	 VALUES ('4','nro_08', 'razon_social_08',
	 		 'nombre_com_08','4','direccion_08',
			 'telefono_01');


-- CREAR USUARIOS PARA EL LOGIN
-- usuario: edgar432910@hotmail.com 
-- constrasena: 1234

INSERT INTO usuario(nombre, clave,estado)
	 VALUES ('edgar432910@hotmail.com', '$2a$12$yc6rQwY5SB0If1hfAOdmVuKrKxw9VEnMaMfo6ltcmOV.E0l5tDn7K','1');
-- usuario: edgar432910@hotmail.com, contrasena: 1234
INSERT INTO usuario(nombre, clave,estado)
	 VALUES ('admin@admin.com', '$2a$12$yc6rQwY5SB0If1hfAOdmVuKrKxw9VEnMaMfo6ltcmOV.E0l5tDn7K','1');
	 

	 