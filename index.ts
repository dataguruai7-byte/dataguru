export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sql?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface DatabaseConnection {
  id: string;
  name: string;
  host: string;
  port: string;
  serviceName: string;
  username: string;
  password: string;
  status: 'connected' | 'disconnected';
}

export interface SchemaObject {
  name: string;
  type: 'table' | 'view' | 'package' | 'procedure' | 'function' | 'trigger' | 'index' | 'constraint' | 'sequence';
  columns?: SchemaColumn[];
  dependencies?: string[];
}

export interface SchemaColumn {
  name: string;
  dataType: string;
  nullable: boolean;
  comments?: string;
}

export interface QueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
}
