// gpt.js

import { OpenAI } from 'openai';

const createOpenAIClient = (apiKey) => {
  if (!apiKey) {
    throw new Error('API key is required');
  }
  
  return new OpenAI({
    apiKey: apiKey
  });
};

const generateAdaptedPhrases = async (prompt, apiKey) => {
  try {
    const openai = createOpenAIClient(apiKey);
    
    const gptPrompt = `
      You are assisting someone with generating communication suggestions tailored specifically for a person with the following condition or disability: "${prompt}"
      
      Please create 8 simple, clear, and useful phrases that would help this person communicate their basic needs, feelings, or requests. Each phrase should be:
      - Concise (under 8 words if possible)
      - Directly relevant to the specific disability or condition described
      - Designed to address the unique challenges they face
      - Appropriate for their cognitive and physical capabilities
      
      IMPORTANT: Personalize these phrases based on:
      1. The specific mobility limitations described
      2. Any cognitive considerations mentioned
      3. The environment where the person spends most time (home, hospital, care facility)
      4. The daily challenges associated with their specific condition
      5. The emotional impact of their condition
      
      Divide these phrases evenly among four directional gestures (up, down, left, right) with 2 phrases per direction, organizing them by priority or frequency of need.
      
      Return your response as a JSON array with the following format:
      [
        {"id": "ai-1", "direction": "up", "message": "Phrase addressing primary need for this condition"},
        {"id": "ai-2", "direction": "down", "message": "Phrase addressing comfort need for this condition"},
        {"id": "ai-3", "direction": "left", "message": "Phrase addressing medical need for this condition"},
        {"id": "ai-4", "direction": "right", "message": "Phrase addressing emotional need for this condition"},
        {"id": "ai-5", "direction": "up", "message": "Alternative phrase for primary need"},
        {"id": "ai-6", "direction": "down", "message": "Alternative phrase for comfort need"},
        {"id": "ai-7", "direction": "left", "message": "Alternative phrase for medical need"},
        {"id": "ai-8", "direction": "right", "message": "Alternative phrase for emotional need"}
      ]
      
      Make these phrases highly specific to the condition described. For example:
      - For someone with ALS: phrases about repositioning, suction needs, or communication device adjustment
      - For someone with aphasia: phrases that compensate for speech difficulties
      - For someone with chronic pain: phrases that specify pain location and intensity
      - For someone with dementia: simple orientation phrases or emotional reassurance
      - For someone with paralysis: phrases about specific positioning needs or sensations
      
      Group similar communication needs by direction to make the system easier to remember:
      - UP: Most urgent physical/medical needs
      - DOWN: Comfort and positioning needs
      - LEFT: Medical assistance and treatment needs
      - RIGHT: Emotional and social needs
      
      Be empathetic and thoughtful in creating these phrases, ensuring they provide genuine assistance with the specific challenges faced by someone with this condition.
    `;
    
    const response = await openai.chat.completions.create({
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
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    
    const responseText = response.choices[0].message.content.trim();
    console.log('Réponse brute de l\'API OpenAI:', responseText);
    
    const match = responseText.match(/\[[\s\S]*\]/);
    if (!match) {
      throw new Error('Impossible de trouver un tableau JSON dans la réponse');
    }
    
    const parsedData = JSON.parse(match[0]);

    return validateAndNormalizePhrases(parsedData);
    
  } catch (error) {
    console.error('Erreur lors de la génération des phrases:', error);
    return getFallbackPhrases();
  }
};

const validateAndNormalizePhrases = (phrases) => {
  const directions = ["up", "down", "left", "right"];
  
  if (!Array.isArray(phrases)) {
    console.warn('Les données reçues ne sont pas un tableau', phrases);
    return getFallbackPhrases();
  }

  return phrases.map((phrase, index) => {
    // S'assurer que chaque phrase a les propriétés requises
    if (!phrase || typeof phrase !== 'object') {
      console.warn(`Phrase invalide à l'index ${index}:`, phrase);
      return {
        id: `ai-${index+1}`,
        direction: directions[index % 4],
        message: `Message par défaut ${index+1}`
      };
    }
    
    return {
      id: phrase.id || `ai-${index+1}`,
      direction: phrase.direction && directions.includes(phrase.direction.toLowerCase()) 
        ? phrase.direction.toLowerCase() 
        : directions[index % 4],
      message: phrase.message || `Message pour la direction ${directions[index % 4]}`
    };
  });
};


const getFallbackPhrases = () => {
  return [
    {"id": "ai-1", "direction": "up", "message": "Besoin d'aide urgente"},
    {"id": "ai-2", "direction": "down", "message": "Repositionner, s'il vous plaît"},
    {"id": "ai-3", "direction": "left", "message": "Besoin de médicaments"},
    {"id": "ai-4", "direction": "right", "message": "Je me sens anxieux"},
    {"id": "ai-5", "direction": "up", "message": "Appeler une infirmière"},
    {"id": "ai-6", "direction": "down", "message": "Inconfortable, besoin d'ajustement"},
    {"id": "ai-7", "direction": "left", "message": "Douleur, besoin de soulagement"},
    {"id": "ai-8", "direction": "right", "message": "Je voudrais parler"}
  ];
};


export {
  generateAdaptedPhrases,
  validateAndNormalizePhrases,
  getFallbackPhrases
};