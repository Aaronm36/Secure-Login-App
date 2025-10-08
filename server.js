const { app } = require('./app');

const PORT = 8080;

app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start the server:', err);
        process.exit(1);
    }

    console.log('\x1b[36m%s\x1b[0m', `
┌──────────────────────────────────────────────┐
│                                              │
│   🚀 Server is running on port ${PORT}          │
│                                              │
└──────────────────────────────────────────────┘`);
});