import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import logo from '../../assets/logo.png';

const HospitalReportPDFGenerator = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    doc.addImage(logo, 'PNG', 20, 10, 40, 40);

    // Set colors
    const primaryColor = '#3B82F6'; // Blue
    const secondaryColor = '#1F2937'; // Dark Gray

    // Add title
    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    doc.text('Hospital Appointment', 70, 30);
    doc.text('Dashboard Report', 70, 40);

    // Add horizontal line
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    // Add overview
    doc.setFontSize(16);
    doc.setTextColor(secondaryColor);
    doc.text('Overview', 20, 70);
    doc.setFontSize(12);
    doc.text('This dashboard manages and visualizes hospital appointment data, providing', 20, 80);
    doc.text('features for data display, filtering, sorting, and analysis.', 20, 87);

    // Add key features
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text('Key Features', 20, 105);
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    const features = [
      'Data Fetching and State Management',
      'Date Filtering',
      'Data Visualization',
      'Sortable Table Display',
      'Status Indication',
      'Patient Details Popup'
    ];
    features.forEach((feature, index) => {
      doc.circle(25, 115 + (index * 10), 1, 'F');
      doc.text(feature, 30, 118 + (index * 10));
    });

    // Add performance considerations
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text('Performance Considerations', 20, 185);
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.circle(25, 195, 1, 'F');
    doc.text('Efficient data processing methods', 30, 198);
    doc.circle(25, 205, 1, 'F');
    doc.text('Optimized React state management', 30, 208);

    // Add user experience enhancements
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text('User Experience Enhancements', 20, 225);
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.circle(25, 235, 1, 'F');
    doc.text('Loading indicators and error messages', 30, 238);
    doc.circle(25, 245, 1, 'F');
    doc.text('Interactive elements and hover effects', 30, 248);

    // Add potential improvements
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text('Potential Improvements', 20, 265);
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    const improvements = [
      'Implement pagination for large datasets',
      'Add more filtering options',
      'Implement data caching',
      'Add export functionality',
      'Enhance accessibility features'
    ];
    improvements.forEach((improvement, index) => {
      doc.circle(25, 275 + (index * 10), 1, 'F');
      doc.text(improvement, 30, 278 + (index * 10));
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text('Generated on ' + new Date().toLocaleDateString(), 20, 285);

    // Save the PDF
    doc.save('hospital_appointment_dashboard_report.pdf');
  };

  return (
    <button 
      onClick={generatePDF}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <img src={logo} alt="Logo" className="w-6 h-6 mr-2" />
      Generate PDF Report
    </button>
  );
};

export default HospitalReportPDFGenerator;