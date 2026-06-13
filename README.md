# Домашнє завдання — Тема 5. Структурні патерни: Адаптер та Фасад

Утиліта для аналізу директорій та генерації звітів у форматах JSON, CSV та XML.

## Патерни

### Adapter (Адаптер)
`JsonReportAdapter`, `CsvReportAdapter` та `XmlReportAdapter` реалізують єдиний інтерфейс `ReportAdapter` (`export(report): string`). Завдяки цьому `AnalyzerFacade` не знає про конкретний формат виводу.

### Facade (Фасад)
- **`AnalyzerFacade`** — спрощений інтерфейс: приймає адаптер, запускає аналіз директорії та повертає звіт через адаптер одним методом `generateReport(path)`.
- **`ReportManager`** — вищорівневий фасад: вибирає потрібний адаптер за рядком формату, створює директорію `reports/`, зберігає файл із мітою часу.

## Структура проєкту

```
src/
├── ReportAdapter.ts        # Інтерфейс адаптера
├── JsonReportAdapter.ts
├── CsvReportAdapter.ts
├── XmlReportAdapter.ts
├── DirectoryReport.ts      # Тип звіту
├── DirectoryAnalyzer.ts    # Рекурсивний обхід директорії
├── AnalyzerFacade.ts
├── ReportManager.ts
└── main.ts
```

## Запуск

```bash
npm install
npx ts-node src/main.ts <шлях_до_директорії> <формат>
```

Доступні формати: `json` (за замовчуванням), `csv`, `xml`.

**Приклади:**

```bash
npx ts-node src/main.ts . json
npx ts-node src/main.ts ./src csv
npx ts-node src/main.ts . xml
```

Звіт зберігається у папці `reports/` із міткою часу у назві файлу.
