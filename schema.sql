CREATE TABLE spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    hours TEXT NOT NULL,
    phone text NOT NULL,
    rating FLOAT NOT NULL,
    tags TEXT NOT NULL
);