/**
 * Unit Tests for Main Calculation Functions
 * Testing the core tuition calculation logic
 */

describe('Main Calculation Functions', () => {
  let originalDocument;
  
  beforeAll(() => {
    // Mock DOM elements
    originalDocument = global.document;
    global.document = {
      getElementById: jest.fn(),
      getElementsByClassName: jest.fn(),
      createElement: jest.fn(),
      addEventListener: jest.fn(),
    };
    
    // Load required global variables and functions
    global.sede = null;
    global.carrera = null;
    global.coop = null;
    global.ucbase = 0;
    global.uctotal = 0;
    global.ucpagar = 0;
    global.totalbs = 0;
    global.valorUC = 17.00;
    global.formatNumber = {
      new: jest.fn((num, symbol, isProc) => `${symbol || ''}${num}`)
    };
    
    // Mock alert function
    global.alert = jest.fn();
    
    // Mock required functions
    global.totalizacion = jest.fn();
    global.showPeriodo = jest.fn();
    global.getUCfecha = jest.fn().mockReturnValue('17.00');
    global.getCustomUCValue = jest.fn();
  });

  afterAll(() => {
    global.document = originalDocument;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.sede = null;
    global.carrera = null;
    global.coop = null;
    
    // Mock alertmsg element
    const alertElement = { style: { display: 'block' } };
    global.document.getElementById.mockImplementation((id) => {
      if (id === 'alertmsg') return alertElement;
      return { style: { display: 'block' }, innerHTML: '' };
    });
  });

  describe('calcularMatricula()', () => {
    // Load the function
    beforeAll(() => {
      const fs = require('fs');
      const path = require('path');
      const mainJsContent = fs.readFileSync(path.join(__dirname, '../../js/main.js'), 'utf8');
      
      // Extract and evaluate only the calcularMatricula function
      const funcMatch = mainJsContent.match(/function calcularMatricula\(\) \{[\s\S]*?\n\}/);
      if (funcMatch) {
        eval(funcMatch[0]);
      }
    });

    test('should calculate matricula when all required fields are selected', () => {
      global.sede = 'ccs';
      global.carrera = 'ing-informatica';
      global.coop = 'ninguna';
      
      calcularMatricula();
      
      expect(global.document.getElementById).toHaveBeenCalledWith('alertmsg');
      expect(global.totalizacion).toHaveBeenCalled();
      expect(global.showPeriodo).toHaveBeenCalled();
    });

    test('should show alert when sede is not selected', () => {
      global.sede = null;
      global.carrera = 'ing-informatica';
      global.coop = 'ninguna';
      
      calcularMatricula();
      
      expect(global.alert).toHaveBeenCalledWith('Debes seleccionar una sede, carrera y ayuda economica!');
      expect(global.totalizacion).not.toHaveBeenCalled();
    });

    test('should show alert when carrera is not selected', () => {
      global.sede = 'ccs';
      global.carrera = null;
      global.coop = 'ninguna';
      
      calcularMatricula();
      
      expect(global.alert).toHaveBeenCalledWith('Debes seleccionar una sede, carrera y ayuda economica!');
      expect(global.totalizacion).not.toHaveBeenCalled();
    });

    test('should show alert when coop is not selected', () => {
      global.sede = 'ccs';
      global.carrera = 'ing-informatica';
      global.coop = null;
      
      calcularMatricula();
      
      expect(global.alert).toHaveBeenCalledWith('Debes seleccionar una sede, carrera y ayuda economica!');
      expect(global.totalizacion).not.toHaveBeenCalled();
    });

    test('should hide alert message when calculation is successful', () => {
      global.sede = 'ccs';
      global.carrera = 'ing-informatica';
      global.coop = 'ninguna';
      
      const alertElement = { style: { display: 'block' } };
      global.document.getElementById.mockReturnValue(alertElement);
      
      calcularMatricula();
      
      expect(alertElement.style.display).toBe('none');
    });
  });

  describe('formatNumber utility', () => {
    beforeAll(() => {
      // Load the actual formatNumber object
      const fs = require('fs');
      const path = require('path');
      const mainJsContent = fs.readFileSync(path.join(__dirname, '../../js/main.js'), 'utf8');
      
      // Extract and evaluate the formatNumber object
      const formatMatch = mainJsContent.match(/let formatNumber = \{[\s\S]*?\};/);
      if (formatMatch) {
        eval(formatMatch[0]);
        global.formatNumber = formatNumber;
      }
    });

    test('should format numbers with separators correctly', () => {
      const result = formatNumber.new(1234567.89, 'USD ', true);
      expect(result).toBe('USD 1.234.567,89');
    });

    test('should handle integer numbers', () => {
      const result = formatNumber.new(1234, 'USD ', false);
      expect(result).toBe('USD 1.234');
    });

    test('should handle zero values', () => {
      const result = formatNumber.new(0, 'USD ', true);
      expect(result).toBe('USD 0,00');
    });

    test('should handle negative values', () => {
      const result = formatNumber.new(-1234.56, 'USD ', true);
      expect(result).toBe('USD -1.234,56');
    });

    test('should work without symbol', () => {
      const result = formatNumber.new(1234.56, '', true);
      expect(result).toBe('1.234,56');
    });

    test('should handle very large numbers', () => {
      const result = formatNumber.new(1234567890.12, 'USD ', true);
      expect(result).toBe('USD 1.234.567.890,12');
    });
  });

  describe('Seat Discount Calculation', () => {
    beforeAll(() => {
      // Load GetMontoTarifa function
      const fs = require('fs');
      const path = require('path');
      const mainJsContent = fs.readFileSync(path.join(__dirname, '../../js/main.js'), 'utf8');
      
      // Extract GetMontoTarifa function
      const funcMatch = mainJsContent.match(/function GetMontoTarifa\(fecha\) \{[\s\S]*?\n\}/);
      if (funcMatch) {
        eval(funcMatch[0]);
      }
    });

    test('should apply 20% discount for Guayana sede', () => {
      global.sede = 'g';
      global.ucpagar = 10;
      global.getUCfecha = jest.fn().mockReturnValue(17.00);
      
      const result = GetMontoTarifa(new Date());
      expect(result).toBe(17.00 * 10 * 0.8); // 20% discount
    });

    test('should apply 20% discount for Los Teques sede', () => {
      global.sede = 'tq';
      global.ucpagar = 10;
      global.getUCfecha = jest.fn().mockReturnValue(17.00);
      
      const result = GetMontoTarifa(new Date());
      expect(result).toBe(17.00 * 10 * 0.8); // 20% discount
    });

    test('should not apply discount for Caracas sede', () => {
      global.sede = 'ccs';
      global.ucpagar = 10;
      global.getUCfecha = jest.fn().mockReturnValue(17.00);
      
      const result = GetMontoTarifa(new Date());
      expect(result).toBe(17.00 * 10); // No discount
    });

    test('should handle zero UC correctly', () => {
      global.sede = 'ccs';
      global.ucpagar = 0;
      global.getUCfecha = jest.fn().mockReturnValue(17.00);
      
      const result = GetMontoTarifa(new Date());
      expect(result).toBe(0);
    });
  });

  describe('Global Variable Initialization', () => {
    beforeAll(() => {
      // Load initVar function
      const fs = require('fs');
      const path = require('path');
      const mainJsContent = fs.readFileSync(path.join(__dirname, '../../js/main.js'), 'utf8');
      
      // Mock required functions for initVar
      global.LoadUC = jest.fn();
      global.cleanTabla = jest.fn();
      global.cleanTableMat = jest.fn();
      global.actualizarTotalUC = jest.fn();
      global.totalizarDonacion = jest.fn();
      global.loadMes = jest.fn().mockReturnValue('JULIO');
      global.getUCfecha = jest.fn().mockReturnValue('17.00');
      global.getFistDayThisMonth = jest.fn().mockReturnValue(new Date());
      global.formatNumber = { new: jest.fn().mockReturnValue('17.00 USD') };
      
      // Mock DOM manipulation
      global.document.getElementById.mockImplementation((id) => {
        if (id === 'mesActual') return { innerHTML: '' };
        if (id === 'sName') return { innerHTML: '', parentElement: { children: [null, null, { style: { display: 'block' } }] } };
        return { style: { display: 'block' }, innerHTML: '' };
      });
      
      // Extract initVar function
      const funcMatch = mainJsContent.match(/function initVar\(md\) \{[\s\S]*?\n\}/);
      if (funcMatch) {
        eval(funcMatch[0]);
      }
    });

    test('should initialize variables correctly for UC mode', () => {
      global.valorUC = 17.00;
      
      initVar('UC');
      
      expect(global.LoadUC).toHaveBeenCalled();
      expect(global.vrealUC).toBe(17.00);
      expect(global.visualUC).toBe(0);
      expect(global.ucbase).toBe(0);
      expect(global.uctotal).toBe(0);
      expect(global.ucpagar).toBe(0);
      expect(global.totalbs).toBe(0);
      expect(global.ucrec).toBe(0);
      expect(global.sede).toBe('');
      expect(global.carrera).toBe('');
      expect(global.materias).toBe('');
      expect(global.coop).toBe('');
      expect(global.cober).toBe('');
      expect(global.mode).toBe('UC');
    });

    test('should initialize variables correctly for FAB mode', () => {
      global.valorUC = 17.00;
      
      initVar('FAB');
      
      expect(global.LoadUC).toHaveBeenCalled();
      expect(global.mode).toBe('FAB');
      expect(global.totalizarDonacion).toHaveBeenCalled();
    });

    test('should clean tables and update totals', () => {
      initVar('UC');
      
      expect(global.cleanTabla).toHaveBeenCalled();
      expect(global.cleanTableMat).toHaveBeenCalled();
      expect(global.actualizarTotalUC).toHaveBeenCalled();
    });
  });
});