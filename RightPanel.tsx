import { cn } from '../../lib/utils';
import { Table, Columns, GitMerge, AlertTriangle, TrendingUp, Link2, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface RightPanelProps {
  activeView: string;
  collapsed: boolean;
  onToggle: () => void;
}

export function RightPanel({ collapsed, onToggle }: RightPanelProps) {
  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="flex h-full w-8 items-center justify-center border-l border-dark-200 bg-white hover:bg-dark-50 dark:border-dark-800 dark:bg-dark-950 dark:hover:bg-dark-900"
        title="Show intelligence panel"
      >
        <Info className="h-4 w-4 text-dark-400" />
      </button>
    );
  }

  return (
    <aside className="flex h-full w-72 flex-col border-l border-dark-200 bg-white dark:border-dark-800 dark:bg-dark-950">
      <div className="flex h-14 items-center justify-between border-b border-dark-200 px-4 dark:border-dark-800">
        <span className="text-sm font-semibold text-dark-900 dark:text-white">Intelligence</span>
        <button
          onClick={onToggle}
          className="rounded p-1 text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800"
          title="Hide panel"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 scrollbar-thin">
        {/* Confidence Score */}
        <div className="mb-6 rounded-xl border border-dark-200 bg-dark-50 p-4 dark:border-dark-800 dark:bg-dark-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-dark-500 dark:text-dark-400">Confidence Score</span>
            <Badge variant="success">98%</Badge>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-dark-200 dark:bg-dark-800">
            <div className="h-full w-[98%] rounded-full bg-green-500" />
          </div>
        </div>

        {/* Relevant Tables */}
        <Section title="Relevant Tables" icon={Table}>
          <div className="space-y-2">
            <ObjectItem name="APP_MENUS" type="TABLE" />
            <ObjectItem name="USERS" type="TABLE" />
            <ObjectItem name="ROLES" type="TABLE" />
            <ObjectItem name="NOTIFICATIONS" type="TABLE" />
          </div>
        </Section>

        {/* Relevant Columns */}
        <Section title="Relevant Columns" icon={Columns}>
          <div className="space-y-2">
            <ColumnItem table="APP_MENUS" column="MENU_ID" type="NUMBER" />
            <ColumnItem table="APP_MENUS" column="MENU_NAME" type="VARCHAR2" />
            <ColumnItem table="APP_MENUS" column="STATUS" type="VARCHAR2" />
            <ColumnItem table="USERS" column="USER_ID" type="NUMBER" />
          </div>
        </Section>

        {/* Join Conditions */}
        <Section title="Join Conditions" icon={GitMerge}>
          <div className="space-y-2">
            <JoinItem left="USERS.ROLE_ID" right="ROLES.ROLE_ID" type="INNER" />
            <JoinItem left="NOTIFICATIONS.USER_ID" right="USERS.USER_ID" type="LEFT" />
          </div>
        </Section>

        {/* Index Recommendations */}
        <Section title="Index Recommendations" icon={TrendingUp}>
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900/30 dark:bg-green-900/10">
            <p className="text-xs font-medium text-green-800 dark:text-green-300">Recommended Index</p>
            <pre className="mt-1 overflow-x-auto text-xs text-green-700 dark:text-green-400">
              CREATE INDEX idx_menus_status ON app_menus(status);
            </pre>
          </div>
        </Section>

        {/* Duplicate Risk */}
        <Section title="Duplicate Risk Analysis" icon={AlertTriangle}>
          <div className="space-y-2">
            <RiskItem level="low" message="No duplicate risk detected in APP_MENUS" />
            <RiskItem level="medium" message="Potential duplicates in NOTIFICATIONS by type" />
          </div>
        </Section>

        {/* Dependencies */}
        <Section title="Dependencies" icon={Link2}>
          <div className="space-y-2">
            <DepItem name="HR_EMPLOYEE_PKG" type="PACKAGE" />
            <DepItem name="TRG_AUDIT_LOG" type="TRIGGER" />
          </div>
        </Section>
      </div>
    </aside>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Table; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-dark-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-dark-500 dark:text-dark-400">{title}</span>
      </div>
      {children}
    </div>
  );
}

function ObjectItem({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-dark-100 bg-white px-3 py-2 dark:border-dark-800 dark:bg-dark-900">
      <span className="text-sm font-medium text-dark-900 dark:text-dark-100">{name}</span>
      <Badge variant="info" className="text-[10px]">{type}</Badge>
    </div>
  );
}

function ColumnItem({ table, column, type }: { table: string; column: string; type: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-dark-100 bg-white px-3 py-2 dark:border-dark-800 dark:bg-dark-900">
      <div>
        <span className="text-sm text-dark-900 dark:text-dark-100">{column}</span>
        <span className="ml-2 text-xs text-dark-400">{table}</span>
      </div>
      <span className="text-xs text-dark-500">{type}</span>
    </div>
  );
}

function JoinItem({ left, right, type }: { left: string; right: string; type: string }) {
  return (
    <div className="rounded-lg border border-dark-100 bg-white p-3 dark:border-dark-800 dark:bg-dark-900">
      <div className="flex items-center justify-between">
        <Badge variant="default" className="text-[10px]">{type} JOIN</Badge>
      </div>
      <div className="mt-2 space-y-1">
        <div className="text-xs text-dark-600 dark:text-dark-400">{left}</div>
        <div className="text-xs text-dark-400">=</div>
        <div className="text-xs text-dark-600 dark:text-dark-400">{right}</div>
      </div>
    </div>
  );
}

function RiskItem({ level, message }: { level: 'low' | 'medium' | 'high'; message: string }) {
  const colors = {
    low: 'border-green-200 bg-green-50 text-green-800 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-300',
    medium: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-300',
    high: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-300',
  };

  return (
    <div className={cn('rounded-lg border p-3 text-xs', colors[level])}>
      {message}
    </div>
  );
}

function DepItem({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-dark-100 bg-white px-3 py-2 dark:border-dark-800 dark:bg-dark-900">
      <Link2 className="h-3.5 w-3.5 text-dark-400" />
      <span className="text-sm text-dark-900 dark:text-dark-100">{name}</span>
      <Badge variant="default" className="ml-auto text-[10px]">{type}</Badge>
    </div>
  );
}
