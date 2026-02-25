CREATE TABLE IF NOT EXISTS spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    hours TEXT NOT NULL,
    phone TEXT NOT NULL,
    rating FLOAT NOT NULL,
    tags TEXT NOT NULL,
    pictures TEXT NOT NULL
);

CREATE VIRTUAL TABLE IF NOT EXISTS spots_fts USING fts5(
    name,
    description,
    address,
    tags
);

CREATE TRIGGER IF NOT EXISTS spots_ai AFTER INSERT ON spots BEGIN
    INSERT INTO spots_fts(rowid, name, description, address, tags)
    VALUES (new.id, new.name, new.description, new.address, new.tags);
END;
CREATE TRIGGER IF NOT EXISTS spots_ad AFTER DELETE ON spots BEGIN
    DELETE FROM spots_fts WHERE rowid = old.id;
END;
CREATE TRIGGER IF NOT EXISTS spots_au AFTER UPDATE ON spots BEGIN
    DELETE FROM spots_fts WHERE rowid = old.id;
    INSERT INTO spots_fts(rowid, name, description, address, tags)
    VALUES (new.id, new.name, new.description, new.address, new.tags);
END;