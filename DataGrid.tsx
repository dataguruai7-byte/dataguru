import { useState } from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight, Search, Download } from 'lucide-react';
import { Button } from './Button';

interface DataGridProps {
  columns: string[];
  rows: Record<string, unknown>[];
  className?: string;
}

export function DataGrid({ columns, rows, className }: DataGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const pageSize = 5;

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedRows = sortColumn
    ? [...filteredRows].sort((a, b) => {
        const aVal = String(a[sortColumn] ?? '');
        const bVal = String(b[sortColumn] ?? '');
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      })
    : filteredRows;

  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = sortedRows.slice(startIndex, startIndex + pageSize);

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const csv = [columns.join(','), ...filteredRows.map((row) => columns.map((c) => `"${String(row[c] ?? '')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search results..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="h-9 w-full rounded-lg border border-dark-300 bg-white pl-9 pr-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
          />
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="mr-1.5 h-4 w-4" />
          CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-dark-200 dark:border-dark-800">
        <table className="w-full text-sm">
          <thead className="bg-dark-50 dark:bg-dark-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="cursor-pointer px-4 py-3 text-left font-medium text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700"
                >
                  <div className="flex items-center gap-1">
                    {col}
                    {sortColumn === col && (
                      <span className="text-primary-600 dark:text-primary-400">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-200 dark:divide-dark-800">
            {paginatedRows.map((row, i) => (
              <tr key={i} className="bg-white hover:bg-dark-50 dark:bg-dark-900 dark:hover:bg-dark-800/50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2.5 text-dark-900 dark:text-dark-100">
                    {String(row[col] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-dark-500 dark:text-dark-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-dark-500 dark:text-dark-400">
          Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedRows.length)} of {sortedRows.length} results
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-2 text-sm text-dark-700 dark:text-dark-300">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
