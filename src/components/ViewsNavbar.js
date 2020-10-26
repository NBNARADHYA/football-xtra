import React from 'react';
import {
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { views } from '../static/views';
import { seasons } from '../static/seasons';

const ViewsNavbar = (props) => {
  const viewsTabs = views.map((view) => {
    return <Tab value={view.key} key={view.key} label={view.name} />;
  });
  const seasonsSelectItems = seasons.map((season) => (
    <MenuItem key={season} value={season}>
      {season}
    </MenuItem>
  ));
  return (
    <div>
      <Tabs
        className="mt-1 mb-2"
        value={props.view}
        onChange={(_, view) => props.changeLeagueView(view)}
      >
        {viewsTabs}
      </Tabs>
      <FormControl className="ml-3">
        <InputLabel>Season</InputLabel>
        <Select
          value={props.season}
          onChange={(event) => props.changeSeason(event.target.value)}
        >
          {seasonsSelectItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default ViewsNavbar;
