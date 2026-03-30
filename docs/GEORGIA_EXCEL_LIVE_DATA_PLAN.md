# Georgia Excel Live Data Plan

## Scope
Add live Georgia-oriented market intelligence around Excel workbooks used by EX-EL.

## Connected repositories used
- Real_estate_market_scrape: MyHome listing strategy based on item IDs and detail-page scraping.
- nbg-currency-rates-api: NBG exchange-rate wrapper and endpoint pattern.
- TBC.OpenAPI.SDK.OnlineMortgage: TBC online mortgage integration, used as financing hook rather than FX feed.
- serpapi-python: Deep Google search metadata layer.
- xlwings: primary Python-to-Excel bridge.

## Workbook additions
- נתוני_שוק: live apartment market rows for Tbilisi sourced from MyHome detail pages.
- שערים: USD / EUR / GEL rates from NBG.
- חיפושים: deep Google search results with metadata via SerpApi.

## Execution pattern
1. xlwings opens workbook.
2. NBG rates refresh first.
3. Market rows are fetched from MyHome pages.
4. Search rows are fetched from SerpApi.
5. Optional TBC mortgage payloads are prepared from selected listing rows.

## Important rule
The connected TBC repository is an Online Mortgage SDK, not a foreign-exchange rate feed. It should enrich financing workflows, not replace NBG as the FX source.
