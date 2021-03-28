import { Card, Grid } from '@material-ui/core';
import React from 'react';
import './App.css';
import SearchAppBar from './features/controller/AppBar';
import Controller from './features/controller/Controller';
import ResultsGraph from './features/graph/ResultsGraph';
import { useContestResults, useUserName } from './hooks';

function App() {
  const [userId, setUserId] = useUserName();
  const { results, isLoading } = useContestResults(userId);

  const handleChanged = (id: string) => {
    setUserId(id);
  };

  return (
    <div className='App'>
      <SearchAppBar userId={userId} onUserIdChanged={handleChanged} />
      <Grid container style={{ marginTop: '30px' }}>
        <Grid item xs={3}>
          <Card className='card'>
            <Controller />
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card className='card'>
            {isLoading ? null : <ResultsGraph results={results} />}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
