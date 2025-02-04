import React from 'react';
import DataUploader from '../components/uploader/DataUploader';

const UploadFilePage = ({ onUploadSuccess }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl text-center space-y-8">
        {/* En-tête */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            StockMaster Pro
          </h1>
          <p className="text-xl text-gray-300">
            Transformez votre gestion de stock avec notre solution intelligente
          </p>
        </div>

        {/* Étape d'upload */}
        <div className="animate-slide-up">
          <div className="inline-block bg-gray-800/50 rounded-2xl p-8 backdrop-blur-lg border border-gray-700 shadow-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Étape 1 : Importez vos données</h2>
                <p className="text-gray-400">
                  Commencez par importer votre dernier export CSV de stock
                </p>
              </div>

              <DataUploader onUploadSuccess={onUploadSuccess} />
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 text-left animate-fade-in delay-500">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">📊 Analytics temps réel</h3>
            <p className="text-gray-400 text-sm">Visualisez vos tendances de stock</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">🤖 Prédictions IA</h3>
            <p className="text-gray-400 text-sm">Prévisions de demande intelligentes</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">🔒 Sécurité maximale</h3>
            <p className="text-gray-400 text-sm">Chiffrement AES-256 de vos données</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilePage;