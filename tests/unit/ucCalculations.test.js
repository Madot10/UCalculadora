/**
 * Unit Tests for Core UC Calculation Functions
 * Testing custom UC value functionality and core calculation logic
 */

const { customUCValues } = require('../fixtures/testData.js');

// Load the main.js file to test its functions
let mainJsContent;
beforeAll(async () => {
  const fs = require('fs');
  const path = require('path');
  mainJsContent = fs.readFileSync(path.join(__dirname, '../../js/main.js'), 'utf8');
  
  // Execute the main.js content in test environment
  // We need to create a mock environment for the global variables
  global.ucByPeriodo = {
    "verano": { "base": 17.00 },
    "semestre": { 
      "base": 17.00,
      "variacion": [17.00, 17.50, 18.00, 18.50, 19.00]
    }
  };
  global.perioact = 2; // semestre
  global.monthMapping = { 1: null, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null };
  
  // Execute the functions we need to test
  eval(mainJsContent);
});

describe('UC Custom Value Functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getCustomUCValue()', () => {
    test('should return null when no custom value is stored', () => {
      expect(getCustomUCValue()).toBeNull();
    });

    test('should return stored custom UC value', () => {
      localStorage.setItem('customUCValue', '25.50');
      expect(getCustomUCValue()).toBe(25.50);
    });

    test('should handle invalid stored values gracefully', () => {
      localStorage.setItem('customUCValue', 'invalid');
      expect(getCustomUCValue()).toBeNaN();
    });

    test('should handle zero values correctly', () => {
      localStorage.setItem('customUCValue', '0');
      expect(getCustomUCValue()).toBe(0);
    });
  });

  describe('getMonthlyUCValues()', () => {
    test('should return empty object when no monthly values stored', () => {
      expect(getMonthlyUCValues()).toEqual({});
    });

    test('should return stored monthly UC values', () => {
      const monthlyValues = { "2": 26.00, "3": 27.00 };
      localStorage.setItem('monthlyUCValues', JSON.stringify(monthlyValues));
      expect(getMonthlyUCValues()).toEqual(monthlyValues);
    });

    test('should handle corrupted JSON gracefully', () => {
      localStorage.setItem('monthlyUCValues', 'invalid json');
      expect(() => getMonthlyUCValues()).toThrow();
    });
  });

  describe('setMonthlyUCValues()', () => {
    test('should store monthly values in localStorage', () => {
      const values = { "2": 26.00, "3": 27.00 };
      setMonthlyUCValues(values);
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'monthlyUCValues', 
        JSON.stringify(values)
      );
    });

    test('should remove localStorage item when called with empty values', () => {
      setMonthlyUCValues({});
      expect(localStorage.removeItem).toHaveBeenCalledWith('monthlyUCValues');
    });

    test('should handle null values', () => {
      setMonthlyUCValues(null);
      expect(localStorage.removeItem).toHaveBeenCalledWith('monthlyUCValues');
    });
  });

  describe('getUCForMonth()', () => {
    test('should return monthly specific value when available', () => {
      const monthlyValues = { "3": 27.00 };
      localStorage.setItem('monthlyUCValues', JSON.stringify(monthlyValues));
      
      expect(getUCForMonth(3)).toBe(27.00);
    });

    test('should fall back to custom value when monthly value not available', () => {
      localStorage.setItem('customUCValue', '25.00');
      
      expect(getUCForMonth(3)).toBe(25.00);
    });

    test('should fall back to default calculation when no custom values', () => {
      // Mock the getUCfecha function to return a known value
      global.getUCfecha = jest.fn().mockReturnValue('17.50');
      
      const result = getUCForMonth(3);
      expect(result).toBe(17.50);
    });
  });
});

