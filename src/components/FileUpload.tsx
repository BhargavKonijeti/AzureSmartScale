import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileJson, AlertCircle, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setUploadStatus('success');
          setErrorMessage('');
          onFileUpload(jsonData);
        } catch (error) {
          setUploadStatus('error');
          setErrorMessage('Invalid JSON format. Please check your file and try again.');
        }
      };
      reader.readAsText(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  return (
    <div className="space-y-4">
      <Card 
        {...getRootProps()} 
        className={`
          p-8 border-2 border-dashed cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-primary bg-primary/5 shadow-glow' 
            : uploadStatus === 'success'
            ? 'border-success bg-success/5'
            : uploadStatus === 'error'
            ? 'border-destructive bg-destructive/5'
            : 'border-border hover:border-primary/50 hover:bg-gradient-surface'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {uploadStatus === 'success' ? (
            <div className="p-3 rounded-full bg-success/10">
              <Check className="h-8 w-8 text-success" />
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-primary/10">
              {isDragActive ? (
                <FileJson className="h-8 w-8 text-primary animate-bounce" />
              ) : (
                <Upload className="h-8 w-8 text-primary" />
              )}
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {uploadStatus === 'success' 
                ? 'File uploaded successfully!' 
                : 'Upload Azure Resource JSON'
              }
            </h3>
            <p className="text-muted-foreground">
              {isDragActive
                ? 'Drop your JSON file here...'
                : uploadStatus === 'success'
                ? 'Ready to analyze your Azure resources'
                : 'Drag and drop your JSON file here, or click to browse'
              }
            </p>
          </div>
          
          {uploadStatus === 'idle' && (
            <div className="text-sm text-muted-foreground">
              Supported formats: .json, .txt
            </div>
          )}
        </div>
      </Card>

      {uploadStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};