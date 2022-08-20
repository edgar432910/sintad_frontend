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

-----
DROP TABLE entidad;
DROP TABLE tipo_documento;
DROP TABLE tipo_contribuyente;
DROP TABLE usuario;
-------
CREATE TABLE tipo_documento(
	id_tipo_documento SERIAL PRIMARY KEY,
	codigo 			  CHARACTER VARYING(20) NOT NULL,
	nombre			  CHARACTER VARYING(100) NOT NULL,
	descripcion		  CHARACTER VARYING(200) DEFAULT NULL,
	estado			  BOOLEAN NOT NULL  DEFAULT '1'
);
CREATE TABLE  tipo_contribuyente(
	id_tipo_contribuyente SERIAL PRIMARY KEY,
	nombre			  	  VARCHAR(50) NOT NULL,
	estado			      BOOLEAN NOT NULL DEFAULT '1'
);

CREATE TABLE  entidad(
	id_entidad 				SERIAL PRIMARY KEY,
	id_tipo_documento		INT NOT NULL,
	nro_documento			CHARACTER VARYING(25) NOT NULL,
	razon_social 			CHARACTER VARYING(100) NOT NULL,
	nombre_comercial 		CHARACTER VARYING(100) DEFAULT NULL ,
	id_tipo_contribuyente	INT DEFAULT NULL,
	direccion 				CHARACTER VARYING(250) NULL,
	telefono 				CHARACTER VARYING(50) NULL,
	estado					BOOLEAN DEFAULT '1',
	FOREIGN KEY (id_tipo_documento) REFERENCES tipo_documento(id_tipo_documento),
	FOREIGN KEY (id_tipo_contribuyente) REFERENCES tipo_contribuyente(id_tipo_contribuyente)
);
CREATE TABLE usuario(
	id_usuario 			SERIAL PRIMARY KEY,
	nombre				CHARACTER VARYING(255),
	clave 				CHARACTER VARYING(255),
	estado				BOOLEAN DEFAULT '1'
	
);
-----


INSERT INTO tipo_contribuyente VALUES ('1', 'Natural Sin Negocio', '1');
INSERT INTO tipo_contribuyente VALUES ('2', 'Juridica', '1');
INSERT INTO tipo_contribuyente VALUES ('3', 'Natural Con Negocio', '1');
INSERT INTO tipo_contribuyente VALUES ('4', 'No Domiciliado', '1');

INSERT INTO tipo_documento VALUES ('1', '4', 'CARNET DE EXTRANJERIA', 'CARNET DE EXTRANJERIA', '1');
INSERT INTO tipo_documento VALUES ('2', '7', 'PASAPORTE', 'PASAPORTE', '1');
INSERT INTO tipo_documento VALUES ('3', '11', 'PARTIDA DE NACIMIENTO - IDENTIDAD', 'PARTIDA DE NACIMIENTO - IDENTIDAD', '1');
INSERT INTO tipo_documento VALUES ('4', '99', 'OTROS', 'OTROS', '1');
INSERT INTO tipo_documento VALUES ('5', '6', 'RUC', 'REGISTRO UNICO DEL CONTRIBUYENTE', '1');
INSERT INTO tipo_documento VALUES ('6', '1', 'DNI', 'DOCUMENTO NACIONAL DE IDENTIDAD', '1');


-- ----------------------------

INSERT INTO entidad  VALUES ('1', '3', '20505327552', 'SYL S.A.C', 'SYL CARGO NOMBRE COMERCIAL', '1', 'Jr. Comandante Jimenez Nro. 166 Int. a (entre Cuadra 7 y 8 Javier Padro Oeste)', '79845612', '1');
INSERT INTO entidad VALUES ('2', '3', '20543844838', 'PUNTUAL EXPRESS S.A.C.', '', '1', 'MZA. F LOTE. 29 AS.RSD.MONTECARLO II LIMA - LIMA - SAN MARTIN DE PORRE', '', '1');
INSERT INTO entidad VALUES ('3', '3', '10410192999', 'ALVAREZ MACHUCA RENZO GUSTAVO', '', '3', 'AV. LOS ALISOS MZA. G LOTE. 05 ASC. LA ALBORADA DE OQUENDO III ETAPA (CRUCE PTE OQUENDO CON AV.NESTOR GAMBETTA) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO', '', '1');
INSERT INTO entidad VALUES ('4', '3', '20600131037', 'CARNICOS MAFER S.A.C.', '', '2', 'CAL.EL UNIVERSO NRO. 327 URB. LA CAMPIÑA ZONA CINCO (ALTURA ', '', '1');
INSERT INTO entidad VALUES ('5', '3', '20556528218', 'SUMAQUINARIA S.A.C.', '', '2', 'AV. M.SUCRE NRO. 455 DPTO. 603 LIMA - LIMA - MAGDALENA DEL MAR', '', '1');
INSERT INTO entidad VALUES ('6', '3', '20545412528', 'OASIS FOODS S.A.C.', '', '2', 'CAL. FRANCISCO MASIAS NRO. 370 URB. SAN EUGENIO (PISO 7) LIM', '', '1');
INSERT INTO entidad VALUES ('7', '3', '20510620195', 'INVERSIONES PRO3 SAC', '', '2', 'AV. AUTOPIDTA RAMIRO PRIALE LOTE. 02 A.V. PROP HUERTOS DE HU', '', '1');
INSERT INTO entidad VALUES ('8', '3', '20498383361', 'REPUESTOS DAVID DIESEL E.I.R.L.', '', '2', 'CAR.VIA EVITAMIENTO MZA. 857 LOTE. 7 SEC. IRRIGACION EL CURAL 1 AREQUIPA - AREQUIPA - CERRO COLORADO', '', '1');
INSERT INTO entidad VALUES ('9', '6', 'CNAH00003', 'ANHUI HAYVO PROTECTIVE PRODUCT MANUFACTURING CO.,LTD', '', '4', '173 FENGLE AVENUE,ECNOMIC DEVELOPMENT ZONE,QUANJIAO COUNTY', '', '1');

------------------

-- CREAR USUARIOS PARA EL LOGIN
-- usuario: edgar432910@hotmail.com 
-- constrasena: 1234

INSERT INTO usuario(nombre, clave,estado)
	 VALUES ('edgar432910@hotmail.com', '$2a$12$yc6rQwY5SB0If1hfAOdmVuKrKxw9VEnMaMfo6ltcmOV.E0l5tDn7K','1');
-- usuario: edgar432910@hotmail.com, contrasena: 1234
INSERT INTO usuario(nombre, clave,estado)
	 VALUES ('admin@admin.com', '$2a$12$yc6rQwY5SB0If1hfAOdmVuKrKxw9VEnMaMfo6ltcmOV.E0l5tDn7K','1');
-----