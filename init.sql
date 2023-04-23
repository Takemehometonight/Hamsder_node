USE hamsder;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE swipes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    swiped_user_id INTEGER REFERENCES users(id),
    is_like BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    matched_user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    match_id INTEGER REFERENCES matches(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations (
    id INTEGER PRIMARY KEY,
    user1_id INTEGER REFERENCES users(id),
    user2_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation_messages (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    conversation_id INTEGER REFERENCES conversations(id),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

