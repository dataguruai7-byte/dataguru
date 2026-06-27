import { Chat, DatabaseConnection, SchemaObject } from '../types';

export const mockConnections: DatabaseConnection[] = [
  {
    id: '1',
    name: 'Production Oracle',
    host: 'prod-oracle.company.com',
    port: '1521',
    serviceName: 'ORCLPDB1',
    username: 'dataguru',
    password: '********',
    status: 'connected',
  },
  {
    id: '2',
    name: 'Development Oracle',
    host: 'dev-oracle.company.com',
    port: '1521',
    serviceName: 'DEVDB',
    username: 'dev_user',
    password: '********',
    status: 'disconnected',
  },
];

export const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Show active menus',
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Show me the active menus in the system',
        timestamp: new Date('2024-01-15T10:30:00'),
      },
      {
        id: '2',
        role: 'assistant',
        content: 'Here are the active menus in your Oracle database:',
        timestamp: new Date('2024-01-15T10:30:05'),
        sql: `SELECT menu_id, menu_name, parent_menu_id, status, created_date
FROM app_menus
WHERE status = 'ACTIVE'
ORDER BY parent_menu_id, menu_name;`,
      },
    ],
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    title: 'Find duplicate notifications',
    messages: [
      {
        id: '3',
        role: 'user',
        content: 'Find duplicate notifications in the notifications table',
        timestamp: new Date('2024-01-15T11:15:00'),
      },
      {
        id: '4',
        role: 'assistant',
        content: 'I found potential duplicate notifications. Here is the analysis:',
        timestamp: new Date('2024-01-15T11:15:03'),
        sql: `SELECT notification_type, recipient_id, COUNT(*) as duplicate_count
FROM notifications
WHERE created_date >= TRUNC(SYSDATE - 7)
GROUP BY notification_type, recipient_id
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;`,
      },
    ],
    createdAt: new Date('2024-01-15T11:15:00'),
  },
  {
    id: '3',
    title: 'Explain HR package',
    messages: [
      {
        id: '5',
        role: 'user',
        content: 'Explain the HR_EMPLOYEE_PKG package',
        timestamp: new Date('2024-01-15T14:20:00'),
      },
      {
        id: '6',
        role: 'assistant',
        content: 'The HR_EMPLOYEE_PKG package contains procedures and functions for managing employee data. Here is a breakdown:',
        timestamp: new Date('2024-01-15T14:20:04'),
        sql: `SELECT object_name, object_type, status
FROM user_objects
WHERE object_name = 'HR_EMPLOYEE_PKG';`,
      },
    ],
    createdAt: new Date('2024-01-15T14:20:00'),
  },
];

export const mockSchemaObjects: SchemaObject[] = [
  {
    name: 'Applications',
    type: 'table',
    columns: [
      { name: 'APP_ID', dataType: 'NUMBER', nullable: false },
      { name: 'APP_NAME', dataType: 'VARCHAR2(100)', nullable: false },
      { name: 'STATUS', dataType: 'VARCHAR2(20)', nullable: false },
      { name: 'CREATED_DATE', dataType: 'DATE', nullable: false },
    ],
  },
  {
    name: 'Users',
    type: 'table',
    columns: [
      { name: 'USER_ID', dataType: 'NUMBER', nullable: false },
      { name: 'USERNAME', dataType: 'VARCHAR2(50)', nullable: false },
      { name: 'EMAIL', dataType: 'VARCHAR2(100)', nullable: false },
      { name: 'ROLE_ID', dataType: 'NUMBER', nullable: false },
      { name: 'CREATED_DATE', dataType: 'DATE', nullable: false },
    ],
  },
  {
    name: 'Roles',
    type: 'table',
    columns: [
      { name: 'ROLE_ID', dataType: 'NUMBER', nullable: false },
      { name: 'ROLE_NAME', dataType: 'VARCHAR2(50)', nullable: false },
      { name: 'DESCRIPTION', dataType: 'VARCHAR2(200)', nullable: true },
    ],
  },
  {
    name: 'Menus',
    type: 'table',
    columns: [
      { name: 'MENU_ID', dataType: 'NUMBER', nullable: false },
      { name: 'MENU_NAME', dataType: 'VARCHAR2(100)', nullable: false },
      { name: 'PARENT_MENU_ID', dataType: 'NUMBER', nullable: true },
      { name: 'STATUS', dataType: 'VARCHAR2(20)', nullable: false },
    ],
  },
  {
    name: 'Notifications',
    type: 'table',
    columns: [
      { name: 'NOTIFICATION_ID', dataType: 'NUMBER', nullable: false },
      { name: 'NOTIFICATION_TYPE', dataType: 'VARCHAR2(50)', nullable: false },
      { name: 'RECIPIENT_ID', dataType: 'NUMBER', nullable: false },
      { name: 'MESSAGE', dataType: 'CLOB', nullable: false },
      { name: 'CREATED_DATE', dataType: 'DATE', nullable: false },
    ],
  },
  {
    name: 'Budgets',
    type: 'table',
    columns: [
      { name: 'BUDGET_ID', dataType: 'NUMBER', nullable: false },
      { name: 'DEPARTMENT_ID', dataType: 'NUMBER', nullable: false },
      { name: 'AMOUNT', dataType: 'NUMBER(15,2)', nullable: false },
      { name: 'FISCAL_YEAR', dataType: 'NUMBER(4)', nullable: false },
    ],
  },
  {
    name: 'V_EMPLOYEE_DETAILS',
    type: 'view',
    columns: [
      { name: 'EMP_ID', dataType: 'NUMBER', nullable: false },
      { name: 'FULL_NAME', dataType: 'VARCHAR2(100)', nullable: false },
      { name: 'DEPARTMENT', dataType: 'VARCHAR2(50)', nullable: false },
      { name: 'SALARY', dataType: 'NUMBER(12,2)', nullable: false },
    ],
  },
  {
    name: 'HR_EMPLOYEE_PKG',
    type: 'package',
    dependencies: ['Users', 'Roles'],
  },
  {
    name: 'TRG_AUDIT_LOG',
    type: 'trigger',
    dependencies: ['Users'],
  },
  {
    name: 'IDX_USERS_EMAIL',
    type: 'index',
  },
  {
    name: 'PK_USERS',
    type: 'constraint',
  },
  {
    name: 'SEQ_USER_ID',
    type: 'sequence',
  },
];

export const mockQueryResults = {
  columns: ['MENU_ID', 'MENU_NAME', 'PARENT_MENU_ID', 'STATUS', 'CREATED_DATE'],
  rows: [
    { MENU_ID: 1, MENU_NAME: 'Dashboard', PARENT_MENU_ID: null, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-01' },
    { MENU_ID: 2, MENU_NAME: 'User Management', PARENT_MENU_ID: null, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-01' },
    { MENU_ID: 3, MENU_NAME: 'Create User', PARENT_MENU_ID: 2, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-02' },
    { MENU_ID: 4, MENU_NAME: 'Edit User', PARENT_MENU_ID: 2, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-02' },
    { MENU_ID: 5, MENU_NAME: 'Reports', PARENT_MENU_ID: null, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-03' },
    { MENU_ID: 6, MENU_NAME: 'Sales Report', PARENT_MENU_ID: 5, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-03' },
    { MENU_ID: 7, MENU_NAME: 'Inventory Report', PARENT_MENU_ID: 5, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-04' },
    { MENU_ID: 8, MENU_NAME: 'Settings', PARENT_MENU_ID: null, STATUS: 'ACTIVE', CREATED_DATE: '2024-01-05' },
  ],
};
