import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //use your own password
    database: 'ai_stress'
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

const app = express();
const port = 5500;

app.use(express.json());

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.get("/", (req, res) => {
    res.render("login.ejs");
});
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password) {
        console.log("Username or password is undefined");
        return res.status(400).send("Username and Password are required");
    }

    console.log("Received Signup Data:", { username, password, email });

    const checkUserSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserSql, [username], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database Error");
        }

        if (results.length > 0) {
            console.log("Username already exists. Redirecting to login.");
            return res.send(`
                <script>
                    alert("Username already exists. Please try logging in.");
                    window.location.href = "/login";
                </script>
            `);
        }

        const insertUserSql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        db.query(insertUserSql, [username, password, email], (err, result) => {
            if (err) {
                console.error("Error inserting user data:", err);
                return res.status(500).send("Database Error");
            }

            console.log("User registered successfully.");
            res.redirect("/login");
        });
    });
});


app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        console.log("Username or password is undefined");
        return res.status(400).send("Username and Password are required");
    }

    console.log("Received Login Data:", { username, password });

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database Error");
        }

        // if (results.length > 0) {
        //     console.log("Login successful!", username);
        //     req.session.username = username; // Store in session
        //     res.redirect(`/profile/${username}`); // Redirect dynamically

        if (results.length > 0) {
            console.log("Login successful!", results[0]);

            req.session.user = results[0];
            req.session.save(() => {
                res.redirect(`/profile/${username}`);
            });

        } else {
            console.log("Invalid credentials");
            res.status(401).send("Invalid username or password.");
        }
    });
});


app.get("/profile/:username", (req, res) => {
    const username = req.params.username;

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const userQuery = `
        SELECT u.username, d.display_name, d.bio, d.profile_image, u.id AS user_id
        FROM users u
        LEFT JOIN user_details d ON u.id = d.user_id
        WHERE u.username = ?
    `;

    db.query(userQuery, [username], (err, userResults) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (userResults.length === 0) {
            return res.status(404).send("User not found");
        }

        const userProfile = userResults[0];

        const postsQuery = "SELECT image, caption, timestamp FROM posts WHERE user_id = ? ORDER BY timestamp DESC";
        db.query(postsQuery, [userProfile.user_id], (err, postsResults) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Internal Server Error");
            }

            res.render("profile.ejs", {
                username: userProfile.username,
                displayName: userProfile.display_name || "Your Name",
                bio: userProfile.bio || "This is my bio where I can write something about myself.",
                profileImage: userProfile.profile_image || "/default-avatar.png",
                posts: postsResults 
            });
        });
    });
});


app.get("/create-post", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const username = req.session.user.username;
    const userQuery = "SELECT profile_image FROM user_details WHERE user_id = (SELECT id FROM users WHERE username = ?)";

    db.query(userQuery, [username], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }

        const profileImage = results.length > 0 ? results[0].profile_image : "/default-avatar.png";

        res.render("create-post.ejs", { username, profileImage });
    });
});

app.post("/create-post", upload.single("image"), (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); 
    }

    const { caption } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const username = req.session.user.username;
    const timestamp = new Date();

    const userQuery = "SELECT id FROM users WHERE username = ?";
    db.query(userQuery, [username], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: "Database Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user_id = results[0].id;


        const insertPostSql = "INSERT INTO posts (user_id, image, caption, timestamp) VALUES (?, ?, ?, ?)";
        db.query(insertPostSql, [user_id, image, caption, timestamp], (err, result) => {
            if (err) {
                console.error("Error inserting post data:", err);
                return res.status(500).json({ success: false, message: "Database Error" });
            }

            console.log("Post created successfully!");
            res.json({ success: true, username: username }); 
        });
    });
});

// app.get("/home", (req, res) => {
//     if (!req.session.user) {
//         return res.redirect("/login");
//     }

//     const userId = req.session.user.id; // Get logged-in user ID

//     // Fetch only the logged-in user's details
//     const userQuery = "SELECT profile_image, bio, display_name FROM user_details WHERE user_id = ?";

//     // Fetch all posts and associate them with the correct users
//     const postsQuery = `
//         SELECT posts.*, user_details.profile_image, user_details.display_name
//         FROM posts
//         JOIN user_details ON posts.user_id = user_details.user_id
//         ORDER BY posts.timestamp DESC;
//     `;

//     db.query(userQuery, [userId], (err, userResults) => {
//         if (err) {
//             console.error("Error fetching user details:", err);
//             return res.status(500).send("Internal Server Error");
//         }

//         db.query(postsQuery, (err, postsResults) => {
//             if (err) {
//                 console.error("Error fetching posts:", err);
//                 return res.status(500).send("Internal Server Error");
//             }

//             console.log("Fetched Posts:", postsResults); // Debugging log

//             res.render("home", {
//                 posts: postsResults,  // Send all posts
//                 user: req.session.user, // Send logged-in user info
//                 profile: userResults[0] || {} // Send logged-in user's profile info
//             });
//         });
//     });
// });

import axios from 'axios';

app.get("/home", async (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const userId = req.session.user.id;

    axios.get("http://localhost:5000/home")
        .then(() => console.log("Flask model triggered"))
        .catch(err => console.error("Flask trigger error:", err.message));

    const userQuery = `
        SELECT profile_image, bio, display_name 
        FROM user_details 
        WHERE user_id = ?`;

    const postsQuery = `
        SELECT 
            posts.*, 
            user_details.profile_image, 
            user_details.display_name,
            posts.is_stress 
        FROM posts
        JOIN user_details ON posts.user_id = user_details.user_id
        ORDER BY posts.timestamp DESC;
    `;

    db.query(userQuery, [userId], (err, userResults) => {
        if (err) {
            console.error("User fetch error:", err);
            return res.status(500).send("Error fetching user data");
        }

        db.query(postsQuery, (err, postsResults) => {
            if (err) {
                console.error("Posts fetch error:", err);
                return res.status(500).send("Error fetching posts");
            }

            res.render("home", {
                posts: postsResults,
                user: req.session.user,
                profile: userResults[0] || {}
            });
        });
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})