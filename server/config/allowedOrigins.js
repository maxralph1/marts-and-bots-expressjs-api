const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000'
];

// Make a filewrite controller for flexible CRUD (without coming into the server code) on this allowedOrigins list

module.exports = allowedOrigins;