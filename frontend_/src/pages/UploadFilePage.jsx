import React from 'react';
import DataUploader from '../components/uploader/DataUploader';

const UploadFilePage = ({ onUploadSuccess = () => {} }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Section principale */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-8 px-4 pb-20">

        {/* En-tête */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
            StockMaster Pro
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Transformez votre gestion de stock avec notre solution IA
          </p>
        </div>

        {/* Zone d'upload */}
        <div className="animate-slide-up transform-gpu">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/50 rounded-[2rem] p-8 backdrop-blur-xl border border-gray-700/50 shadow-2xl mx-auto transition-all hover:border-blue-400/30">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-100">📁 Importer vos données</h2>
                <p className="text-gray-400/90 font-light text-lg">
                  Glissez votre fichier CSV ou parcourir vos fichiers
                </p>
              </div>
              <DataUploader onUploadSuccess={onUploadSuccess} />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-5 animate-fade-in delay-300 mx-auto">
          {[
            {
              icon: '📈',
              title: 'Analytics temps réel',
              text: 'Suivi visuel des mouvements de stock',
              gradient: 'from-blue-500/5 to-blue-900/10'
            },
            {
              icon: '🧠',
              title: 'IA prédictive',
              text: 'Anticipez les besoins futurs',
              gradient: 'from-purple-500/5 to-purple-900/10'
            },
            {
              icon: '🛡️',
              title: 'Sécurité',
              text: 'Cryptage militaire AES-256',
              gradient: 'from-emerald-500/5 to-emerald-900/10'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} p-6 rounded-xl border border-gray-700/30 backdrop-blur-lg transition-all hover:border-blue-400/20`}
            >
              <div className="text-3xl mb-4 opacity-90">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400/80 text-sm font-light">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Votre nom en bas de page */}
        <div className="absolute bottom-6 left-0 right-0 text-center animate-fade-in delay-1000">
          <p className="text-gray-600 text-sm font-mono">
            Développé avec ❤️ par <a href={"https://setoudie.github.io"} className="text-blue-400/80">Setoudie</a>
          </p>
        </div>
      </div>

      {/* Cache les scrollbars */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
          width: 0 !important;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow: -moz-scrollbars-none;
        }
      `}</style>
    </div>
  );
};

export default UploadFilePage;