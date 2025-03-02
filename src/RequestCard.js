import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import postData from './ApiService';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
  Button,
  Collapse
} from "@mui/material";


export default function IconPositionTabs() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [zone, setZone] = React.useState("");
  const [cluster, setCluster] = React.useState("");
  const [teamName, setTeamName] = React.useState("");
  const [envNumber, setEnvNumber] = React.useState("");
  const [pillar, setPillar] = React.useState("");
  const [type, setType] = React.useState("");
  const [version, setVersion] = React.useState("");
  const [environmentDefaults, setEnvironmentDefaults] = React.useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const clusterOptions = {
    NCZ: ["DEV", "IN5", "RAT", "SYS"],
    DPZ: ["RAT", "EXT", "ORT"],
  };

  const teamNameOptions = {
    NCZ: {
      DEV: "cdo",
      IN5: "cdo",
      RAT: "cdo",
      SYS: "cdo",
    },
    DPZ: {
      RAT: "oit",
      EXT: "oot",
      ORT: "oot",
    },
  };




  useEffect(() => {
    if (!zone) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await postData(zone);
        console.log('Fetched data:', data);
        setEnvironmentDefaults(data); // Update environmentDefaults with the fetched data
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [zone]);



  const pillarOptions = {
    NCZ: "clrg",
    DPZ: "clearing",
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
    setCluster("");
  };

  const handleClusterChange = (event) => {
    setCluster(event.target.value);
  };




  React.useEffect(() => {
    if (zone && cluster) {
      setTeamName(teamNameOptions[zone][cluster] || "");
    }
  }, [zone, cluster]);

  React.useEffect(() => {
    if (zone) {
      setPillar(pillarOptions[zone] || "");
    }
  }, [zone]);


  return (
    <Box>

      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="General" />
        <Tab label="Environment Variables" />
        <Tab label="Application Specs" />
        <Tab label="Kafka Topics" />
      </Tabs>

{tabIndex === 1 && (
  <Card sx={{ mt: 5, borderRadius: 5, width: 'auto', display: 'inline-block' }}>
    <CardContent sx={{ p: 5, width: 'auto' }}>
      {/* Center the form if no zone is selected */}
      <Box
        sx={{
          display: "flex",
          justifyContent: zone ? "flex-start" : "center",
          transition: "justify-content 0.5s ease-in-out", // Smooth transition when zone is selected
        }}
      >
        <Grid container spacing={5} sx={{ justifyContent: 'center'}}>
          {/* Environment Variables Form */}
          <Grid item xs={12} md={6}>
            <h2>Environment Variables</h2>
            <Grid container spacing={4}>
              {/* Zone Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ transform: zone ? "translate(14px, -20px) scale(0.75)" : "translate(14px, 12px) scale(1)" }} >Zone</InputLabel>
                  <Select value={zone} onChange={handleZoneChange}>
                    <MenuItem value="NCZ">NCZ</MenuItem>
                    <MenuItem value="DPZ">DPZ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Cluster Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth disabled={!zone}>
                  <InputLabel sx={{ transform: cluster ? "translate(14px, -20px) scale(0.75)" : "translate(14px, 12px) scale(1)" }} >Environment Type</InputLabel>
                  <Select value={cluster} onChange={handleClusterChange}>
                    {zone &&
                      clusterOptions[zone].map((clusterName) => (
                        <MenuItem key={clusterName} value={clusterName}>
                          {clusterName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Team Name */}
              <Grid item xs={12}>
                <TextField label="Team Name" value={teamName || ''} fullWidth disabled />
              </Grid>

              {/* Pillar */}
              <Grid item xs={12}>
                <TextField label="Pillar" value={pillar || ''} fullWidth disabled />
              </Grid>

              {/* Environment Number */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ transform: envNumber ? "translate(14px, -20px) scale(0.75)" : "translate(14px, 12px) scale(1)" }} >Environment Number</InputLabel>
                  <Select value={envNumber} onChange={(e) => setEnvNumber(e.target.value)}>
                    {[...Array(101).keys()].map((num) => (
                      <MenuItem key={num} value={num}>
                        {String(num).padStart(2, '0')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Environment Defaults - Hidden Until Zone is Selected */}
          <Grid item xs={12} md={6}>
            <Collapse in={Boolean(zone)} timeout={900}>
              <h2>Harness Defaults</h2>
              <Grid container spacing={2}>
                {Object.entries(environmentDefaults).map(([key, value]) => (
                  <Grid item xs={12} key={key}>
                    <TextField label={key} value={value} fullWidth disabled />
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={() => setTabIndex(0)} disabled={tabIndex === 0}>
          Back
        </Button>
        <Button variant="contained" onClick={() => setTabIndex(2)} disabled={tabIndex === 2}>
          Next
        </Button>
      </Box>
    </CardContent>
  </Card>
)}







      {/* General Tab */}
      {tabIndex === 0 && (
        <Card sx={{ mt: 5, borderRadius: 5 }}>
          <CardContent sx={{ p: 5 }}>
            <h2>General</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField value="Requestor Group" fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField value="First Name" fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField value="Last Name" fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField value="User ID" fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField value="email" fullWidth disabled />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => setTabIndex(0)}
                disabled={tabIndex === 0}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setTabIndex(1)}
                disabled={tabIndex === 1}>
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Application Specs Tab */}
      {tabIndex === 2 && (
        <Card sx={{ mt: 5, borderRadius: 5 }}>
          <CardContent sx={{ p: 5 }}>
            <h2>Application Specs</h2>
            <Grid container spacing={4}>
              {/* Type Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ transform: type ? "translate(14px, -20px) scale(0.75)" : "translate(14px, 12px) scale(1)" }}>
                    Type
                  </InputLabel>
                  <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="Feature">Feature</MenuItem>
                    <MenuItem value="Release">Release</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Version Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ transform: version ? "translate(14px, -20px) scale(0.75)" : "translate(14px, 12px) scale(1)" }}>
                    Version
                  </InputLabel>
                  <Select value={version} onChange={(e) => setVersion(e.target.value)}>
                    <MenuItem value=".56">.56</MenuItem>
                    <MenuItem value=".59">.59</MenuItem>
                    <MenuItem value=".60">.60</MenuItem>
                    <MenuItem value=".61">.61</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => setTabIndex(1)}
                disabled={tabIndex === 1}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => setTabIndex(3)}
                disabled={tabIndex === 3}>
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Kafka Topics Tab */}
      {tabIndex === 3 && (
        <Card sx={{ mt: 5, borderRadius: 5 }}>
          <CardContent sx={{ p: 5 }}>
            <h2>Kafka Topics</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Kafka Topics" fullWidth />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={() => setTabIndex(2)}
                disabled={tabIndex === 2}>
                Back
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
