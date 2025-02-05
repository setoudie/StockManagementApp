import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const DataUploader = ({ onUploadSuccess = () => {} }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewData, setPreviewData] = useState(null); // Pour stocker l'aperçu des données
  const [file, setFile] = useState(null); // Pour stocker le fichier sélectionné

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier CSV');
      return;
    }
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setError('Seuls les fichiers CSV sont acceptés');
      return;
    }

    setFile(selectedFile); // Mettre à jour le fichier sélectionné

    // Lecture du fichier CSV pour afficher un aperçu
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const rows = text.split('\n').slice(0, 5); // Prendre les 5 premières lignes pour l'aperçu
      const preview = rows.map(row => row.split(','));
      setPreviewData(preview); // Mettre à jour l'aperçu
    };
    reader.readAsText(selectedFile);

    try {
      setIsUploading(true);
      setError('');

      // Préparez le form-data pour l'envoi du fichier
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Remplacez l'URL par celle de votre backend Flask
      const response = await axios.post('http://127.0.0.1:5000/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Vérifie si onUploadSuccess est une fonction avant de l'appeler
      if (typeof onUploadSuccess === 'function') {
        onUploadSuccess(response.data);
      } else {
        console.warn("La fonction onUploadSuccess n'est pas définie");
      }
    } catch (err) {
      console.error("Erreur lors de l'upload :", err);
      setError("Échec de l'upload, veuillez réessayer");
    } finally {
      setIsUploading(false);
    }
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
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none"
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