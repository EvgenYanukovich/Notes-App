import express from 'express';
import { promises as fs } from 'fs';
import {join, dirname} from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const NOTES_FILE = join(__dirname, 'data', 'notes.json');

async function initNotesFile() {
    try {
        await fs.access(NOTES_FILE);
    } catch {
        const dir = dirname(NOTES_FILE);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(NOTES_FILE, JSON.stringify([], null, 2));
    }
}

initNotesFile();

// Получение списка заметок
app.get('/api/notes', async (req, res) => {
    try {
        const notesData = await fs.readFile(NOTES_FILE, 'utf-8');
        const notes = JSON.parse(notesData);
        res.json(notes);
    } catch (error) {
        console.error('Error reading notes:', error);
        res.status(500).json({ error: error.message });
    }
});

// Сохранение заметок
app.post('/api/save-notes', async (req, res) => {
    try {
        const notes = req.body;
        await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
        console.log('Notes saved successfully');
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving notes:', error);
        res.status(500).json({ error: error.message });
    }
});

// Поиск заметок
app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;
        const notesData = await fs.readFile(NOTES_FILE, 'utf-8');
        const notes = JSON.parse(notesData);
        
        if (!query) {
            return res.json([]);
        }

        const searchQuery = query.toLowerCase();
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchQuery) || 
            note.message.toLowerCase().includes(searchQuery)
        );

        res.json(filteredNotes);
    } catch (error) {
        console.error('Error searching notes:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
