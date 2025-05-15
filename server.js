// server.js
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// Obtenir le chemin du répertoire actuel (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lecture améliorée du fichier .env
let OPENAI_API_KEY = '';
try {
  const envContent = readFileSync('.env', 'utf8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    // Recherche spécifiquement la clé API
    if (line.trim().startsWith('VITE_OPENAI_API_KEY=')) {
      // Extrait tout ce qui suit "VITE_OPENAI_API_KEY="
      const keyValue = line.trim().substring('VITE_OPENAI_API_KEY='.length);
      
      // Nettoie la clé (enlève guillemets, apostrophes, espaces)
      OPENAI_API_KEY = keyValue.replace(/^["']|["']$/g, '').trim();
      break;
    }
  }
  
  if (!OPENAI_API_KEY) {
    console.error('❌ ATTENTION: Clé API OpenAI non trouvée dans le fichier .env');
  } else {
    console.log(`✅ Clé API OpenAI trouvée dans .env (longueur: ${OPENAI_API_KEY.length})`);
    console.log(`✅ Début de la clé: ${OPENAI_API_KEY.substring(0, 7)}...`);
  }
} catch (error) {
  console.error('❌ Erreur lors de la lecture du fichier .env:', error);
}

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Charger les données des phrases
const loadSentencesData = async () => {
  try {
    const filePath = path.join(__dirname, 'public', 'sentences.json');
    console.log('Tentative de lecture du fichier:', filePath);
    const data = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`Fichier sentences.json chargé avec succès (${parsedData.length} phrases)`);
    return parsedData;
  } catch (error) {
    console.error('❌ ERREUR lors du chargement du fichier sentences.json:', error);
    return [];
  }
};

// Routes
app.get('/api/gpt', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/gpt', async (req, res) => {
  console.log('POST /api/gpt - Requête reçue');
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      console.warn('Requête sans prompt');
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    console.log(`Prompt reçu: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
    
    // Charger les données
    const allSentences = await loadSentencesData();
    
    if (!allSentences || allSentences.length === 0) {
      console.error('❌ Aucune phrase chargée, impossible de continuer');
      return res.status(500).json({ 
        error: 'Impossible de charger les données des phrases',
        details: 'Le fichier sentences.json est vide ou inaccessible'
      });
    }
    
    // Vérifier la clé API
    if (!OPENAI_API_KEY) {
      console.error(code);
      return res.status(500).json({ 
        error: 'Configuration API incorrecte',
        details: 'La clé API OpenAI n\'est pas configurée correctement'
      });
    }
    
    // Créer une instance OpenAI avec la clé API
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
    
    // Créer le prompt pour GPT
 const gptPrompt = `
  You are assisting someone with generating communication suggestions for a person with speech difficulties or communication challenges.
  
  Given the following information about the person: "${prompt}"
  
  Please create 8 simple, clear, and useful phrases that would help this person communicate their basic needs, feelings, or requests. Each phrase should be concise (under 8 words), easy to understand, and highly relevant to their specific condition or situation.
  
  IMPORTANT: Each phrase must be completely different - ensure there are no duplicate phrases or phrases with similar meanings.
  
  Divide these phrases evenly among four directional gestures (up, down, left, right) with 2 phrases per direction.
  
  Return your response as a JSON array with the following format:
  [
    {"id": "ai-1", "direction": "up", "message": "Unique phrase for gesture UP 1"},
    {"id": "ai-2", "direction": "down", "message": "Unique phrase for gesture DOWN 1"},
    {"id": "ai-3", "direction": "left", "message": "Unique phrase for gesture LEFT 1"},
    {"id": "ai-4", "direction": "right", "message": "Unique phrase for gesture RIGHT 1"},
    {"id": "ai-5", "direction": "up", "message": "Different unique phrase for gesture UP 2"},
    {"id": "ai-6", "direction": "down", "message": "Different unique phrase for gesture DOWN 2"},
    {"id": "ai-7", "direction": "left", "message": "Different unique phrase for gesture LEFT 2"},
    {"id": "ai-8", "direction": "right", "message": "Different unique phrase for gesture RIGHT 2"}
  ]
  
  Focus on creating phrases that are:
  1. Helpful for their specific condition (e.g., pain relief requests for someone with chronic pain)
  2. Important for everyday communication and autonomy
  3. Relevant to emotional needs and personal comfort
  4. Appropriate for their cognitive level (if mentioned)
  5. Diverse and covering different communication needs
  
  Be empathetic and thoughtful in creating these phrases, as they will be used by someone who relies on this system for basic communication. Make sure each phrase has a distinct meaning and purpose.
`;
    // Appeler l'API OpenAI
    console.log('Envoi de la requête à OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant specializing in accessibility and communication needs."
        },
        {
          role: "user",
          content: gptPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    // Reste du code inchangé...
    console.log('Réponse reçue de OpenAI');
    
    // Extraire la réponse
    const responseText = completion.choices[0].message.content.trim();
    console.log('Réponse:', responseText);
    
    // Parser le JSON de la réponse
    let selectedIds;
    try {
      // Rechercher tout ce qui ressemble à un array JSON dans la réponse
      const match = responseText.match(/\[.*?\]/s);
      if (match) {
        selectedIds = JSON.parse(match[0]);
        console.log('IDs sélectionnés:', selectedIds);
      } else {
        console.warn('Aucun tableau JSON trouvé dans la réponse:', responseText);
        throw new Error('Format de réponse inattendu');
      }
    } catch (parseError) {
      console.error('Erreur lors du parsing de la réponse GPT:', parseError);
      // Fallback: sélectionner aléatoirement 8 phrases
      selectedIds = allSentences
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
        .map(s => s.id);
      console.log('Utilisation du fallback, IDs aléatoires:', selectedIds);
    }
    
    // Filtrer les phrases selon les IDs sélectionnés
    const selectedSentences = allSentences.filter(s => selectedIds.includes(s.id));
    
    // Si nous n'avons pas assez de phrases, compléter avec des aléatoires
    if (selectedSentences.length < 8) {
      const remainingSentences = allSentences
        .filter(s => !selectedIds.includes(s.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 8 - selectedSentences.length);
        
      selectedSentences.push(...remainingSentences);
    }
    
    // Assigner une importance directionnelle
    const directionalSentences = [];
    const directions = ["up", "down", "left", "right"];
    
    // D'abord, essayer de trouver une phrase pour chaque direction
    directions.forEach(direction => {
      const match = selectedSentences.find(s => 
        s.direction === direction && !directionalSentences.includes(s)
      );
      
      if (match) {
        directionalSentences.push(match);
      }
    });
    
    // Remplir les emplacements restants
    const remainingSentences = selectedSentences.filter(
      s => !directionalSentences.includes(s)
    );
    
    // Combiner les résultats
    const result = [...directionalSentences, ...remainingSentences].slice(0, 8);
    
    console.log('Envoi de la réponse au client:', result.length, 'phrases');
    
    // Envoyer la réponse
    res.status(200).json({
      success: true,
      sentences: result
    });
    
  } catch (error) {
    console.error('❌ GPT API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate suggestions',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log('État de la clé API:', OPENAI_API_KEY ? `Configurée (${OPENAI_API_KEY.substring(0, 7)}...)` : 'Non configurée');
});