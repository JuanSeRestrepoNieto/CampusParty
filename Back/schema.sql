-- Create schema
CREATE SCHEMA campus_party;

-- Authentication and Users
CREATE TABLE campus_party.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'staff', 'campusero')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE campus_party.refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES campus_party.users(id) ON DELETE CASCADE
);

-- Campuseros
CREATE TABLE campus_party.campusero (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    ciudad_origen_id INTEGER,
    carpa_id INTEGER,
    pabellon_id INTEGER,
    vehiculo_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES campus_party.users(id) ON DELETE CASCADE
);

-- Pabellones y Carpas
CREATE TABLE campus_party.pabellon (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tematica VARCHAR(100),
    area DECIMAL(10,2),
    ubicacion VARCHAR(255),
    capacidad INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campus_party.carpa (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    pabellon_id INTEGER NOT NULL,
    capacidad INTEGER,
    estado VARCHAR(20) CHECK (estado IN ('disponible', 'ocupado', 'mantenimiento')) DEFAULT 'disponible',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pabellon_id) REFERENCES campus_party.pabellon(id) ON DELETE CASCADE
);

-- Equipos y Software
CREATE TABLE campus_party.equipo_pc (
    id SERIAL PRIMARY KEY,
    campusero_id INTEGER,
    serial VARCHAR(50) UNIQUE,
    capacidad_ram INTEGER,
    capacidad_disco_duro INTEGER,
    procesador VARCHAR(100),
    tarjeta_grafica VARCHAR(100),
    estado VARCHAR(20) CHECK (estado IN ('funcional', 'reparacion', 'inactivo')) DEFAULT 'funcional',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campusero_id) REFERENCES campus_party.campusero(id) ON DELETE SET NULL
);

CREATE TABLE campus_party.software (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('Videojuego', 'Software Educativo', 'Herramienta')),
    version VARCHAR(20),
    requisitos_sistema TEXT,
    licencia VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campus_party.equipo_software (
    id SERIAL PRIMARY KEY,
    equipo_id INTEGER NOT NULL,
    software_id INTEGER NOT NULL,
    instalado_el TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('instalado', 'pendiente', 'error')) DEFAULT 'pendiente',
    UNIQUE (equipo_id, software_id),
    FOREIGN KEY (equipo_id) REFERENCES campus_party.equipo_pc(id) ON DELETE CASCADE,
    FOREIGN KEY (software_id) REFERENCES campus_party.software(id) ON DELETE CASCADE
);

-- Vehículos y Alojamiento
CREATE TABLE campus_party.vehiculo (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) CHECK (tipo IN ('Carro', 'Moto', 'Bicicleta')),
    placa VARCHAR(20) UNIQUE,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    año INTEGER,
    estado VARCHAR(20) CHECK (estado IN ('vigente', 'caducado', 'suspendido')) DEFAULT 'vigente',
    campusero_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campusero_id) REFERENCES campus_party.campusero(id) ON DELETE SET NULL
);

CREATE TABLE campus_party.hotel (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tarifa_especial DECIMAL(10,2),
    ubicacion VARCHAR(255),
    capacidad INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campus_party.alojamiento (
    id SERIAL PRIMARY KEY,
    campusero_id INTEGER NOT NULL,
    hotel_id INTEGER,
    tipo VARCHAR(20) CHECK (tipo IN ('hotel', 'carpa')),
    check_in TIMESTAMP WITH TIME ZONE,
    check_out TIMESTAMP WITH TIME ZONE,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'confirmado', 'cancelado')) DEFAULT 'pendiente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campusero_id) REFERENCES campus_party.campusero(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES campus_party.hotel(id) ON DELETE SET NULL
);

-- Indexes for better performance
CREATE INDEX idx_campusero_user_id ON campus_party.campusero(user_id);
CREATE INDEX idx_carpa_pabellon_id ON campus_party.carpa(pabellon_id);
CREATE INDEX idx_equipo_campusero_id ON campus_party.equipo_pc(campusero_id);
CREATE INDEX idx_vehiculo_campusero_id ON campus_party.vehiculo(campusero_id);
CREATE INDEX idx_alojamiento_campusero_id ON campus_party.alojamiento(campusero_id);

-- Constraints
ALTER TABLE campus_party.campusero
    ADD CONSTRAINT fk_campusero_ciudad_origen
    FOREIGN KEY (ciudad_origen_id) REFERENCES campus_party.ciudad(id) ON DELETE SET NULL,
    ADD CONSTRAINT fk_campusero_carpa
    FOREIGN KEY (carpa_id) REFERENCES campus_party.carpa(id) ON DELETE SET NULL,
    ADD CONSTRAINT fk_campusero_pabellon
    FOREIGN KEY (pabellon_id) REFERENCES campus_party.pabellon(id) ON DELETE SET NULL,
    ADD CONSTRAINT fk_campusero_vehiculo
    FOREIGN KEY (vehiculo_id) REFERENCES campus_party.vehiculo(id) ON DELETE SET NULL;

-- Insert default admin user
INSERT INTO campus_party.users (username, password_hash, email, role)
VALUES ('admin', '$2b$12$your.encrypted.password.here', 'admin@campusparty.com', 'admin');
