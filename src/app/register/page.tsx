'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPasswordAdvice, setShowPasswordAdvice] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');

  const passwordAdvice = useMemo(() => {
    const advice = [];
    if (password.length < 8) advice.push("Au moins 8 caractères.");
    if (!/[A-Z]/.test(password)) advice.push("Au moins une majuscule.");
    if (!/[a-z]/.test(password)) advice.push("Au moins une minuscule.");
    if (!/\d/.test(password)) advice.push("Au moins un chiffre.");
    if (!/[^A-Za-z0-9]/.test(password)) advice.push("Au moins un caractère spécial.");
    return advice;
  }, [password]);

  const securityQuestions = [
    "Quel est le nom de jeune fille de votre mère ?",
    "Quel était le nom de votre premier animal de compagnie ?",
    "Dans quelle ville êtes-vous né ?",
    "Quel est le modèle de votre première voiture ?",
    "Quel est votre plat préféré ?",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            User Registration
          </h2>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email*</label>
            <input id="email" name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Email*" />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password*</label>
            <input id="password" name="password" type="password" required minLength={5} maxLength={40} className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
              <span>Password must be 5-40 characters long.</span>
              <span>{password.length}/40</span>
            </div>
          </div>

          <div>
            <label htmlFor="repeat-password" className="sr-only">Repeat Password*</label>
            <input id="repeat-password" name="repeat-password" type="password" required minLength={5} maxLength={40} className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Repeat Password*" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
             <div className="flex justify-end items-center text-xs text-gray-400 mt-1">
              <span>{repeatPassword.length}/40</span>
            </div>
          </div>

          <div className="flex items-center">
            <button type="button" onClick={() => setShowPasswordAdvice(!showPasswordAdvice)} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${showPasswordAdvice ? 'bg-green-600' : 'bg-gray-600'}`}>
              <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${showPasswordAdvice ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className="ml-3 text-sm font-medium">Show password advice</span>
          </div>

          {showPasswordAdvice && (
            <div className="p-4 bg-gray-800 rounded-md text-sm text-gray-300">
              <ul className="list-disc list-inside space-y-1">
                {passwordAdvice.map((advice, index) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="security-question" className="sr-only">Security Question*</label>
            <select id="security-question" name="security-question" required value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
              <option value="" disabled>Security Question *</option>
              {securityQuestions.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
            <div className="text-xs text-gray-400 mt-1">
              <span>This cannot be changed later!</span>
            </div>
          </div>

          <div>
            <label htmlFor="answer" className="sr-only">Answer*</label>
            <input id="answer" name="answer" type="text" required className="appearance-none rounded-md relative block w-full px-3 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Answer*" />
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500">
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/login" className="font-medium text-green-500 hover:text-green-400">
            Already a customer?
          </Link>
        </div>
      </div>
    </div>
  );
} 