import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { TaskPage } from "./components/Task.page";
import { ArchivePage } from "./components/Archive.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">New</Link>
              </li>
              <li>
                <Link to="/archive">Archive</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/tasks/:worklogId">
              <TaskPage />
            </Route>
            <Route path="/archive">
              <ArchivePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
