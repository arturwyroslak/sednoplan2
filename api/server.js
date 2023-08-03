const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:Sednoplan1234@db.ljkcmffwbwlghohzwipj.supabase.co:5432/postgres';
const pool = new Pool({
    connectionString: connectionString,
});

const app = express();

// Dodaj to, aby automatycznie przetwarzać ciała żądań JSON
app.use(express.json());
app.use(cors({
    origin: 'https://sednoplanapp.vercel.app'
}));
app.get('/modals/:id', async (req, res) => {
    const { id } = req.params;

    // Pobierz treść modalu z bazy danych
    try {
        const result = await pool.query('SELECT content FROM modals WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił błąd podczas pobierania treści modalu');
    }
});

// Dodaj to, aby obsługiwać żądania POST do /modals/:id
app.post('/modals/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    // Zapisz treść modalu do bazy danych
    try {
        await pool.query('UPDATE modals SET content = $1 WHERE id = $2', [content, id]);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Wystąpił błąd podczas zapisywania treści modalu');
    }
});

app.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});
