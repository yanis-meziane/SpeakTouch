// This file is for a Next.js API route at /api/routes/gpt.js
import { OpenAI } from 'openai';
import sentencesData from '../../public/sentences.json';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
/**
 * POST handler for /api/routes/gpt.js
 * Generate communication suggestions based on user prompt
 */
export default async function handler(req, res) {
  // Only allow POST for suggestions and GET for health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Use the imported sentences data
    const allSentences = sentencesData;
    
    // Create a prompt for GPT
    const gptPrompt = `
You are assisting someone with generating communication suggestions for people with speech difficulties.
Given the following information about the person: "${prompt}"

I have a list of pre-recorded sentences. Select the 8 most relevant sentences from the list below 
that would be most helpful for this person's situation.

Return ONLY the IDs of the selected sentences in a JSON array format like this: ["id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8"]

Available sentences:
${allSentences.map(s => `ID: ${s.id}, Direction: ${s.direction}, Message: "${s.message}"`).join('\n')}
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Or use a different model as needed
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

    // Extract the response
    const responseText = completion.choices[0].message.content.trim();
    
    // Parse the JSON array from the response
    let selectedIds;
    try {
      // Find anything that looks like a JSON array in the response
      const match = responseText.match(/\[.*?\]/s);
      if (match) {
        selectedIds = JSON.parse(match[0]);
      } else {
        // Fallback if no JSON array is found
        throw new Error('Failed to parse response as JSON array');
      }
    } catch (parseError) {
      console.error('Error parsing GPT response:', parseError);
      // Fallback: randomly select 8 sentences
      selectedIds = allSentences
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
        .map(s => s.id);
    }
    
    // Filter sentences based on selected IDs
    const selectedSentences = allSentences.filter(s => selectedIds.includes(s.id));
    
    // If we don't have enough sentences (e.g., parsing error), fill with random ones
    if (selectedSentences.length < 8) {
      const remainingSentences = allSentences
        .filter(s => !selectedIds.includes(s.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 8 - selectedSentences.length);
        
      selectedSentences.push(...remainingSentences);
    }
    
    // Assign directional importance
    // We want to ensure the first 4 have different directions (up, down, left, right)
    const directionalSentences = [];
    const directions = ["up", "down", "left", "right"];
    
    // First, try to find one sentence for each direction
    directions.forEach(direction => {
      const match = selectedSentences.find(s => 
        s.direction === direction && !directionalSentences.includes(s)
      );
      
      if (match) {
        directionalSentences.push(match);
      }
    });
    
    // Fill remaining slots with other selected sentences
    const remainingSentences = selectedSentences.filter(
      s => !directionalSentences.includes(s)
    );
    
    // Combine the results, ensuring directional sentences come first
    const result = [...directionalSentences, ...remainingSentences].slice(0, 8);
    
    // Send the response
    res.status(200).json({
      success: true,
      sentences: result
    });
    
  } catch (error) {
    console.error('GPT API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate suggestions',
      details: error.message
    });
  }
}