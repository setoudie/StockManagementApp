import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DataUploader = ({ onUploadSuccess = () => {} }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewData, setPreviewData] = useState(null); // Pour stocker l'aperçu des données
  const [file, setFile] = useState(null); // Pour stocker le fichier sélectionné
  const [isFileValid, setIsFileValid] = useState(false); // Pour vérifier si le fichier est valide

  // Colonnes requises dans le fichier CSV
  const requiredColumns = [
    'date',
    'produit',
    'categorie',
    'prix_vente',
    'demande_journaliere',
    'quantite_vendue',
    'ventes_perdues',
    'stock_initial',
    'duree_peremption',
    'temperature',
    'promotion',
    'jour_semaine',
    'weekend',
    'evenement',
    'chiffre_affaires',
  ];

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier CSV');
      setIsFileValid(false); // Le fichier n'est pas valide
      return;
    }

    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setError('Seuls les fichiers CSV sont acceptés');
      setIsFileValid(false); // Le fichier n'est pas valide
      return;
    }

    setFile(selectedFile); // Mettre à jour le fichier sélectionné

    const reader = new FileReader();

    reader.onload = async () => {
      const text = reader.result;
      const rows = text.split('\n'); // Diviser le fichier en lignes

      // Extraire les en-têtes du fichier
      const headers = rows[0].split(',').map((header) => header.trim().toLowerCase());

      // Prévisualisation des données
      const preview = rows.slice(0, 5).map((row) => row.split(','));
      setPreviewData(preview);

      // Vérifier si toutes les colonnes requises sont présentes
      const missingColumns = requiredColumns.filter((col) => !headers.includes(col));
      if (missingColumns.length > 0) {
        setError(
          `Le fichier manque des colonnes requises : ${missingColumns.join(', ')}. Veuillez corriger le fichier et réessayer.`
        );
        setIsFileValid(false); // Le fichier n'est pas valide
      } else {
        setError(''); // Réinitialiser l'erreur si toutes les colonnes sont présentes
        setIsFileValid(true); // Le fichier est valide
      }
    };

    reader.readAsText(selectedFile);
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-blue-400'}
          ${error ? 'border-red-500' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="text-6xl">📁</div>
          {isUploading ? (
            <div className="text-blue-400">
              <p className="text-xl font-semibold">Traitement du fichier...</p>
              <progress className="progress progress-info w-56 mt-4" />
            </div>
          ) : (
            <>
              <p className="text-xl font-semibold">
                {isDragActive ? 'Déposez votre fichier ici' : 'Glissez-déposez votre CSV ou cliquez pour sélectionner'}
              </p>
              <p className="text-sm text-gray-400">Taille maximale : 2.00Mo</p>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-400 text-sm mt-2 flex items-center gap-2 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
      {previewData && (
        <div className="mt-4 p-4 border rounded-md overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2 sticky top-0 left-0 w-full">Aperçu des données envoyées :</h3>
          <table className="w-full text-sm">
            <thead>
              <tr>
                {previewData[0].map((header, index) => (
                  <th key={index} className="border px-2 py-1 text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, rowIndex) =>
                rowIndex > 0 && (
                  <tr key={rowIndex}>
                    {row.map((cell, index) => (
                      <td key={index} className="border px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 sticky top-0 left-0 w-full">
            <a href="/overview" target="_self" className="inline-block">
              <button
                className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded focus:outline-none
                  ${!isFileValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                disabled={!isFileValid} // Désactiver le bouton si le fichier n'est pas valide
              >
                Get Started
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataUploader;