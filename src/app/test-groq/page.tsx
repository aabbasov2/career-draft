'use client';

import { useState } from 'react';

export default function TestGroqPage() {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState('Explain quantum computing in simple terms');

  const callGroq = async () => {
    setIsLoading(true);
    setError('');
    setResult('Calling Groq API...');

    try {
      // Directly call Groq API
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to call Groq API');
      }

      setResult(data.choices[0]?.message?.content || 'No response');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Groq API Test</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prompt:
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          onClick={callGroq}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Calling...' : 'Call Groq API'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Error:</p>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        {result && !isLoading && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Response:</h2>
            <div className="p-4 bg-gray-50 rounded border border-gray-200">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}