describe('LoadUC Function', () => {
  beforeEach(() => {
    localStorage.clear();
    global.hoy = new Date('2024-07-15');
    global.perioact = 2;
    global.valorUC = 0;
    global.uc = 0;
  });

  test('should use custom UC value when available', () => {
    localStorage.setItem('customUCValue', '25.00');
    
    LoadUC();
    
    expect(global.valorUC).toBe(25.00);
  });

  test('should use default UC value when no custom value', () => {
    // Mock getUCfecha to return default value
    global.getUCfecha = jest.fn().mockReturnValue(17.50);
    
    LoadUC();
    
    expect(global.valorUC).toBe(17.50);
    expect(global.getUCfecha).toHaveBeenCalledWith(global.hoy, global.perioact);
  });
});

describe('getUCfecha Function', () => {
  beforeEach(() => {
    localStorage.clear();
    global.ucByPeriodo = {
      "verano": { "base": 17.00 },
      "semestre": { 
        "base": 17.00,
        "variacion": [17.00, 17.50, 18.00, 18.50, 19.00]
      }
    };
    global.monthMapping = { 
      1: null, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 
      7: null, 8: null, 9: null, 10: null, 11: null, 12: null 
    };
  });

  test('should return custom value when useCustom is true and custom value exists', () => {
    localStorage.setItem('customUCValue', '25.00');
    
    const result = getUCfecha(new Date('2024-03-15'), null, true);
    expect(result).toBe('25.00');
  });

  test('should ignore custom value when useCustom is false', () => {
    localStorage.setItem('customUCValue', '25.00');
    
    const result = getUCfecha(new Date('2024-03-15'), null, false);
    expect(parseFloat(result)).toBe(17.50); // March is month 2 in variation array
  });

  test('should return correct UC for verano period (summer)', () => {
    const result = getUCfecha(new Date('2024-01-15'), 1, false); // Force verano
    expect(parseFloat(result)).toBe(17.00);
  });

  test('should return correct UC for semestre period based on month', () => {
    const result = getUCfecha(new Date('2024-04-15'), null, false); // April = month 3
    expect(parseFloat(result)).toBe(18.00); // variacion[2] = 18.00
  });

  test('should handle edge case months correctly', () => {
    const result = getUCfecha(new Date('2024-07-15'), null, false); // July (no mapping)
    expect(parseFloat(result)).toBe(17.00); // Should use base for verano
  });
});

describe('getUCMes Function', () => {
  beforeEach(() => {
    localStorage.clear();
    global.ucByPeriodo = {
      "verano": { "base": 17.00 },
      "semestre": { 
        "base": 17.00,
        "variacion": [17.00, 17.50, 18.00, 18.50, 19.00]
      }
    };
    global.perioact = 2; // semestre
  });

  test('should return monthly specific custom value when available', () => {
    const monthlyValues = { "3": 27.00 };
    localStorage.setItem('monthlyUCValues', JSON.stringify(monthlyValues));
    
    const result = getUCMes(3);
    expect(result).toBe('27.00');
  });

  test('should fall back to general custom value', () => {
    localStorage.setItem('customUCValue', '25.00');
    
    const result = getUCMes(3);
    expect(result).toBe('25.00');
  });

  test('should use default calculation for semestre', () => {
    const result = getUCMes(3);
    expect(parseFloat(result)).toBe(18.00); // variacion[3-1] = variacion[2]
  });

  test('should handle verano period correctly', () => {
    global.perioact = 1; // verano
    
    const result = getUCMes(3);
    expect(parseFloat(result)).toBe(17.00); // base value for verano
  });
});

describe('Input Validation', () => {
  test('should handle string input in numeric functions', () => {
    localStorage.setItem('customUCValue', '25.50');
    expect(typeof getCustomUCValue()).toBe('number');
  });

  test('should handle decimal precision correctly', () => {
    const result = getUCfecha(new Date('2024-03-15'), null, false);
    expect(result).toMatch(/^\d+\.\d{2}$/); // Should have 2 decimal places
  });

  test('should handle boundary month values', () => {
    expect(() => getUCMes(1)).not.toThrow();
    expect(() => getUCMes(12)).not.toThrow();
  });
});