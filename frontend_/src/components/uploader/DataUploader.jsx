import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DataUploader = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) {
      setError('Veuillez sélectionner un fichier CSV');
      return;
    }

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Seuls les fichiers CSV sont acceptés');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      // Simulation d'upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      onUploadSuccess();
    } catch (err) {
      setError("Échec de l'upload, veuillez réessayer");
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
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
              <p className="text-sm text-gray-400">Taille maximale : 10MB</p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm mt-2 flex items-center gap-2 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default DataUploader;