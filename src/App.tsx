import { Card, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useContestResult } from './api';
import './App.css';
import SearchAppBar from './features/controller/AppBar';
import Controller from './features/controller/Controller';
import ResultsGraph from './features/graph/ResultsGraph';

function App() {
  const [userId, setUserId] = useState('');
  const [contestResult, loading] = useContestResult(userId);

  const handleChanged = (id: string) => {
    setUserId(id);
  };

  return (
    <div className='App'>
      <SearchAppBar onUserIdChanged={handleChanged} />
      <div style={{ marginTop: '30px' }}>
        <Grid container>
          <Grid item sm={3}>
            <Card className='card'>
              <Controller />
            </Card>
          </Grid>
          <Grid item sm={8}>
            <Card className='card'>
              {loading ? null : <ResultsGraph results={contestResult} />}
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
