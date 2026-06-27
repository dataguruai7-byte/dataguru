import { cn } from '../../lib/utils';
import { useState, createContext, useContext, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionContextType {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Accordion components must be used within an Accordion provider');
  return context;
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
  defaultOpen?: string;
}

export function Accordion({ children, className, defaultOpen }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultOpen || null);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value: _value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b border-dark-200 dark:border-dark-800', className)}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ value, children, className }: AccordionTriggerProps) {
  const { openItem, setOpenItem } = useAccordion();
  const isOpen = openItem === value;

  return (
    <button
      onClick={() => setOpenItem(isOpen ? null : value)}
      className={cn(
        'flex w-full items-center justify-between py-3 text-sm font-medium transition-all hover:underline text-dark-900 dark:text-dark-100',
        className
      )}
    >
      {children}
      <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />
    </button>
  );
}

interface AccordionContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionContent({ value, children, className }: AccordionContentProps) {
  const { openItem } = useAccordion();
  if (openItem !== value) return null;

  return (
    <div className={cn('pb-3 text-sm text-dark-600 dark:text-dark-400', className)}>
      {children}
    </div>
  );
}
