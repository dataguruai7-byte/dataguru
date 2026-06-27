import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ChatPage } from './pages/ChatPage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { SchemaExplorerPage } from './pages/SchemaExplorerPage';
import { JoinFinderPage } from './pages/JoinFinderPage';
import { DuplicateDetectorPage } from './pages/DuplicateDetectorPage';
import { IndexAdvisorPage } from './pages/IndexAdvisorPage';
import { ViewAnalyzerPage } from './pages/ViewAnalyzerPage';
import { PackageAnalyzerPage } from './pages/PackageAnalyzerPage';
import { TriggerAnalyzerPage } from './pages/TriggerAnalyzerPage';
import { ExecutionPlanPage } from './pages/ExecutionPlanPage';
import { PerformanceReportsPage } from './pages/PerformanceReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { QueryGeneratorPage } from './pages/QueryGeneratorPage';
import { SavedQueriesPage } from './pages/SavedQueriesPage';
import { ChatHistoryPage } from './pages/ChatHistoryPage';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { RightPanel } from './components/layout/RightPanel';

function AppLayout() {
  const [activeView, setActiveView] = useState('chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);

  const renderContent = () => {
    if (activeView.startsWith('chat-')) {
      return <ChatPage chatId={activeView.replace('chat-', '')} />;
    }
    switch (activeView) {
      case 'chat': return <ChatPage />;
      case 'connections': return <ConnectionsPage />;
      case 'history': return <ChatHistoryPage />;
      case 'saved': return <SavedQueriesPage />;
      case 'schema': return <SchemaExplorerPage />;
      case 'generator': return <QueryGeneratorPage />;
      case 'joins': return <JoinFinderPage />;
      case 'duplicates': return <DuplicateDetectorPage />;
      case 'index': return <IndexAdvisorPage />;
      case 'views': return <ViewAnalyzerPage />;
      case 'packages': return <PackageAnalyzerPage />;
      case 'triggers': return <TriggerAnalyzerPage />;
      case 'execution': return <ExecutionPlanPage />;
      case 'reports': return <PerformanceReportsPage />;
      case 'settings': return <SettingsPage />;
      default: return <ChatPage />;
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-dark-950">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col">
        <TopNav onViewChange={setActiveView} />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-hidden">
            {renderContent()}
          </main>
          <RightPanel
            activeView={activeView}
            collapsed={rightPanelCollapsed}
            onToggle={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/app/*" element={<AppLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
