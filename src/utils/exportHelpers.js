import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) return;
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (title, dataString, filename = 'report.pdf') => {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  const splitText = doc.splitTextToSize(dataString, 170);
  doc.text(splitText, 20, 35);
  
  doc.save(filename);
};
