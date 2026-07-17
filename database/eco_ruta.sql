-- ============================================================================
-- EcoRuta BAQ - Esquema de base de datos PostgreSQL
-- ============================================================================
-- Funciona igual en un PostgreSQL local que en Supabase (Supabase = Postgres).
-- Para usarlo en Supabase: pega este archivo completo en el "SQL Editor"
-- del proyecto y ejecútalo una sola vez.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- para gen_random_uuid()

-- ----------------------------------------------------------------------------
-- USERS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name           VARCHAR(120)  NOT NULL,
    email          VARCHAR(160)  NOT NULL UNIQUE,
    password_hash  VARCHAR(255)  NOT NULL,
    location       VARCHAR(80),
    role           VARCHAR(20)   NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- SPOTS (Puntos de recolección / acopio)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS spots (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    locality     VARCHAR(80)   NOT NULL,
    name         VARCHAR(160)  NOT NULL,
    address      VARCHAR(200),
    lat          DOUBLE PRECISION NOT NULL,
    lng          DOUBLE PRECISION NOT NULL,
    materials    TEXT[]        NOT NULL DEFAULT '{}',
    description  TEXT,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- GUIDE (Guía educativa de reciclaje por categoría de material)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS guide_items (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category          VARCHAR(80)  NOT NULL UNIQUE,
    unit              VARCHAR(20)  NOT NULL DEFAULT 'Kg',
    points_per_unit   INTEGER      NOT NULL,
    summary           TEXT,
    instructions      TEXT[]       NOT NULL DEFAULT '{}',
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- REPORTS (Entregas / reportes de reciclaje registrados por los usuarios)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    spot_id          UUID REFERENCES spots(id) ON DELETE SET NULL,
    category         VARCHAR(80) NOT NULL,
    quantity         NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
    unit             VARCHAR(20) NOT NULL DEFAULT 'Kg',
    points           INTEGER NOT NULL DEFAULT 0,
    evidence_url     VARCHAR(255),
    status           VARCHAR(20) NOT NULL DEFAULT 'pendiente'
                       CHECK (status IN ('pendiente', 'validado', 'rechazado')),
    rejection_reason TEXT,
    validated_by     UUID REFERENCES users(id),
    validated_at     TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- ============================================================================
-- SEEDS
-- ============================================================================

-- Guía de reciclaje (categorías y puntos por Kg)
INSERT INTO guide_items (category, unit, points_per_unit, summary, instructions) VALUES
('Plástico', 'Kg', 20, 'Botellas PET, envases PEAD limpios y secos.',
    ARRAY[
        'Enjuaga los envases para retirar residuos de comida o líquidos.',
        'Retira tapas y etiquetas si es posible, y aplástalos para ahorrar espacio.',
        'No mezcles plásticos con residuos orgánicos ni aceite.'
    ]),
('Cartón y Papel', 'Kg', 15, 'Cajas, periódico y papel de archivo.',
    ARRAY[
        'Mantén el cartón seco; el cartón mojado no se recicla.',
        'Desarma las cajas para que ocupen menos volumen.',
        'Retira cinta adhesiva, grapas y restos de icopor.'
    ]),
('Vidrio', 'Kg', 10, 'Botellas y frascos de vidrio.',
    ARRAY[
        'Enjuaga los envases y retira tapas metálicas o plásticas.',
        'Envuélvelos si están rotos para evitar accidentes al transportarlos.',
        'No incluyas vidrio de ventanas ni espejos.'
    ]),
('Pilas / Baterías', 'Kg', 50, 'Pilas alcalinas, botón y baterías recargables.',
    ARRAY[
        'Nunca las deseches con la basura común; son residuos peligrosos.',
        'Guárdalas en un recipiente cerrado hasta llevarlas a un punto autorizado.',
        'Cubre los polos con cinta si están dañadas.'
    ]),
('Electrónicos (RAEE)', 'Kg', 120, 'Celulares, cables, cargadores y pequeños electrodomésticos.',
    ARRAY[
        'Borra tu información personal de los dispositivos antes de entregarlos.',
        'Retira las baterías si es posible y entrégalas por separado.',
        'No los desarmes; entrégalos completos al punto de acopio.'
    ]),
('Aceite Usado', 'Kg', 80, 'Aceite de cocina usado.',
    ARRAY[
        'Deja enfriar el aceite antes de manipularlo.',
        'Guárdalo en una botella plástica bien cerrada, nunca lo viertas al desagüe.',
        'Entrégalo en los puntos habilitados para residuos líquidos.'
    ])
ON CONFLICT (category) DO NOTHING;

-- Puntos de acopio (las 5 localidades de Barranquilla)
INSERT INTO spots (locality, name, address, lat, lng, materials, description) VALUES
('Riomar', 'Centro de Acopio Buenavista', 'Cerca al C.C. Buenavista', 11.0142, -74.8115,
    ARRAY['Plástico (PET/PEAD)', 'Vidrio', 'Cartón'],
    'Recibe: Plásticos (PET/PEAD), Vidrio y Cartón.'),
('Norte-Centro Histórico', 'Punto Verde Parque Venezuela', 'Parque Venezuela', 11.0068, -74.8150,
    ARRAY['Pilas / Baterías', 'Aceite Usado', 'Electrónicos (RAEE)'],
    'Recibe: Pilas, Baterías, Aceite de Cocina Usado y RAEE.'),
('Suroeste', 'EcoPunto Parque Sagrado Corazón', 'Parque Sagrado Corazón', 10.9855, -74.7888,
    ARRAY['Cartón y Papel', 'Plástico'],
    'Recibe: Cartón, Papel de archivo y Plásticos.'),
('Suroriente', 'Estación de Reciclaje Simón Bolívar', 'Sector Canchas Simón Bolívar', 10.9520, -74.7750,
    ARRAY['Vidrio'],
    'Recibe: Envases metálicos, Aluminio y Vidrio.'),
('Metropolitana', 'EcoPunto Metropolitano', 'Cerca al Estadio Metropolitano', 10.9380, -74.8020,
    ARRAY['Plástico', 'Cartón y Papel', 'Vidrio', 'Pilas / Baterías', 'Aceite Usado', 'Electrónicos (RAEE)'],
    'Recibe: Todo tipo de materiales aprovechables.');

-- Usuario administrador de prueba
-- Email: admin@ecorutabaq.com | Password: Admin1234
-- (hash generado con bcryptjs, 10 salt rounds)
INSERT INTO users (name, email, password_hash, location, role) VALUES
('Administrador EcoRuta', 'admin@ecorutabaq.com', '$2a$10$lWlg6Jvj381VPsiyJuV4puPfuGjUv08Nti6nK1wSikLDZY4982uAa', 'Metropolitana', 'admin')
ON CONFLICT (email) DO NOTHING;
