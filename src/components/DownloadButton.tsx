import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, File } from "lucide-react";
import { AnalysisResult } from "@/components/AnalysisTable";
import { exportToPDF, exportToWord } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface DownloadButtonProps {
  results: AnalysisResult[];
}

export const DownloadButton = ({ results }: DownloadButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      exportToPDF(results);
      toast({
        title: "Export Successful",
        description: "Analysis report has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      await exportToWord(results);
      toast({
        title: "Export Successful",
        description: "Analysis report has been downloaded as Word document.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export Word document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="gap-2" disabled={isExporting}>
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Download Report"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF} className="gap-2">
          <FileText className="h-4 w-4" />
          Download as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportWord} className="gap-2">
          <File className="h-4 w-4" />
          Download as Word
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
