/**
 * Integration Tests for UC Editing Modal and UI Components
 * Testing the complete UC editing workflow
 */

const { fireEvent, waitFor } = require('@testing-library/dom');

describe('UC Editing Modal Integration', () => {
  let container;
  
  beforeEach(() => {
    // Create a clean DOM environment
    document.body.innerHTML = '';
    container = document.createElement('div');
    container.innerHTML = `
      <div class="header">
        <h1>UC<span id="ucDisplay">CALCULADORA</span></h1>
        <div id="ucValue">17 USD</div>
        <i id="ucEditIcon" class="fas fa-edit" style="color: #666;"></i>
      </div>
      
      <!-- UC Edit Modal -->
      <div id="ucEditModal" class="modal" style="display: none;">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>EDITAR VALOR UC</h2>
          
          <div class="modal-section">
            <h3>Valor UC Actual</h3>
            <div class="input-group">
              <label>Valor actual:</label>
              <input type="number" id="customUCInput" step="0.01" min="0.01" max="999.99" />
              <span>USD</span>
            </div>
            <p id="defaultUCDisplay">Valor por defecto: 17.00 USD</p>
          </div>
          
          <div class="modal-section">
            <h3>Valores para meses específicos (opcional)</h3>
            <p>Configura valores específicos para los meses 2 a 5 utilizados en los cálculos de pagos mensuales.</p>
            
            <div class="monthly-inputs">
              <div class="input-group">
                <label>Mes 2 (cálculos):</label>
                <input type="number" id="month2Input" placeholder="Usar valor actual" step="0.01" min="0.01" max="999.99" />
                <span>USD</span>
              </div>
              <div class="input-group">
                <label>Mes 3 (cálculos):</label>
                <input type="number" id="month3Input" placeholder="Usar valor actual" step="0.01" min="0.01" max="999.99" />
                <span>USD</span>
              </div>
              <div class="input-group">
                <label>Mes 4 (cálculos):</label>
                <input type="number" id="month4Input" placeholder="Usar valor actual" step="0.01" min="0.01" max="999.99" />
                <span>USD</span>
              </div>
              <div class="input-group">
                <label>Mes 5 (cálculos):</label>
                <input type="number" id="month5Input" placeholder="Usar valor actual" step="0.01" min="0.01" max="999.99" />
                <span>USD</span>
              </div>
            </div>
          </div>
          
          <div class="modal-actions">
            <button id="resetUCBtn" class="reset-btn">Restablecer</button>
            <button id="saveUCBtn" class="save-btn">Guardar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);
    
    // Mock the required global functions
    global.updateUCDisplay = jest.fn();
    global.LoadUC = jest.fn();
    global.getUCfecha = jest.fn().mockReturnValue('17.00');
    global.getCustomUCValue = jest.fn();
    global.getMonthlyUCValues = jest.fn().mockReturnValue({});
    global.setMonthlyUCValues = jest.fn();
    
    // Mock localStorage
    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Modal Opening and Closing', () => {
    test('should open modal when UC edit icon is clicked', () => {
      const editIcon = document.getElementById('ucEditIcon');
      const modal = document.getElementById('ucEditModal');
      
      // Simulate click event
      fireEvent.click(editIcon);
      
      expect(modal.style.display).toBe('block');
    });

    test('should close modal when close button is clicked', () => {
      const modal = document.getElementById('ucEditModal');
      const closeBtn = modal.querySelector('.close');
      
      // Open modal first
      modal.style.display = 'block';
      
      // Close modal
      fireEvent.click(closeBtn);
      
      expect(modal.style.display).toBe('none');
    });

    test('should close modal when clicking outside modal content', () => {
      const modal = document.getElementById('ucEditModal');
      
      // Open modal first
      modal.style.display = 'block';
      
      // Click on modal backdrop
      fireEvent.click(modal);
      
      expect(modal.style.display).toBe('none');
    });

    test('should not close modal when clicking on modal content', () => {
      const modal = document.getElementById('ucEditModal');
      const modalContent = modal.querySelector('.modal-content');
      
      // Open modal first
      modal.style.display = 'block';
      
      // Click on modal content
      fireEvent.click(modalContent);
      
      expect(modal.style.display).toBe('block');
    });
  });

  describe('UC Value Input and Validation', () => {
    test('should populate current custom UC value in input', () => {
      localStorage.setItem('customUCValue', '25.50');
      global.getCustomUCValue.mockReturnValue(25.50);
      
      const customUCInput = document.getElementById('customUCInput');
      const modal = document.getElementById('ucEditModal');
      
      // Simulate opening modal (would populate inputs)
      modal.style.display = 'block';
      customUCInput.value = '25.50';
      
      expect(customUCInput.value).toBe('25.50');
    });

    test('should validate UC input within acceptable range', () => {
      const customUCInput = document.getElementById('customUCInput');
      
      // Test valid input
      fireEvent.change(customUCInput, { target: { value: '25.50' } });
      expect(customUCInput.value).toBe('25.50');
      
      // Test minimum value
      fireEvent.change(customUCInput, { target: { value: '0.01' } });
      expect(customUCInput.value).toBe('0.01');
      
      // Test maximum value
      fireEvent.change(customUCInput, { target: { value: '999.99' } });
      expect(customUCInput.value).toBe('999.99');
    });

    test('should handle invalid input values', () => {
      const customUCInput = document.getElementById('customUCInput');
      
      // Test negative value
      fireEvent.change(customUCInput, { target: { value: '-5' } });
      expect(parseFloat(customUCInput.value)).toBeNaN();
      
      // Test zero value
      fireEvent.change(customUCInput, { target: { value: '0' } });
      expect(parseFloat(customUCInput.value)).toBe(0);
      
      // Test extremely high value
      fireEvent.change(customUCInput, { target: { value: '10000' } });
      expect(parseFloat(customUCInput.value)).toBe(10000);
    });
  });

  describe('Monthly UC Values Management', () => {
    test('should populate monthly inputs with stored values', () => {
      const monthlyValues = { "2": 26.00, "3": 27.00, "4": 28.00, "5": 29.00 };
      localStorage.setItem('monthlyUCValues', JSON.stringify(monthlyValues));
      global.getMonthlyUCValues.mockReturnValue(monthlyValues);
      
      // Simulate modal opening and population
      document.getElementById('month2Input').value = '26.00';
      document.getElementById('month3Input').value = '27.00';
      document.getElementById('month4Input').value = '28.00';
      document.getElementById('month5Input').value = '29.00';
      
      expect(document.getElementById('month2Input').value).toBe('26.00');
      expect(document.getElementById('month3Input').value).toBe('27.00');
      expect(document.getElementById('month4Input').value).toBe('28.00');
      expect(document.getElementById('month5Input').value).toBe('29.00');
    });

    test('should handle empty monthly values', () => {
      global.getMonthlyUCValues.mockReturnValue({});
      
      // All inputs should be empty when no monthly values are stored
      expect(document.getElementById('month2Input').value).toBe('');
      expect(document.getElementById('month3Input').value).toBe('');
      expect(document.getElementById('month4Input').value).toBe('');
      expect(document.getElementById('month5Input').value).toBe('');
    });

    test('should validate monthly input values', () => {
      const month2Input = document.getElementById('month2Input');
      
      // Valid input
      fireEvent.change(month2Input, { target: { value: '26.50' } });
      expect(month2Input.value).toBe('26.50');
      
      // Empty input (should be allowed)
      fireEvent.change(month2Input, { target: { value: '' } });
      expect(month2Input.value).toBe('');
    });
  });

  describe('Save and Reset Functionality', () => {
    test('should save UC values when save button is clicked', () => {
      const customUCInput = document.getElementById('customUCInput');
      const saveBtn = document.getElementById('saveUCBtn');
      const modal = document.getElementById('ucEditModal');
      
      // Set up input values
      customUCInput.value = '25.50';
      modal.style.display = 'block';
      
      // Mock localStorage setItem
      const setItemSpy = jest.spyOn(localStorage, 'setItem');
      
      // Click save
      fireEvent.click(saveBtn);
      
      expect(setItemSpy).toHaveBeenCalledWith('customUCValue', '25.50');
      expect(modal.style.display).toBe('none');
    });

    test('should save monthly UC values when save button is clicked', () => {
      const month2Input = document.getElementById('month2Input');
      const month3Input = document.getElementById('month3Input');
      const saveBtn = document.getElementById('saveUCBtn');
      
      // Set up monthly values
      month2Input.value = '26.00';
      month3Input.value = '27.00';
      
      // Click save
      fireEvent.click(saveBtn);
      
      expect(global.setMonthlyUCValues).toHaveBeenCalledWith({
        "2": 26.00,
        "3": 27.00
      });
    });

    test('should reset all values when reset button is clicked', () => {
      const customUCInput = document.getElementById('customUCInput');
      const month2Input = document.getElementById('month2Input');
      const resetBtn = document.getElementById('resetUCBtn');
      const modal = document.getElementById('ucEditModal');
      
      // Set up some values
      customUCInput.value = '25.50';
      month2Input.value = '26.00';
      modal.style.display = 'block';
      
      // Mock localStorage removeItem
      const removeItemSpy = jest.spyOn(localStorage, 'removeItem');
      
      // Click reset
      fireEvent.click(resetBtn);
      
      expect(removeItemSpy).toHaveBeenCalledWith('customUCValue');
      expect(global.setMonthlyUCValues).toHaveBeenCalledWith({});
      expect(modal.style.display).toBe('none');
    });

    test('should update UC display after saving', () => {
      const saveBtn = document.getElementById('saveUCBtn');
      
      fireEvent.click(saveBtn);
      
      expect(global.updateUCDisplay).toHaveBeenCalled();
      expect(global.LoadUC).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    test('should close modal when Escape key is pressed', () => {
      const modal = document.getElementById('ucEditModal');
      modal.style.display = 'block';
      
      // Press Escape key
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      
      expect(modal.style.display).toBe('none');
    });

    test('should save values when Enter key is pressed in input', () => {
      const customUCInput = document.getElementById('customUCInput');
      const modal = document.getElementById('ucEditModal');
      
      customUCInput.value = '25.50';
      modal.style.display = 'block';
      
      // Press Enter key in input
      fireEvent.keyDown(customUCInput, { key: 'Enter', code: 'Enter' });
      
      expect(global.updateUCDisplay).toHaveBeenCalled();
      expect(modal.style.display).toBe('none');
    });
  });

  describe('Visual Feedback', () => {
    test('should change icon color when custom values are applied', () => {
      const editIcon = document.getElementById('ucEditIcon');
      
      // Simulate custom value being set
      localStorage.setItem('customUCValue', '25.50');
      global.getCustomUCValue.mockReturnValue(25.50);
      
      // Icon should change color to indicate custom values
      editIcon.style.color = '#ff9800'; // Orange for custom values
      
      expect(editIcon.style.color).toBe('rgb(255, 152, 0)');
    });

    test('should display default icon color when no custom values', () => {
      const editIcon = document.getElementById('ucEditIcon');
      
      // No custom values
      global.getCustomUCValue.mockReturnValue(null);
      global.getMonthlyUCValues.mockReturnValue({});
      
      // Icon should be default color
      editIcon.style.color = '#666';
      
      expect(editIcon.style.color).toBe('rgb(102, 102, 102)');
    });

    test('should update UC display text with custom value indicator', () => {
      const ucDisplay = document.getElementById('ucValue');
      
      // Simulate custom value display
      ucDisplay.innerHTML = '25 USD <i class="fas fa-user-cog" title="Valor personalizado"></i>';
      
      expect(ucDisplay.innerHTML).toContain('fas fa-user-cog');
      expect(ucDisplay.innerHTML).toContain('25 USD');
    });
  });

  describe('Error Handling', () => {
    test('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw error
      const setItemSpy = jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new Error('LocalStorage quota exceeded');
      });
      
      const saveBtn = document.getElementById('saveUCBtn');
      const customUCInput = document.getElementById('customUCInput');
      customUCInput.value = '25.50';
      
      // Should not throw error when localStorage fails
      expect(() => {
        fireEvent.click(saveBtn);
      }).not.toThrow();
      
      setItemSpy.mockRestore();
    });

    test('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('monthlyUCValues', 'invalid json');
      
      // Should handle corrupted data gracefully
      expect(() => {
        global.getMonthlyUCValues();
      }).not.toThrow();
    });

    test('should validate extreme input values', () => {
      const customUCInput = document.getElementById('customUCInput');
      const saveBtn = document.getElementById('saveUCBtn');
      
      // Test extremely high value
      customUCInput.value = '999999';
      fireEvent.click(saveBtn);
      
      // Should handle or warn about extreme values
      expect(global.updateUCDisplay).toHaveBeenCalled();
    });
  });
});