export type DemoChartKind = 'donut' | 'bar';

export type DemoChartRow = {
  date: string;
  chart: DemoChartKind;
  businessUnit: string;
  tripgroup?: string;
  status?: string;
  assigned?: number;
  source?: number;
  destination?: number;
  done?: number;
  count?: number;
};

const DEMO_CHART_DATA_PATH = '/data/demo_trip_charts.csv';

let cachedRows: DemoChartRow[] | null = null;
let pendingLoad: Promise<DemoChartRow[]> | null = null;

const parseNumber = (value: string | undefined): number => {
  if (value === undefined || value === '') {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const parseCsv = (csvText: string): DemoChartRow[] => {
  const lines = csvText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return [];
  }

  const headers = lines[0].split(',').map(header => header.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });

    return {
      date: row.date || '',
      chart: (row.chart as DemoChartKind) || 'donut',
      businessUnit: row.businessUnit || 'ALL',
      tripgroup: row.tripgroup || undefined,
      status: row.status || undefined,
      assigned: parseNumber(row.assigned),
      source: parseNumber(row.source),
      destination: parseNumber(row.destination),
      done: parseNumber(row.done),
      count: parseNumber(row.count),
    } satisfies DemoChartRow;
  });
};

const loadRows = async (): Promise<DemoChartRow[]> => {
  if (cachedRows) {
    return cachedRows;
  }

  if (!pendingLoad) {
    pendingLoad = fetch(DEMO_CHART_DATA_PATH)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load demo trip chart data: ${response.status}`);
        }

        return response.text();
      })
      .then(text => {
        cachedRows = parseCsv(text);
        return cachedRows;
      })
      .finally(() => {
        pendingLoad = null;
      });
  }

  return pendingLoad;
};

const toTimestamp = (value: string | undefined): number | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? null : parsed;
};

const matchesDateRange = (rowDate: string, fromStr: string, toStr: string): boolean => {
  const rowTimestamp = toTimestamp(rowDate);
  if (rowTimestamp === null) {
    return false;
  }

  const fromTimestamp = toTimestamp(fromStr);
  const toTimestampValue = toTimestamp(toStr);

  if (fromTimestamp !== null && rowTimestamp < fromTimestamp) {
    return false;
  }

  if (toTimestampValue !== null && rowTimestamp > toTimestampValue) {
    return false;
  }

  return true;
};

const filterRows = (
  rows: DemoChartRow[],
  chart: DemoChartKind,
  BU: string | null | undefined,
  fromStr: string,
  toStr: string,
) => {
  const chartRows = rows.filter(row => row.chart === chart && matchesDateRange(row.date, fromStr, toStr));

  if (!BU) {
    return chartRows.filter(row => row.businessUnit === 'ALL' || row.businessUnit === '');
  }

  const exactMatchRows = chartRows.filter(row => row.businessUnit === BU);
  if (exactMatchRows.length > 0) {
    return exactMatchRows;
  }

  const fallbackRows = chartRows.filter(row => row.businessUnit === 'ALL' || row.businessUnit === '');
  return fallbackRows.length > 0 ? fallbackRows : chartRows;
};

export const loadDemoDonutTotals = async (BU: string | null | undefined, fromStr: string, toStr: string) => {
  const rows = await loadRows();
  const totals: Record<string, number> = {};

  filterRows(rows, 'donut', BU, fromStr, toStr).forEach(row => {
    if (!row.tripgroup) {
      return;
    }

    totals[`Assigned_${row.tripgroup}`] = (totals[`Assigned_${row.tripgroup}`] || 0) + (row.assigned || 0);
    totals[`DispSrc_${row.tripgroup}`] = (totals[`DispSrc_${row.tripgroup}`] || 0) + (row.source || 0);
    totals[`DispDst_${row.tripgroup}`] = (totals[`DispDst_${row.tripgroup}`] || 0) + (row.destination || 0);
    totals[`Done_${row.tripgroup}`] = (totals[`Done_${row.tripgroup}`] || 0) + (row.done || 0);
  });

  return totals;
};

export const loadDemoBarTotals = async (BU: string | null | undefined, fromStr: string, toStr: string) => {
  const rows = await loadRows();
  const totals: Record<string, number> = {};

  filterRows(rows, 'bar', BU, fromStr, toStr).forEach(row => {
    if (!row.status) {
      return;
    }

    totals[row.status] = (totals[row.status] || 0) + (row.count || 0);
  });

  return totals;
};