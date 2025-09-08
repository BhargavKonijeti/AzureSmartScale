import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisTable, AnalysisResult } from "@/components/AnalysisTable";
import { LoadingState } from "@/components/LoadingState";
import { DownloadButton } from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudLightning, Sparkles, RotateCcw, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeAzureResources } from "@/lib/azureAnalysis";

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<
    AnalysisResult[] | null
  >(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = async (data: any) => {
    setUploadedData(data);
    setIsAnalyzing(true);

    try {
      const results = await analyzeAzureResources(data);
      setAnalysisResults(results);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${results.length} Azure resources.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing your Azure resources. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResults(null);
    setUploadedData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <CloudLightning className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Azure Smart Scale</h1>
                <p className="text-primary-foreground/80">
                  AI-powered Azure resource optimization and cost analysis
                </p>
              </div>
            </div>
            <Badge className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {!uploadedData && !isAnalyzing && !analysisResults && (
          <Card className="max-w-4xl mx-auto shadow-lg bg-gradient-surface">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">
                Get Started with Smart Scaling
              </CardTitle>
              <p className="text-muted-foreground">
                Upload your Azure resource configuration JSON file to receive
                AI-powered optimization recommendations and cost analysis.
              </p>
            </CardHeader>
            <CardContent>
              <FileUpload onFileUpload={handleFileUpload} />
            </CardContent>
          </Card>
        )}

        {isAnalyzing && (
          <div className="max-w-2xl mx-auto">
            <LoadingState isAnalyzing={isAnalyzing} />
          </div>
        )}

        {analysisResults && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Optimization Results
                </h2>
                <p className="text-muted-foreground">
                  AI-generated recommendations for your Azure resources
                </p>
              </div>
              <div className="flex gap-2">
                <DownloadButton results={analysisResults} />
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Analyze New File
                </Button>
              </div>
            </div>

            <AnalysisTable results={analysisResults} />
          </div>
        )}

        {/* Features Section */}
        {!uploadedData && !isAnalyzing && !analysisResults && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Why Choose Azure Smart Scale?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Card className="text-center shadow-md bg-gradient-surface">
                <CardContent className="pt-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <CloudLightning className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Smart Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered analysis of your Azure resources for optimal
                    performance and cost efficiency.
                  </p>
                </CardContent>
              </Card>


              <Card className="text-center shadow-md bg-gradient-surface">
                <CardContent className="pt-6">
                  <div className="p-3 rounded-full bg-accent/10 w-fit mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Instant Insights
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed justifications and feature highlights for each
                    recommendation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
