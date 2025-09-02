# UCalculadora Test Suite

Comprehensive testing framework for the UCalculadora application covering unit tests, integration tests, and end-to-end testing.

## 🎯 Test Coverage

### 1. Unit Tests (`tests/unit/`)
Tests for core calculation functions and business logic:

- **UC Value Management**: `getCustomUCValue()`, `getMonthlyUCValues()`, `setMonthlyUCValues()`
- **Month-specific Calculations**: `getUCForMonth()`, `getUCMes()`
- **Core Calculation Logic**: `LoadUC()`, `calcularMatricula()` 
- **Date-based Functions**: `getUCfecha()`
- **Utility Functions**: `formatNumber`, discount calculations
- **Initialization Logic**: Variable setup and mode switching

### 2. Integration Tests (`tests/integration/`)
Tests for UI component interactions and workflows:

- **UC Editing Modal**: Complete edit workflow, validation, persistence
- **Calculator UI**: Campus selection, career selection, subject management
- **Form Interactions**: Input validation, error handling, state management
- **Local Storage**: Data persistence and recovery
- **Responsive Design**: Mobile and desktop compatibility

### 3. End-to-End Tests (`tests/e2e/`)
Full user workflow testing across browsers:

- **Complete Calculation Workflow**: Campus → Career → Subjects → Calculate
- **UC Editing Functionality**: Modal interactions, value persistence
- **Cross-browser Compatibility**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: Touch interactions, responsive layouts
- **Accessibility**: Keyboard navigation, screen reader support
- **Error Scenarios**: Network issues, invalid data handling

## 🚀 Quick Start

### Local Testing

```bash
# Run all tests
./test-runner.sh

# Or run individually
npm run test:unit           # Unit tests only
npm run test:integration    # Integration tests only  
npm run test:e2e           # E2E tests only
npm run test:coverage      # Generate coverage report
```

### GitHub Actions

Tests run automatically on:
- Push to `master` or `copilot/fix-44` branches
- Pull requests to `master`
- Manual workflow dispatch

## 📋 Prerequisites

- **Node.js 18+**: Required for Jest and Playwright
- **npm**: Package manager for dependencies
- **Python 3**: For local HTTP server (E2E tests)

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Playwright Browsers** (for E2E tests)
   ```bash
   npm run install:playwright
   ```

3. **Run Tests**
   ```bash
   # All tests
   npm test
   
   # Watch mode (development)
   npm run test:watch
   
   # With coverage
   npm run test:coverage
   ```

## 📊 Test Configuration

### Jest Configuration (`package.json`)
```json
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
  "collectCoverageFrom": ["js/**/*.js", "!js/**/*.min.js"],
  "testMatch": ["**/tests/**/*.test.js"]
}
```

### Playwright Configuration (`playwright.config.js`)
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: Pixel 5, iPhone 12
- **Local Server**: Python HTTP server on port 3000
- **Reporting**: HTML, JUnit, JSON formats

## 🎭 Test Structure

```
tests/
├── setup.js                 # Global test setup
├── fixtures/
│   └── testData.js          # Mock data and test fixtures
├── unit/
│   ├── ucCalculations.test.js    # UC value functions
│   └── mainCalculations.test.js  # Core calculation logic
├── integration/
│   ├── ucEditingModal.test.js    # Modal interactions
│   └── mainCalculatorUI.test.js  # Calculator UI workflow
└── e2e/
    ├── ucEditing.spec.js         # UC editing E2E tests
    └── calculatorWorkflow.spec.js # Complete workflow tests
```

## 📈 Coverage Goals

- **Function Coverage**: 90%+ for core calculation logic
- **UI Coverage**: 100% for critical user paths
- **E2E Coverage**: All major user workflows
- **Browser Coverage**: Latest 2 versions of major browsers

## 🔍 Test Examples

### Unit Test Example
```javascript
test('should return custom UC value when stored', () => {
  localStorage.setItem('customUCValue', '25.50');
  expect(getCustomUCValue()).toBe(25.50);
});
```

### Integration Test Example  
```javascript
test('should save custom UC value correctly', () => {
  fireEvent.change(customUCInput, { target: { value: '25.50' } });
  fireEvent.click(saveBtn);
  expect(localStorage.setItem).toHaveBeenCalledWith('customUCValue', '25.50');
});
```

### E2E Test Example
```javascript
test('should complete full calculation workflow', async ({ page }) => {
  await page.locator('button:has-text("CARACAS")').click();
  await page.locator('button:has-text("Ingeniería")').first().click();
  await page.locator('button:has-text("CALCULAR")').click();
  await expect(page.locator('#resultados')).toBeVisible();
});
```

## 🚨 Troubleshooting

### Common Issues

1. **Playwright Installation Fails**
   ```bash
   # Manually install browsers
   npx playwright install
   ```

2. **Jest Tests Fail with DOM Errors**
   - Check `tests/setup.js` for proper DOM mocking
   - Ensure `jsdom` environment is configured

3. **E2E Tests Timeout**
   - Increase timeout in `playwright.config.js`
   - Check network connectivity
   - Verify local server is running

4. **Coverage Report Issues**
   ```bash
   # Clear coverage cache
   rm -rf coverage/
   npm run test:coverage
   ```

### Local Development

```bash
# Watch mode for rapid development
npm run test:watch

# Debug specific test
npm test -- --testNamePattern="should save custom UC value"

# Run tests in specific file
npm test -- tests/unit/ucCalculations.test.js
```

## 📝 Contributing

When adding new features:

1. **Write tests first** (TDD approach)
2. **Ensure all tests pass** before submitting PR
3. **Maintain coverage** above 90% for new code
4. **Add E2E tests** for new user workflows
5. **Update this README** if adding new test types

## 🔗 Related Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Library](https://testing-library.com/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📊 Test Reports

After running tests, reports are available:

- **Coverage Report**: `coverage/lcov-report/index.html`
- **Playwright Report**: `playwright-report/index.html`
- **JUnit Results**: `test-results/junit.xml`

These reports are also uploaded as artifacts in GitHub Actions for easy access.