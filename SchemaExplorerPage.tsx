import { useState } from 'react';
import {
  FolderTree, Table, Eye, Package, Zap, Search, ChevronRight, ChevronDown,
  Hash, Key
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ScrollArea } from '../components/ui/ScrollArea';
import { mockSchemaObjects } from '../data/mockData';
import { SchemaObject } from '../types';
import { cn } from '../lib/utils';

const typeIcons = {
  table: Table,
  view: Eye,
  package: Package,
  procedure: Zap,
  function: Zap,
  trigger: Zap,
  index: Hash,
  constraint: Key,
  sequence: Hash,
};

const typeColors = {
  table: 'text-blue-600 dark:text-blue-400',
  view: 'text-purple-600 dark:text-purple-400',
  package: 'text-orange-600 dark:text-orange-400',
  procedure: 'text-green-600 dark:text-green-400',
  function: 'text-green-600 dark:text-green-400',
  trigger: 'text-red-600 dark:text-red-400',
  index: 'text-yellow-600 dark:text-yellow-400',
  constraint: 'text-pink-600 dark:text-pink-400',
  sequence: 'text-cyan-600 dark:text-cyan-400',
};

export function SchemaExplorerPage() {
  const [selectedObject, setSelectedObject] = useState<SchemaObject | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set(['table', 'view', 'package']));

  const filteredObjects = mockSchemaObjects.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const grouped = filteredObjects.reduce<Record<string, SchemaObject[]>>((acc, obj) => {
    if (!acc[obj.type]) acc[obj.type] = [];
    acc[obj.type].push(obj);
    return acc;
  }, {});

  const toggleType = (type: string) => {
    setExpandedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div className="flex h-full">
      {/* Tree Panel */}
      <div className="flex w-80 flex-col border-r border-dark-200 bg-white dark:border-dark-800 dark:bg-dark-950">
        <div className="border-b border-dark-200 p-4 dark:border-dark-800">
          <h2 className="mb-3 text-lg font-semibold text-dark-900 dark:text-white">Schema Explorer</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search objects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-lg border border-dark-300 bg-white pl-9 pr-3 text-sm text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:placeholder:text-dark-500"
            />
          </div>
        </div>
        <ScrollArea className="flex-1 p-2">
          {Object.entries(grouped).map(([type, objects]) => {
            const Icon = typeIcons[type as keyof typeof typeIcons] || FolderTree;
            const isExpanded = expandedTypes.has(type);
            return (
              <div key={type} className="mb-1">
                <button
                  onClick={() => toggleType(type)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-800"
                >
                  {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  <Icon className={cn('h-4 w-4', typeColors[type as keyof typeof typeColors])} />
                  <span className="capitalize">{type}s</span>
                  <Badge variant="default" className="ml-auto text-[10px]">{objects.length}</Badge>
                </button>
                {isExpanded && (
                  <div className="ml-6 space-y-0.5">
                    {objects.map((obj) => (
                      <button
                        key={obj.name}
                        onClick={() => setSelectedObject(obj)}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                          selectedObject?.name === obj.name
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'text-dark-600 hover:bg-dark-50 dark:text-dark-400 dark:hover:bg-dark-800'
                        )}
                      >
                        <Icon className={cn('h-3.5 w-3.5', typeColors[type as keyof typeof typeColors])} />
                        <span className="truncate">{obj.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        {selectedObject ? (
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              {(() => {
                const Icon = typeIcons[selectedObject.type] || FolderTree;
                return <Icon className={cn('h-8 w-8', typeColors[selectedObject.type])} />;
              })()}
              <div>
                <h1 className="text-2xl font-bold text-dark-900 dark:text-white">{selectedObject.name}</h1>
                <Badge variant="info" className="mt-1 capitalize">{selectedObject.type}</Badge>
              </div>
            </div>

            {selectedObject.columns && selectedObject.columns.length > 0 && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Columns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-dark-50 dark:bg-dark-800">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-dark-700 dark:text-dark-300">Column</th>
                          <th className="px-4 py-2 text-left font-medium text-dark-700 dark:text-dark-300">Data Type</th>
                          <th className="px-4 py-2 text-left font-medium text-dark-700 dark:text-dark-300">Nullable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-200 dark:divide-dark-800">
                        {selectedObject.columns.map((col) => (
                          <tr key={col.name} className="bg-white dark:bg-dark-900">
                            <td className="px-4 py-2 font-medium text-dark-900 dark:text-dark-100">{col.name}</td>
                            <td className="px-4 py-2 text-dark-600 dark:text-dark-400">{col.dataType}</td>
                            <td className="px-4 py-2">
                              <Badge variant={col.nullable ? 'default' : 'success'} className="text-[10px]">
                                {col.nullable ? 'YES' : 'NO'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedObject.dependencies && selectedObject.dependencies.length > 0 && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Dependencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedObject.dependencies.map((dep) => (
                      <Badge key={dep} variant="default">{dep}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>SQL Definition</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-dark-950 p-4 text-xs text-green-400">
                  {`-- ${selectedObject.type.toUpperCase()}: ${selectedObject.name}
-- Generated by DataGuru AI Schema Explorer

${selectedObject.type === 'table' ? `SELECT * FROM ${selectedObject.name};` : ''}
${selectedObject.type === 'view' ? `SELECT * FROM ${selectedObject.name};` : ''}
${selectedObject.type === 'package' ? `DESCRIBE ${selectedObject.name};` : ''}
${selectedObject.type === 'trigger' ? `SELECT trigger_name, status FROM user_triggers WHERE trigger_name = '${selectedObject.name}';` : ''}
${selectedObject.type === 'index' ? `SELECT index_name, table_name FROM user_indexes WHERE index_name = '${selectedObject.name}';` : ''}
${selectedObject.type === 'constraint' ? `SELECT constraint_name, table_name FROM user_constraints WHERE constraint_name = '${selectedObject.name}';` : ''}
${selectedObject.type === 'sequence' ? `SELECT sequence_name FROM user_sequences WHERE sequence_name = '${selectedObject.name}';` : ''}`}
                </pre>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <FolderTree className="mx-auto mb-4 h-12 w-12 text-dark-300 dark:text-dark-700" />
              <p className="text-dark-500 dark:text-dark-400">Select an object from the tree to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
