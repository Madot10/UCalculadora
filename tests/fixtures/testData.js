// Test data fixtures for UCalculadora tests
module.exports = {
  mockUCByPeriodo: {
    "verano": {
      "base": 17.00
    },
    "semestre": {
      "base": 17.00,
      "variacion": [17.00, 17.50, 18.00, 18.50, 19.00]
    }
  },

  mockCareerData: {
    "ing-informatica": {
      "name": "Ingeniería Informática",
      "sede": ["ccs", "g", "tq"],
      "credits": 180
    },
    "derecho": {
      "name": "Derecho", 
      "sede": ["ccs"],
      "credits": 160
    }
  },

  mockSubjects: [
    {
      "id": "mat-001",
      "name": "Matemática I",
      "credits": 4,
      "taxonomy": "T1"
    },
    {
      "id": "fis-001", 
      "name": "Física I",
      "credits": 4,
      "taxonomy": "T2"
    },
    {
      "id": "prog-001",
      "name": "Programación I", 
      "credits": 3,
      "taxonomy": "T3"
    }
  ],

  mockCalculationResults: {
    basic: {
      ucbase: 15,
      uctotal: 15,
      ucpagar: 15,
      totalbs: 255.00
    },
    withDiscount: {
      ucbase: 15,
      uctotal: 15, 
      ucpagar: 12, // 20% discount applied
      totalbs: 204.00
    }
  },

  customUCValues: {
    current: 25.00,
    monthly: {
      "2": 26.00,
      "3": 27.00,
      "4": 28.00,
      "5": 29.00
    }
  }
};