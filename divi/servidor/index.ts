import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const studentMessages: string[] = [];
const teacherMessages: string[] = [];

app.post('/send', (req: Request, res: Response) => {
  const { message, userType } = req.body;
  if (userType === 'tudent') {
    studentMessages.push(message);
  } else if (userType === 'teacher') {
    teacherMessages.push(message);
  }
  res.status(200).send('Mensage enviado');
});


app.get('/events/students', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  setInterval(() => {
    res.write(`data: ${JSON.stringify(studentMessages)}\n\n`);
  }, 1000);
});

app.get('/events/teachers', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  setInterval(() => {
    res.write(`data: ${JSON.stringify(teacherMessages)}\n\n`);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});

