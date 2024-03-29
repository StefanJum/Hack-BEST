-- CREATE TABLE IF NOT EXISTS clienti (
    -- id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    -- nume VARCHAR NOT NULL,
    -- email VARCHAR NOT NULL,
    -- parola VARCHAR NOT NULL,
    -- numarTelefon VARCHAR
-- );

-- CREATE TABLE IF NOT EXISTS utilaje (
    -- id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    -- idClient INT NOT NULL,
    -- tip VARCHAR NOT NULL,
    -- descriere VARCHAR NOT NULL,
    -- pret VARCHAR NOT NULL,
    -- valabil boolean,
    -- perioadaInceput timestamp,
    -- perioadaFinal timestamp,
    -- CONSTRAINT dk_utilaje_clienti FOREIGN KEY (idClient) REFERENCES clienti(id)
-- );

-- CREATE TABLE IF NOT EXISTS oferte (
    -- id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    -- idClient INT NOT NULL,
    -- idUtilaj INT NOT NULL,
    -- acceptata boolean,
    -- perioadaInceputOferta timestamp,
    -- perioadaFinalOferta timestamp,
    -- CONSTRAINT dk_oferte_clienti FOREIGN KEY (idClient) REFERENCES clienti(id),
    -- CONSTRAINT dk_oferte_utilaje FOREIGN KEY (idUtilaj) REFERENCES utilaje(id)
-- );

CREATE TABLE IF NOT EXISTS clienti (
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nume VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    parola VARCHAR NOT NULL,
    numarTelefon VARCHAR,
    nrPuncte INT
);

CREATE TABLE IF NOT EXISTS recompense (
	id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
	idClient INT NOT NULL,
	recompensa VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS pet (
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    idClient INT NOT NULL,
    tip VARCHAR NOT NULL,
    descriere VARCHAR NOT NULL,
    puncte VARCHAR,
    valabil boolean,
    perioadaInceput timestamp,
    CONSTRAINT dk_utilaje_clienti FOREIGN KEY (idClient) REFERENCES clienti(id)
);

CREATE TABLE IF NOT EXISTS oferte (
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    idClient INT NOT NULL,
    idPet INT NOT NULL,
    idHero INT,
    solved boolean,
    perioadaInceputOferta VARCHAR,
    CONSTRAINT dk_oferte_clienti FOREIGN KEY (idClient) REFERENCES clienti(id),
    CONSTRAINT dk_oferte_utilaje FOREIGN KEY (idPet) REFERENCES pet(id)
);
