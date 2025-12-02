import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Letter } from '../types';

export const generateLetterPdf = async (letter: Letter) => {
  // Create a hidden element to render the letter for canvas capture
  const letterContainer = document.createElement('div');
  
  // Apply styles to match A4 paper aspect ratio and ensure fonts are loaded
  letterContainer.style.width = '210mm';
  letterContainer.style.padding = '20mm';
  letterContainer.style.fontFamily = "'Poppins', 'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'Noto Sans Tamil', sans-serif";
  letterContainer.style.fontSize = '12pt';
  letterContainer.style.lineHeight = '1.6';
  letterContainer.style.position = 'absolute';
  letterContainer.style.left = '-9999px'; // Position off-screen
  letterContainer.style.top = '0';
  letterContainer.style.backgroundColor = 'white';
  letterContainer.style.color = 'black';

  // Use a <pre> tag to respect whitespace and line breaks from the letter content
  const pre = document.createElement('pre');
  pre.style.whiteSpace = 'pre-wrap';
  pre.style.fontFamily = 'inherit';
  pre.textContent = letter.content;
  
  letterContainer.appendChild(pre);
  document.body.appendChild(letterContainer);

  try {
    // Use html2canvas to capture the rendered element
    const canvas = await html2canvas(letterContainer, {
      scale: 2, // Increase scale for better quality
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Create a new PDF in A4 size
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Add the captured image to the PDF, fitting it to the page
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Save the PDF
    pdf.save(`${letter.title.replace(/\s+/g, '_')}.pdf`);

  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("An error occurred while generating the PDF. Please try again.");
  } finally {
    // Clean up by removing the temporary element from the DOM
    document.body.removeChild(letterContainer);
  }
};
