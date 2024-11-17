import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosis';
import patientRouter from './routes/patient';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
