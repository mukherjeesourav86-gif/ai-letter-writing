import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Letter, LetterGenerationRequest, User } from '../types';
import { mockDbUsers, mockSavedLetters } from '../data/mockAdminData';
import { faker } from '@faker-js/faker';

interface LetterContextType {
  currentLetter: Letter | null;
  setCurrentLetter: (letter: Letter | null) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  generateLetter: (request: LetterGenerationRequest) => Promise<Letter>;
  
  allUsers: User[];
  setAllUsers: (users: User[]) => void;
  currentUser: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  registerUser: (user: Omit<User, 'id' | 'createdAt' | 'role'>) => User;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  changePassword: (userId: string, currentPass: string, newPass: string) => void;
  
  savedLetters: Letter[];
  setSavedLetters: (letters: Letter[]) => void;
}

const LetterContext = createContext<LetterContextType | undefined>(undefined);

export const useLetterContext = () => {
  const context = useContext(LetterContext);
  if (!context) {
    throw new Error('useLetterContext must be used within a LetterProvider');
  }
  return context;
};

export const LetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLetter, setCurrentLetter] = useState<Letter | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('allUsers');
    try {
      const parsed = savedUsers ? JSON.parse(savedUsers) : mockDbUsers;
      return Array.isArray(parsed) ? parsed : mockDbUsers;
    } catch {
      return mockDbUsers;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [savedLetters, setSavedLetters] = useState<Letter[]>(mockSavedLetters);

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = (email: string, password: string): User | null => {
    const user = allUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (userData: Omit<User, 'id' | 'createdAt' | 'role'>): User => {
    const newUser: User = {
      ...userData,
      id: faker.string.uuid(),
      role: 'user',
      createdAt: new Date(),
    };
    setAllUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (updatedUser: User) => {
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };
  
  const changePassword = (userId: string, currentPass: string, newPass: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found.');
    }
    if (user.password !== currentPass) {
        throw new Error('Incorrect current password.');
    }
    const updatedUser = { ...user, password: newPass };
    updateUser(updatedUser);
  };

  const deleteUser = (userId: string) => {
    if (currentUser?.id === userId) {
      alert("You cannot delete your own account.");
      return;
    }
    setAllUsers(prev => prev.filter(u => u.id !== userId));
  };


  const generateLetter = async (request: LetterGenerationRequest): Promise<Letter> => {
    setIsGenerating(true);

    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.includes("****************")) {
      const errorMsg = 'DeepSeek API key is not configured. Please add your key to the .env file and refresh the page.';
      alert(errorMsg);
      setIsGenerating(false);
      const errorLetter: Letter = {
        id: 'error', title: 'Configuration Error', content: errorMsg,
        category: request.category, language: request.language, tone: request.tone,
        createdAt: new Date(), updatedAt: new Date(),
      };
      setCurrentLetter(errorLetter);
      return errorLetter;
    }

    const letterWritingGuide = `
      You must structure the letter precisely as follows, moving the sender's details to the bottom:
      1. Recipient's Information: Recipient's Full Name, Street Address.
      2. Salutation: "Dear [Recipient Name]," or a formal alternative.
      3. Opening Paragraph: State the purpose of the letter immediately.
      4. Body Paragraphs: Provide necessary details and incorporate the user's keywords naturally.
      5. Concluding Paragraph: Summarize main points and state any expected action.
      6. Complimentary Close: A polite closing like "Sincerely," or "Best regards,".
      7. Signature: The sender's printed full name.
      8. Sender's Information Block: After the signature, include the sender's full name, street address, and the current date. This block should be at the very end.
    `;
    
    const indianLanguages = ['Hindi', 'Bengali', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Nepali', 'Maithili', 'Kashmiri', 'Sindhi', 'Dogri', 'Manipuri', 'Santali', 'Konkani', 'Bodo', 'Sanskrit'];
    const isIndianLanguage = indianLanguages.includes(request.language);

    const indianLanguageInstruction = isIndianLanguage 
      ? `
        Special Instruction for Indian Languages: The user has selected an Indian language (${request.language}). 
        The user's input for keywords, names, and addresses may be in English, the selected Indian language, or a mix of both (e.g., Hinglish).
        Your task is to understand the user's intent from this input and generate a complete, natural, and culturally appropriate letter written *entirely* in the specified language (${request.language}) and its native script (e.g., Devanagari for Hindi, Bengali script for Bengali).
        - If input details are already in the target language, use them directly in the letter.
        - If input details are in English, translate the concepts and intent accurately.
        - Adhere strictly to the local formal/informal conventions for letter writing.
        - Do not transliterate (e.g., do not write Hindi words using English letters). Use the correct native script for the final output.
      `
      : '';

    const systemPrompt = `You are LetterCraft AI, an expert multilingual letter writing assistant. Your task is to generate a complete, professional, and contextually appropriate letter based on the user's request. You must adhere to the provided structure and tone. Do not add any extra notes or explanations outside of the letter content itself. The entire output should be only the letter text. ${letterWritingGuide} ${indianLanguageInstruction}`;

    const userPrompt = `
      Please write a letter with the following specifications:
      - Language: ${request.language}
      - Category: ${request.category}
      - Tone: ${request.tone}
      - Desired Length: ${request.length}
      - Core Subject/Keywords: "${request.keywords}"

      ---
      Sender's Information (to be placed at the bottom of the letter):
      - Full Name: ${request.senderName || 'Not provided'}
      - Street Address: ${request.senderAddress || 'Not provided'}

      ---
      Recipient's Information (to be placed at the top):
      - Full Name: ${request.recipientName || 'Not provided'}
      - Street Address: ${request.recipientAddress || 'Not provided'}
      
      ---
      Any other instructions: ${request.customInstructions || 'None'}

      Generate a complete letter based on these details, following the required structure (sender info at the bottom). If any details are 'Not provided', use realistic placeholders or omit them if appropriate for the letter format.
    `;

    try {
      const response = await axios.post(
        'https://api.deepseek.com/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const generatedContent = response.data.choices[0].message.content;

      const newLetter: Letter = {
        id: Date.now().toString(),
        title: `${request.category.charAt(0).toUpperCase() + request.category.slice(1).replace('-', ' ')} Letter`,
        category: request.category,
        language: request.language,
        tone: request.tone,
        content: generatedContent.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCurrentLetter(newLetter);
      return newLetter;
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      let errorMessage = 'An error occurred while generating the letter with the AI. Please try again later.';
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Authentication error. Please check your DeepSeek API key in the .env file.';
        } else {
          errorMessage = `API Error: ${error.response.data?.error?.message || 'An unknown error occurred.'}`;
        }
      }
      
      const errorLetter: Letter = {
        id: 'error', title: 'Generation Error', content: errorMessage,
        category: request.category, language: request.language, tone: request.tone,
        createdAt: new Date(), updatedAt: new Date(),
      };
      setCurrentLetter(errorLetter);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <LetterContext.Provider value={{
      currentLetter,
      setCurrentLetter,
      isGenerating,
      setIsGenerating,
      generateLetter,
      allUsers,
      setAllUsers,
      currentUser,
      login,
      logout,
      registerUser,
      updateUser,
      deleteUser,
      changePassword,
      savedLetters,
      setSavedLetters,
    }}>
      {children}
    </LetterContext.Provider>
  );
};
