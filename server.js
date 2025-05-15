// server.js
// Serveur principal qui intègre le module gpt.js

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import fs from 'fs/promises';

// Import du module gpt.js
import { generateAdaptedPhrases, getFallbackPhrases } from './gpt.js';

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

// Configuration pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// API pour générer des phrases adaptées au handicap
app.post('/api/gpt', async (req, res) => {
  console.log('POST /api/gpt - Requête reçue');
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      console.warn('Requête sans prompt');
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    console.log(`Prompt reçu: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
    
    // Vérifier la clé API
    if (!OPENAI_API_KEY) {
      console.error(code);
      return res.status(500).json({ 
        error: 'Configuration API incorrecte',
        details: 'La clé API OpenAI n\'est pas configurée correctement'
      });
    }
    
    // Utilisation du module gpt.js pour générer les phrases adaptées
    console.log('Génération des phrases adaptées avec le module gpt.js...');
    let generatedSentences;
    
    try {
      generatedSentences = await generateAdaptedPhrases(prompt, OPENAI_API_KEY);
      console.log('Phrases générées avec succès:', generatedSentences.length);
    } catch (gptError) {
      console.error('Erreur lors de la génération des phrases:', gptError);
      generatedSentences = getFallbackPhrases();
      console.log('Utilisation des phrases par défaut:', generatedSentences.length);
    }
    
    // Envoyer la réponse au client
    res.status(200).json({
      success: true,
      sentences: generatedSentences
    });
    
  } catch (error) {
    console.error('❌ GPT API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate suggestions',
      details: error.message
    });
  }
});

// Route pour servir le fichier index.html pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log('État de la clé API:', OPENAI_API_KEY ? `✅ Configurée (${OPENAI_API_KEY.substring(0, 7)}...)` : '❌ Non configurée');
});