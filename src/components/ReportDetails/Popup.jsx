import React from 'react';
import { Calendar, Mail, Stethoscope, Clock } from 'lucide-react';

// Refactoring Technique: Extract Constants
// Improves maintainability by centralizing common values
const CONSTANTS = {
  ANIMATIONS: {
    FADE_IN: 'animate-fadeIn',
    SCALE_IN: 'animate-scaleIn'
  },
  LABELS: {
    PATIENT_INFO: 'Patient Information',
    GENDER: 'Gender',
    EMAIL: 'Email',
    DOCTOR: 'Doctor',
    TIME: 'Time',
    CLOSE: 'Close'
  }
};

// Refactoring Technique: Add Comments
// Improves code documentation and readability
/**
 * Popup component for displaying patient information
 * @param {Object} props - Component props
 * @param {Object} props.patient - Patient data
 * @param {Function} props.onClose - Function to close the popup
 */
const Popup = ({ patient, onClose }) => {
  // Refactoring Technique: Early Return
  // Improves code clarity by handling edge cases early
  if (!patient) return null;

  return (
    // Refactoring Technique: Use Template Literals
    // Improves readability when combining strings and variables
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${CONSTANTS.ANIMATIONS.FADE_IN}`}>
      <div className={`bg-white rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 ease-in-out ${CONSTANTS.ANIMATIONS.SCALE_IN}`}>
        <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg">
          <h2 className="text-3xl font-bold text-white mb-2">{CONSTANTS.LABELS.PATIENT_INFO}</h2>
          <p className="text-blue-100">{patient.fullName}</p>
        </div>
        <div className="p-6 space-y-6">
          {/* Refactoring Technique: Component Extraction
              Improves reusability and reduces code duplication */}
          <InfoItem icon={Calendar} label={CONSTANTS.LABELS.GENDER} value={patient.gender} />
          <InfoItem icon={Mail} label={CONSTANTS.LABELS.EMAIL} value={patient.email} />
          <InfoItem icon={Stethoscope} label={CONSTANTS.LABELS.DOCTOR} value={patient.doctor} />
          <InfoItem icon={Clock} label={CONSTANTS.LABELS.TIME} value={patient.time} />
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <button 
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            {CONSTANTS.LABELS.CLOSE}
          </button>
        </div>
      </div>
    </div>
  );
};

// Refactoring Technique: Component Extraction
// Improves reusability and reduces code duplication
/**
 * Component to display an information item with an icon
 * @param {Object} props - Component props
 * @param {Function} props.icon - Icon component
 * @param {string} props.label - Label for the information
 * @param {string} props.value - Value of the information
 */
const InfoItem = ({ icon: Icon, label, value }) => (
  // Refactoring Technique: Consistent Formatting
  // Improves code readability
  <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-md hover:bg-white">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
      <Icon className="h-6 w-6 text-blue-500" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

// Refactoring Technique: Export Default
// Improves module usage flexibility
export default Popup;