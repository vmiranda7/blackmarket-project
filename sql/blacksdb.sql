drop database if exists blacksdb;
create database blacksdb;
 
use blacksdb;
 
create table users (
username	varchar(20) not null primary key ,
password	char(100) not null,
nombre	    varchar(50) not null,
email	varchar(50) not null
);

create table user_roles (
username	varchar(20) not null,
rolename    varchar(20) not null,
foreign key(username) references users(username) on delete cascade,
primary key (username, rolename)
);

create table asignaturas(
id_asignatura int not null auto_increment primary key,
nombre varchar(20) not null,
curso varchar (5) not null
);

/*
create table matriculas(
id_asignatura_matriculas int not null auto_increment primary key,
nombre varchar(20) not null
);*/


create table users_asignaturas(
username_asignaturas varchar(20) not null,
id_asignatura  int not null,
foreign key (username_asignaturas)  references users(username) on delete cascade,
foreign key (id_asignatura)  references asignaturas(id_asignatura)  on delete cascade
);

create table users_matriculas(
username_matriculas varchar(20) not null,
id_asignatura_u_matriculas int not null,
foreign key(username_matriculas) references users(username) on delete cascade,
foreign key (id_asignatura_u_matriculas) references  asignaturas(id_asignatura)  on delete cascade
);

/*
create table carpetas(
id_asignatura varchar(20) not null,
id_carpeta int  not null auto_increment primary key,
nombre varchar(20) not null,
foreign key (id_asignatura) references asignaturas(id_asignatura) on delete cascade
);*/

/*
 * Id_tipo (1= Teoria, 2= Ejercicios, 3= Examenes)
 */

create table contenidos (
id_contenido varchar(50)not null  primary key,
id_asignatura int not null,
/*id_carpeta int  not null,*/
id_tipo int not null,
titulo varchar(30) not null,
descripcion varchar(100),
fecha timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
autor varchar (50) not null,
/*link varchar (200) not null,*/
invalid int,
creation_timestamp	datetime not null default current_timestamp,
/*foreign key (id_carpeta) references carpetas(id_carpeta) on delete cascade,*/
foreign key (id_asignatura) references asignaturas(id_asignatura) on delete cascade,
foreign key (autor) references users (username) on delete cascade
);


create table comentarios (
id_comentario int  not null auto_increment primary key,
autor varchar(20) not null,
id_contenido varchar(50) not null,
comentario varchar (100) not null,
foreign key (id_contenido) references contenidos(id_contenido) on delete cascade,
foreign key (autor) references users(username) on delete cascade
);