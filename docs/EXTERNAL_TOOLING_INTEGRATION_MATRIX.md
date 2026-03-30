# External Tooling Integration Matrix for EX-EL

## Purpose
This document maps newly connected repositories into the EX-EL architecture and defines where each one should be used.

## Adopted tooling roles

### 1. xlwings
Role: Primary Python-to-Excel bridge.
Use inside EX-EL:
- automate workbook generation
- replace fragile VBA where possible
- run Python macros against proposal workbooks
- support Python-based UDF strategy where relevant
Decision: adopt as the preferred Excel automation backbone for desktop workflows.

### 2. excel-chatgpt
Role: In-cell AI function pattern for Excel via VBA.
Use inside EX-EL:
- controlled GPT-style helper functions inside analyst workbooks
- classification, text drafting, explanation, formula help
Restriction:
- never hardcode API keys in workbook or repo
Decision: adopt as optional analyst-side pattern, not as the system-of-record engine.

### 3. excel-automation-with-chatgpt
Role: Batch Excel file operations and prompt-assisted workflow ideas.
Use inside EX-EL:
- mass phrase replacement in investor files
- splitting worksheets into separate files
- filtering by unique values for outreach or proposal sets
Decision: adopt patterns for file-level automation tasks around proposals and investor packs.

### 4. Excel-Automation-Tool
Role: Operational ETL and reporting workflow.
Use inside EX-EL:
- filtered extracts from source Excel files
- chart generation
- PDF report generation
- Google Sheets publishing for collaboration layers
Decision: adopt as reference workflow for non-technical operations users and lightweight reporting pipelines.

### 5. EGTools-Excel
Role: Rich Excel add-in function library.
Use inside EX-EL:
- unpivot support
- JSON parsing in spreadsheet contexts
- text extraction and mass lookup helpers
- import and query support for sheet-native analysts
Restriction:
- use selectively; avoid dependence on niche add-in features for critical production logic
Decision: treat as an analyst productivity layer, not a core dependency.

### 6. Advanced-Analytics-with-Power-BI-and-Excel
Role: BI methodology reference.
Use inside EX-EL:
- semantic modeling guidance
- Power Query / M / SQL / Python / R / DAX decision framing
- report publishing, security, and performance optimization patterns
Decision: adopt as methodological standard for Power BI layer and analytical governance.

### 7. Powerbi-Excel-Dashboard-Projects
Role: workflow pattern for Excel -> SQL -> Power BI.
Use inside EX-EL:
- source cleansing in Excel
- SQL staging
- Power BI dashboards on curated data
Decision: adopt as the preferred pipeline shape for management dashboards that outgrow CBoard visualization needs.

### 8. Collection-of-CSharp-ExcelDNA-UDFs
Role: high-performance Excel add-in strategy.
Use inside EX-EL:
- thread-safe UDFs for advanced desktop analyst tooling
- stateful object store patterns in Excel
- recalculation / iteration controls in specialist workbooks
Decision: adopt only for high-performance Windows analyst builds where VBA and xlwings are not enough.

### 9. taking-advantage-of-google-apps-script
Role: Google Workspace automation catalog.
Use inside EX-EL:
- Sheets synchronization
- Drive file routing
- Docs / Slides templating
- Gemini / MCP / Apps Script automation for workspace flows
Decision: adopt as the reference library for Google Workspace sidecars around EX-EL.

## Layer mapping

### Core System Layer
- CBoard
- governed SQL model
- contradiction register
- executive control tower

### Excel Automation Layer
- xlwings
- excel-automation-with-chatgpt
- excel-chatgpt
- Excel-Automation-Tool
- Collection-of-CSharp-ExcelDNA-UDFs
- EGTools-Excel (selective)

### BI / Dashboard Layer
- CBoard
- Advanced-Analytics-with-Power-BI-and-Excel
- Powerbi-Excel-Dashboard-Projects

### Workspace / Collaboration Layer
- taking-advantage-of-google-apps-script
- Excel-Automation-Tool Google Sheets path

## Immediate implementation choices
1. Use xlwings as the default bridge for Excel automation and workbook assembly.
2. Keep GPT-in-Excel features as optional analyst tools, not production sources of truth.
3. Use Apps Script patterns for Drive and Sheets orchestration.
4. Use Power BI methodology only after governed SQL tables are stable.
5. Keep all investor-safe metrics governed by the contradiction register before surfacing them in Excel, CBoard, or Power BI.

## Non-negotiable rules
- no secrets in repo or workbook
- no dashboard without governed metric definitions
- no Excel-side AI output becomes investor-facing without review
- no add-in specific function may become a hard dependency for critical business logic unless distribution and support are solved
