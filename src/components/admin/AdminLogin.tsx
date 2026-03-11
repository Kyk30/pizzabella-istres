"use client";

import { useState } from "react";

interface AdminLoginProps {
  onLogin: (password: string) => Promise<boolean>;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await onLogin(password);
    if (!success) {
      setError("Mot de passe incorrect");
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🍕</div>
          <h1 className="text-2xl font-heading font-bold text-stone-800">
            Pizza Bella Admin
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Connectez-vous pour gerer votre site
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-6">
          <a href="/" className="hover:text-brand-red transition-colors">
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  );
}
