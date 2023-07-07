const express = require('express');
const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:Sednoplan1234@db.ljkcmffwbwlghohzwipj.supabase.co:5432/postgres';
const pool = new Pool({
    connectionString: connectionString,
});

const app = express();

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

app.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});
