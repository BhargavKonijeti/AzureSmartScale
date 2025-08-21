import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import { AnalysisResult } from "@/components/AnalysisTable";

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

export const exportToPDF = (results: AnalysisResult[]) => {
  try {
    console.log("Starting PDF export with results:", results.length);

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Azure Smart Scale Analysis Report", 20, 20);

    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);

    // Summary
    const totalCost = results.reduce((sum, result) => {
      const cost = parseFloat(
        result.EstimatedMonthlyCost.replace(/[^0-9.]/g, "")
      );
      return sum + cost;
    }, 0);

    doc.text(`Total Resources: ${results.length}`, 20, 50);
    doc.text(`Estimated Monthly Cost: $${totalCost.toFixed(2)}`, 20, 60);
    doc.text("Optimization Potential: 15-30% cost reduction", 20, 70);

    // Table
    const tableData = results.map((result) => [
      result.AzureResourceName,
      result.RecommendedPricingTier,
      result.EstimatedMonthlyCost,
      result.Justification.substring(0, 100) + "...", // Truncate long text
      result.FeatureHighlights.slice(0, 3).join(", "), // Limit features
    ]);

    autoTable(doc, {
      head: [
        [
          "Resource Name",
          "Recommended Tier",
          "Monthly Cost",
          "Justification",
          "Features",
        ],
      ],
      body: tableData,
      startY: 85,
      styles: { fontSize: 8 },
      columnStyles: {
        3: { cellWidth: 40 },
        4: { cellWidth: 35 },
      },
    });

    console.log("PDF generation complete, starting download");
    doc.save("azure-analysis-report.pdf");
    console.log("PDF download initiated");
  } catch (error) {
    console.error("PDF export error:", error);
    throw error;
  }
};

export const exportToWord = async (results: AnalysisResult[]) => {
  try {
    console.log("Starting Word export with results:", results.length);

    const totalCost = results.reduce((sum, result) => {
      const cost = parseFloat(
        result.EstimatedMonthlyCost.replace(/[^0-9.]/g, "")
      );
      return sum + cost;
    }, 0);

    // Create table rows
    const tableRows = results.map(
      (result) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(result.AzureResourceName)],
            }),
            new TableCell({
              children: [new Paragraph(result.RecommendedPricingTier)],
            }),
            new TableCell({
              children: [new Paragraph(result.EstimatedMonthlyCost)],
            }),
            new TableCell({
              children: [
                new Paragraph(result.Justification.substring(0, 200) + "..."),
              ], // Truncate
            }),
            new TableCell({
              children: [
                new Paragraph(result.FeatureHighlights.slice(0, 3).join(", ")),
              ], // Limit features
            }),
          ],
        })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Azure Smart Scale Analysis Report",
                  bold: true,
                  size: 32,
                }),
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated on: ${new Date().toLocaleDateString()}`,
                  size: 24,
                }),
              ],
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Summary",
                  bold: true,
                  size: 28,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Total Resources: ${results.length}`,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Estimated Monthly Cost: $${totalCost.toFixed(2)}`,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Optimization Potential: 15-30% cost reduction",
                  size: 24,
                }),
              ],
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Detailed Analysis",
                  bold: true,
                  size: 28,
                }),
              ],
              heading: HeadingLevel.HEADING_1,
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Resource Name", bold: true }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Recommended Tier",
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Monthly Cost", bold: true }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Justification", bold: true }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Features", bold: true }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                ...tableRows,
              ],
            }),
          ],
        },
      ],
    });

    console.log("Word document created, generating buffer");
    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    console.log("Starting Word document download");
    saveAs(blob, "azure-analysis-report.docx");
    console.log("Word download initiated");
  } catch (error) {
    console.error("Word export error:", error);
    throw error;
  }
};
