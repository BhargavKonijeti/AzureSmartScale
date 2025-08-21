import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LoadingStateProps {
  isAnalyzing: boolean;
}

export const LoadingState = ({ isAnalyzing }: LoadingStateProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, label: 'Parsing JSON data', duration: 1000 },
    { icon: Zap, label: 'Analyzing with AI', duration: 2000 },
    { icon: TrendingUp, label: 'Generating recommendations', duration: 1500 }
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    let totalDuration = 0;
    let currentProgress = 0;

    const intervals: NodeJS.Timeout[] = [];

    steps.forEach((step, index) => {
      const startTime = totalDuration;
      totalDuration += step.duration;

      const interval = setTimeout(() => {
        setCurrentStep(index);
        
        const stepInterval = setInterval(() => {
          currentProgress += (100 / steps.length) / (step.duration / 100);
          setProgress(Math.min(currentProgress, (index + 1) * (100 / steps.length)));
        }, 100);

        intervals.push(stepInterval);

        setTimeout(() => {
          clearInterval(stepInterval);
        }, step.duration);
      }, startTime);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <Card className="bg-gradient-surface shadow-lg border-primary/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10 shadow-glow">
            <CurrentIcon className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Analyzing Your Azure Resources
        </h3>
        <p className="text-muted-foreground">
          {steps[currentStep]?.label || 'Processing...'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-1 transition-colors ${
                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <step.icon className="h-3 w-3" />
              <span className="hidden sm:inline">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-muted-foreground">
          This may take a few moments...
        </div>
      </CardContent>
    </Card>
  );
};