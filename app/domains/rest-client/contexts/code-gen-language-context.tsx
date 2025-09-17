'use client';

import { createContext } from 'react';
import type { CodeGenLanguage } from '../hooks/types/index';

export const CodeGenLanguageContext = createContext<CodeGenLanguage[]>([]);
