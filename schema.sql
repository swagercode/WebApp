CREATE TABLE spots (
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

CREATE VIRTUAL TABLE spots_fts USING fts5(
    name,
    description,
    address,
    tags,
    content
)

CREATE TRIGGER spots_ai AFTER INSERT ON spots BEGIN
    INSERT INTO spots_fts(rowid, name, description, address, tags)
    VALUES (new.id, new.name, new.description, new.address, new.tags);
END;
CREATE TRIGGER spots_ad AFTER DELETE ON spots BEGIN
    INSERT INTO spots_fts(rowid, name, description, address, tags)
    VALUES ('delete', old.id, old.name, old.description, old.address, old.tags);
END;
CREATE TRIGGER spots_ai AFTER UPDATE ON spots BEGIN
    INSERT INTO spots_fts(rowid, name, description, address, tags)
    VALUES ('delete', old.id, old.name, old.description, old.address, old.tags);
    INSERT INTO spots_fts(rowid, name, description, address, tags)
    VALUES (new.id, new.name, new.description, new.address, new.tags);
END;