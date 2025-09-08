import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Zap, TrendingUp, CheckCircle } from "lucide-react";

export interface AnalysisResult {
  AzureResourceName: string;
  RecommendedPricingTier: string;
  EstimatedMonthlyCost: string;
  Justification: string;
  FeatureHighlights: string[];
  CostSavings: string;
  TierType?: string;
}

interface AnalysisTableProps {
  results: AnalysisResult[];
}

const getTierColor = (tierType: string) => {
  switch (tierType) {
    case "basic":
      return "bg-success/10 text-success border-success/20";
    case "standard":
      return "bg-warning/10 text-warning border-warning/20";
    case "Premium":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted/10 text-muted-foreground border-border";
  }
};

export const AnalysisTable = ({ results }: AnalysisTableProps) => {
  const totalEstimatedCost = results.reduce((sum, result) => {
    const cost = parseFloat(
      result.EstimatedMonthlyCost.replace(/[^0-9.]/g, "")
    );
    return sum + cost;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card className="bg-gradient-surface shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Resources
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {results.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Analyzed successfully
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-surface shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Est. Monthly Cost
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${totalEstimatedCost.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Optimized pricing</p>
          </CardContent>
        </Card>

        {/* <Card className="bg-gradient-surface shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">15-30%</div>
            <p className="text-xs text-muted-foreground">Cost reduction</p>
          </CardContent>
        </Card> */}
      </div>

      {/* Results Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Azure Smart Scale Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Resource Name</TableHead>
                  <TableHead className="font-semibold">
                    Recommended Tier
                  </TableHead>
                  <TableHead className="font-semibold">Monthly Cost</TableHead>
                  <TableHead className="font-semibold">Justification</TableHead>
                  <TableHead className="font-semibold">
                    Feature Highlights
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-foreground">
                          {result.AzureResourceName}
                        </span>
                        {result.CostSavings && (
                          <span className="text-xs text-success">
                            Saves {result.CostSavings}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getTierColor(result.RecommendedPricingTier)}
                      >
                        {result.RecommendedPricingTier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">
                          {result.EstimatedMonthlyCost}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs text-sm text-muted-foreground">
                        {result.Justification}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {result.FeatureHighlights.map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-accent/10 text-accent border-accent/20"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
