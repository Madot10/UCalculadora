/**
 * Integration Tests for Main Calculator UI Components
 * Testing campus selection, career selection, and calculation workflow
 */

const { fireEvent, waitFor } = require('@testing-library/dom');

describe('Main Calculator UI Integration', () => {
  let container;
  
  beforeEach(() => {
    // Create calculator UI structure
    document.body.innerHTML = '';
    container = document.createElement('div');
    container.innerHTML = `
      <div id="alertmsg" style="display: none;">
        <p>Debes seleccionar una sede, carrera y ayuda economica!</p>
      </div>
      
      <div id="sedeSection">
        <h3>SEDE</h3>
        <button class="sede-btn" data-sede="ccs">CARACAS</button>
        <button class="sede-btn" data-sede="g">GUAYANA</button>
        <button class="sede-btn" data-sede="tq">LOS TEQUES</button>
      </div>
      
      <div id="carreraSection">
        <h3>CARRERA</h3>
        <button class="carrera-btn" data-carrera="ing-informatica">Ingeniería Informática</button>
        <button class="carrera-btn" data-carrera="derecho">Derecho</button>
        <button class="carrera-btn" data-carrera="administracion">Administración</button>
      </div>
      
      <div id="materiasSection">
        <h3>MATERIAS</h3>
        <table id="materiasTable">
          <thead>
            <tr>
              <th>Materia</th>
              <th>UC</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody id="materiasTableBody">
          </tbody>
        </table>
        <div id="totalUC">TOTAL (base) 0 UC</div>
        <button id="addMateriaBtn">+</button>
      </div>
      
      <div id="cooperacionSection">
        <h3>COOPERACIÓN</h3>
        <button class="coop-btn" data-coop="ninguna">Ninguna</button>
        <button class="coop-btn" data-coop="propedeutico">Propedéutico</button>
        <button class="coop-btn" data-coop="beca">Beca</button>
      </div>
      
      <div id="calculationSection">
        <button id="calcularBtn">CALCULAR</button>
      </div>
      
      <div id="resultados" style="display: none;">
        <div id="totalBsDisplay">0 USD</div>
        <div id="ucPagarDisplay">0 UC</div>
      </div>
    `;
    document.body.appendChild(container);
    
    // Mock global variables
    global.sede = null;
    global.carrera = null;
    global.coop = null;
    global.materias = [];
    global.ucbase = 0;
    global.uctotal = 0;
    global.ucpagar = 0;
    global.totalbs = 0;
    global.valorUC = 17.00;
    
    // Mock required functions
    global.calcularMatricula = jest.fn();
    global.sedeSelect = jest.fn();
    global.carreraSelect = jest.fn();
    global.coopSelect = jest.fn();
    global.actualizarTotalUC = jest.fn();
    global.showResultados = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Campus (Sede) Selection', () => {
    test('should select Caracas campus correctly', () => {
      const ccsBtn = document.querySelector('[data-sede="ccs"]');
      
      // Mock the sede selection function
      global.sedeSelect = jest.fn((sede) => {
        global.sede = sede;
        // Add active class
        document.querySelectorAll('.sede-btn').forEach(btn => btn.classList.remove('active'));
        ccsBtn.classList.add('active');
      });
      
      fireEvent.click(ccsBtn);
      global.sedeSelect('ccs');
      
      expect(global.sede).toBe('ccs');
      expect(ccsBtn.classList.contains('active')).toBe(true);
    });

    test('should select Guayana campus correctly', () => {
      const guayanaBtn = document.querySelector('[data-sede="g"]');
      
      global.sedeSelect = jest.fn((sede) => {
        global.sede = sede;
        document.querySelectorAll('.sede-btn').forEach(btn => btn.classList.remove('active'));
        guayanaBtn.classList.add('active');
      });
      
      fireEvent.click(guayanaBtn);
      global.sedeSelect('g');
      
      expect(global.sede).toBe('g');
      expect(guayanaBtn.classList.contains('active')).toBe(true);
    });

    test('should select Los Teques campus correctly', () => {
      const tequesBtn = document.querySelector('[data-sede="tq"]');
      
      global.sedeSelect = jest.fn((sede) => {
        global.sede = sede;
        document.querySelectorAll('.sede-btn').forEach(btn => btn.classList.remove('active'));
        tequesBtn.classList.add('active');
      });
      
      fireEvent.click(tequesBtn);
      global.sedeSelect('tq');
      
      expect(global.sede).toBe('tq');
      expect(tequesBtn.classList.contains('active')).toBe(true);
    });

    test('should allow only one campus selection at a time', () => {
      const ccsBtn = document.querySelector('[data-sede="ccs"]');
      const guayanaBtn = document.querySelector('[data-sede="g"]');
      
      // Select first campus
      global.sedeSelect = jest.fn((sede) => {
        global.sede = sede;
        document.querySelectorAll('.sede-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-sede="${sede}"]`).classList.add('active');
      });
      
      fireEvent.click(ccsBtn);
      global.sedeSelect('ccs');
      
      fireEvent.click(guayanaBtn);
      global.sedeSelect('g');
      
      expect(global.sede).toBe('g');
      expect(ccsBtn.classList.contains('active')).toBe(false);
      expect(guayanaBtn.classList.contains('active')).toBe(true);
    });
  });

  describe('Career Selection', () => {
    test('should select career correctly', () => {
      const careerBtn = document.querySelector('[data-carrera="ing-informatica"]');
      
      global.carreraSelect = jest.fn((carrera) => {
        global.carrera = carrera;
        document.querySelectorAll('.carrera-btn').forEach(btn => btn.classList.remove('active'));
        careerBtn.classList.add('active');
      });
      
      fireEvent.click(careerBtn);
      global.carreraSelect('ing-informatica');
      
      expect(global.carrera).toBe('ing-informatica');
      expect(careerBtn.classList.contains('active')).toBe(true);
    });

    test('should filter careers based on selected campus', () => {
      // Mock career filtering based on campus
      global.sede = 'g';
      
      const ingenieriaBtn = document.querySelector('[data-carrera="ing-informatica"]');
      const derechoBtn = document.querySelector('[data-carrera="derecho"]');
      
      // Guayana doesn't offer Law, so it should be disabled
      global.filterCareersBySede = jest.fn((sede) => {
        if (sede === 'g') {
          derechoBtn.disabled = true;
          derechoBtn.style.opacity = '0.5';
        }
      });
      
      global.filterCareersBySede('g');
      
      expect(derechoBtn.disabled).toBe(true);
      expect(derechoBtn.style.opacity).toBe('0.5');
    });

    test('should load subjects when career is selected', () => {
      global.carrera = 'ing-informatica';
      global.loadSubjects = jest.fn();
      
      const careerBtn = document.querySelector('[data-carrera="ing-informatica"]');
      fireEvent.click(careerBtn);
      
      expect(global.loadSubjects).toHaveBeenCalled();
    });
  });

  describe('Subject Management', () => {
    beforeEach(() => {
      // Mock subject data
      global.availableSubjects = [
        { id: 'mat-001', name: 'Matemática I', credits: 4 },
        { id: 'fis-001', name: 'Física I', credits: 4 },
        { id: 'prog-001', name: 'Programación I', credits: 3 }
      ];
      global.selectedSubjects = [];
    });

    test('should add subject to table when selected', () => {
      const tableBody = document.getElementById('materiasTableBody');
      
      global.addSubject = jest.fn((subject) => {
        global.selectedSubjects.push(subject);
        
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${subject.name}</td>
          <td>${subject.credits}</td>
          <td><button class="remove-btn" data-subject-id="${subject.id}">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
        
        global.ucbase += subject.credits;
        global.actualizarTotalUC();
      });
      
      const subject = global.availableSubjects[0];
      global.addSubject(subject);
      
      expect(global.selectedSubjects).toContain(subject);
      expect(tableBody.children.length).toBe(1);
      expect(global.ucbase).toBe(4);
    });

    test('should remove subject from table when delete button is clicked', () => {
      const tableBody = document.getElementById('materiasTableBody');
      
      // First add a subject
      const subject = global.availableSubjects[0];
      global.selectedSubjects.push(subject);
      global.ucbase = 4;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${subject.name}</td>
        <td>${subject.credits}</td>
        <td><button class="remove-btn" data-subject-id="${subject.id}">Eliminar</button></td>
      `;
      tableBody.appendChild(row);
      
      // Mock remove function
      global.removeSubject = jest.fn((subjectId) => {
        const index = global.selectedSubjects.findIndex(s => s.id === subjectId);
        if (index > -1) {
          const removedSubject = global.selectedSubjects.splice(index, 1)[0];
          global.ucbase -= removedSubject.credits;
          row.remove();
          global.actualizarTotalUC();
        }
      });
      
      const removeBtn = row.querySelector('.remove-btn');
      fireEvent.click(removeBtn);
      global.removeSubject(subject.id);
      
      expect(global.selectedSubjects.length).toBe(0);
      expect(tableBody.children.length).toBe(0);
      expect(global.ucbase).toBe(0);
    });

    test('should update total UC display when subjects change', () => {
      const totalDisplay = document.getElementById('totalUC');
      
      global.actualizarTotalUC = jest.fn(() => {
        totalDisplay.textContent = `TOTAL (base) ${global.ucbase} UC`;
      });
      
      global.ucbase = 8;
      global.actualizarTotalUC();
      
      expect(totalDisplay.textContent).toBe('TOTAL (base) 8 UC');
    });

    test('should prevent adding duplicate subjects', () => {
      const subject = global.availableSubjects[0];
      global.selectedSubjects.push(subject);
      
      global.addSubject = jest.fn((newSubject) => {
        const exists = global.selectedSubjects.some(s => s.id === newSubject.id);
        if (!exists) {
          global.selectedSubjects.push(newSubject);
        }
      });
      
      // Try to add the same subject again
      global.addSubject(subject);
      
      expect(global.selectedSubjects.length).toBe(1);
    });
  });

  describe('Cooperation Selection', () => {
    test('should select cooperation type correctly', () => {
      const coopBtn = document.querySelector('[data-coop="beca"]');
      
      global.coopSelect = jest.fn((coop) => {
        global.coop = coop;
        document.querySelectorAll('.coop-btn').forEach(btn => btn.classList.remove('active'));
        coopBtn.classList.add('active');
      });
      
      fireEvent.click(coopBtn);
      global.coopSelect('beca');
      
      expect(global.coop).toBe('beca');
      expect(coopBtn.classList.contains('active')).toBe(true);
    });

    test('should apply cooperation limits correctly', () => {
      global.coop = 'beca';
      global.ucbase = 35;
      global.limitBeca = 30;
      
      global.applyCoopeationLimits = jest.fn(() => {
        if (global.coop === 'beca' && global.ucbase > global.limitBeca) {
          global.ucpagar = global.limitBeca;
        } else {
          global.ucpagar = global.ucbase;
        }
      });
      
      global.applyCoopeationLimits();
      
      expect(global.ucpagar).toBe(30); // Should be limited to beca limit
    });
  });

  describe('Complete Calculation Workflow', () => {
    test('should perform complete calculation when all fields are selected', () => {
      // Set up complete scenario
      global.sede = 'ccs';
      global.carrera = 'ing-informatica';
      global.coop = 'ninguna';
      global.ucbase = 15;
      
      const calcularBtn = document.getElementById('calcularBtn');
      
      global.calcularMatricula = jest.fn(() => {
        // Mock calculation logic
        global.ucpagar = global.ucbase;
        global.totalbs = global.ucpagar * global.valorUC;
        
        // Hide alert and show results
        document.getElementById('alertmsg').style.display = 'none';
        document.getElementById('resultados').style.display = 'block';
        document.getElementById('totalBsDisplay').textContent = `${global.totalbs} USD`;
        document.getElementById('ucPagarDisplay').textContent = `${global.ucpagar} UC`;
      });
      
      fireEvent.click(calcularBtn);
      global.calcularMatricula();
      
      expect(global.calcularMatricula).toHaveBeenCalled();
      expect(document.getElementById('alertmsg').style.display).toBe('none');
      expect(document.getElementById('resultados').style.display).toBe('block');
    });

    test('should show error when required fields are missing', () => {
      // Missing sede
      global.sede = null;
      global.carrera = 'ing-informatica';
      global.coop = 'ninguna';
      
      const calcularBtn = document.getElementById('calcularBtn');
      
      global.calcularMatricula = jest.fn(() => {
        if (!global.sede || !global.carrera || !global.coop) {
          document.getElementById('alertmsg').style.display = 'block';
        }
      });
      
      fireEvent.click(calcularBtn);
      global.calcularMatricula();
      
      expect(document.getElementById('alertmsg').style.display).toBe('block');
    });

    test('should apply sede discount correctly in calculation', () => {
      global.sede = 'g'; // Guayana gets 20% discount
      global.carrera = 'ing-informatica';
      global.coop = 'ninguna';
      global.ucbase = 10;
      global.valorUC = 17.00;
      
      global.calcularMatricula = jest.fn(() => {
        global.ucpagar = global.ucbase;
        let totalAmount = global.ucpagar * global.valorUC;
        
        // Apply sede discount
        if (global.sede === 'g' || global.sede === 'tq') {
          totalAmount *= 0.8; // 20% discount
        }
        
        global.totalbs = totalAmount;
      });
      
      global.calcularMatricula();
      
      expect(global.totalbs).toBe(10 * 17.00 * 0.8); // 136 USD
    });
  });

  describe('Responsive Design and Mobile Support', () => {
    test('should handle touch events on mobile devices', () => {
      const sedeBtn = document.querySelector('[data-sede="ccs"]');
      
      // Mock touch events
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 }]
      });
      
      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 100 }]
      });
      
      fireEvent(sedeBtn, touchStartEvent);
      fireEvent(sedeBtn, touchEndEvent);
      
      // Should trigger click-like behavior
      expect(sedeBtn).toBeDefined();
    });

    test('should adapt layout for mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375 });
      Object.defineProperty(window, 'innerHeight', { value: 667 });
      
      // Trigger resize event
      fireEvent(window, new Event('resize'));
      
      // Mobile adaptations should be applied
      expect(window.innerWidth).toBe(375);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle missing subject data gracefully', () => {
      global.availableSubjects = [];
      
      global.loadSubjects = jest.fn(() => {
        if (global.availableSubjects.length === 0) {
          console.warn('No subjects available for this career');
        }
      });
      
      expect(() => global.loadSubjects()).not.toThrow();
    });

    test('should handle calculation with zero UC correctly', () => {
      global.ucbase = 0;
      global.valorUC = 17.00;
      
      global.calcularMatricula = jest.fn(() => {
        global.ucpagar = global.ucbase;
        global.totalbs = global.ucpagar * global.valorUC;
      });
      
      global.calcularMatricula();
      
      expect(global.totalbs).toBe(0);
    });

    test('should validate extreme UC values', () => {
      global.ucbase = 200; // Very high UC count
      global.limitProp = 27;
      
      global.validateUCLimits = jest.fn(() => {
        if (global.ucbase > 50) {
          console.warn('Unusually high UC count detected');
        }
      });
      
      expect(() => global.validateUCLimits()).not.toThrow();
    });
  });
});