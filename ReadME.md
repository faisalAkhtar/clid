# CLI-D

CLI based dating app.

## Backend (mini-spec)

### API Routes

- Auth
    - POST /signup {username, email}
    - POST /signin {username}
- Profile
    - GET /profile/:id
    - POST /profile {name, age, gender, bio}
- Preferences
    - GET /preferences
    - POST /preferences {location, gender_pref, min_age, max_age}
- Browse
    - GET /browse → list of profiles
    - POST /swipe {target_id, type}
- Matches & Chat
    - GET /matches
    - GET /messages/:match_id
    - POST /messages {match_id, text}
- Session
    - POST /signout

### Client Commands Mapping

- signin → Sign in flow
- signup → Sign up flow
- profile → View/edit profile
- prefs → View/edit preferences
- browse → Show profiles one by one (←/→/↑ keys mapped)
- matches → Show matches
- chat <match_id> → Enter chat
- send <match_id> <text> → Send message
- signout → Exit session

### Databases

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    name TEXT,
    age INTEGER,
    gender TEXT,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    location TEXT,
    gender_pref TEXT,
    min_age INTEGER,
    max_age INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1_id INTEGER,
    user2_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER,
    sender_id INTEGER,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);
```

## Frontend (wireframes)

```mathematica
╔═══════════════════════════════════╗
║           CLID Dating             ║
╠═══════════════════════════════════╣
║  [S] Sign In                      ║
║  [U] Sign Up                      ║
║                                   ║
║  [Q] Quit                         ║
╚═══════════════════════════════════╝


╔═══════════════════════════════════╗
║            Sign In                ║
╠═══════════════════════════════════╣
║  Username: [__________]           ║
║                                   ║
║  <Enter> Continue   <Esc> Back    ║
╚═══════════════════════════════════╝


╔═══════════════════════════════════╗
║            Sign Up                ║
╠═══════════════════════════════════╣
║  Username: [__________]           ║
║  Email:    [__________]           ║
║                                   ║
║  <Enter> Continue   <Esc> Back    ║
╚═══════════════════════════════════╝


╔═══════════════════════════════════════════════╗
║        Create Your Profile                    ║
╠═══════════════════════════════════════════════╣
║  Name:     [__________]                       ║
║  Age:      [__]       Gender:   [M/F/Other]   ║
║  Location: [__________]                       ║
║                                               ║
║  Bio: I love books and coffee.                ║
║                                               ║
║  Interests: Hiking, Reading, Music            ║
║                                               ║
║  Prompt 1: "Two truths and a lie"             ║
║  > "I dance salsa, I can cook, I hate dogs"   ║
║                                               ║
║  Prompt 2: "Perfect Sunday"                   ║
║  > "Coding in pajamas"                        ║
║                                               ║
║  [S] Save    [E] Edit Again                   ║
╚═══════════════════════════════════════════════╝


╔════════════════════════════════╗
║             Home               ║
╠════════════════════════════════╣
║  [B] Browse Profiles           ║
║  [M] Matches & Chats           ║
║  [P] My Profile                ║
║  [F] Preferences               ║
║  [O] Sign Out                  ║
╚════════════════════════════════╝


╔══════════════════════════════════════════════╗
║       Browsing (2 of 10)                     ║
╠══════════════════════════════════════════════╣
║  Name:    Alex                               ║
║  Age:     25            Gender:  Male        ║
║  Location: New York                          ║
║                                              ║
║  Bio: Loves hiking and coffee.               ║
║                                              ║
║  Interests: Hiking, Jazz, Art                ║
║                                              ║
║  Prompt 1: "A shower thought…"               ║
║  > Cats probably think we’re their butlers.  ║
║                                              ║
║  Prompt 2: "A shower thought…"               ║
║  > Cats probably think we’re their butlers.  ║
║                                              ║
║ [←] No    [↑] SuperLike  [→] Like            ║
║            [Q] Quit                          ║
╚══════════════════════════════════════════════╝


╔════════════════════════════════╗
║           Preferences          ║
╠════════════════════════════════╣
║  Location:   [Any]             ║
║  Gender:     [All]             ║
║  Age Range:  [18 - 30]         ║
║                                ║
║  [S] Save   [B] Back           ║
╚════════════════════════════════╝
```

## [LICENSE](LICENSE)
