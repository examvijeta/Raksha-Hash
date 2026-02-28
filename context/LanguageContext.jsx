"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';
import bn from '../locales/bn.json';
import ta from '../locales/ta.json';
import te from '../locales/te.json';
import kn from '../locales/kn.json';
import ml from '../locales/ml.json';
import gu from '../locales/gu.json';
import pa from '../locales/pa.json';

const translations = { en, hi, mr, bn, ta, te, kn, ml, gu, pa };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState('en'); // Default to English

    useEffect(() => {
        const savedLocale = localStorage.getItem('raksha-locale');
        if (savedLocale) {
            setLocale(savedLocale);
        }
    }, []);

    const toggleLanguage = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('raksha-locale', newLocale);
    };

    const t = (path) => {
        const keys = path.split('.');
        // Try current locale first
        let result = translations[locale];
        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                // Fall back to English
                let fallback = translations['en'];
                for (const k of keys) {
                    if (fallback && fallback[k] !== undefined) fallback = fallback[k];
                    else return path;
                }
                return fallback;
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
