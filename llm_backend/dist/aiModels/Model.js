"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeAndParseJSON = exports.GenAiCode = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
const apiKey = process.env.PUBLIC_GEMINI_KEY;
if (!apiKey) {
    throw new Error("the api key not present");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
});
const CodeGenerationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};
const sanitizeAndParseJSON = (text) => {
    try {
        try {
            return JSON.parse(text);
        }
        catch (e) { }
        let cleanText = text;
        const jsonMatch = text.match(/```(?:json)?\s*({[\s\S]*?})\s*```/) ||
            text.match(/({[\s\S]*})/);
        if (jsonMatch) {
            cleanText = jsonMatch[1];
        }
        cleanText = cleanText
            .replace(/```json\s*|```\s*/g, '')
            .replace(/\r\n/g, '\n')
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":')
            .replace(/,(\s*[}\]])/g, '$1')
            .trim();
        try {
            return JSON.parse(cleanText);
        }
        catch (parseError) {
            console.error('Cleaned text that failed to parse:', cleanText);
            console.error('Parse error:', parseError);
            // If still failing, try one more aggressive cleanup
            const fallbackClean = cleanText
                // Ensure quotes around property values
                .replace(/:\s*([^"{[\s][^,}\]]*)/g, ':"$1"')
                // Remove any double quotes that might have been added around numbers
                .replace(/"(-?\d+\.?\d*)"/g, '$1')
                // Remove quotes around true/false/null
                .replace(/"(true|false|null)"/g, '$1');
            return JSON.parse(fallbackClean);
        }
    }
    catch (error) {
        console.error('JSON parsing error:', error);
        console.error('Original text:', text);
        throw new Error(`Invalid JSON response from AI: ${error}`);
    }
};
exports.sanitizeAndParseJSON = sanitizeAndParseJSON;
exports.GenAiCode = model.startChat({
    generationConfig: CodeGenerationConfig,
    history: [],
});
//  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//  console.log(result.response.text());
