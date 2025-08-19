import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, TextField, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

function DealerMap({ selectedDealer, setSelectedDealer }) {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    console.log("0");
    setLoading(true);
    console.log("1");
    fetch('https://as-mais-backend.azurewebsites.net/api/mais/dealers', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 2e663a7d-2993-441f-bc45-912d75c6bbeb',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "data Out");
      console.log(data.data.dealers, "data Out asdf");
      setDealers(data.data.dealers);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Bayi verisi alınamadı:', err);
      setLoading(false);
      });
    }, []);
    
    console.log(dealers, "dealers Out");
    return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h3">Renault Bayi Seçimi</Typography>

      <Button variant="outlined" onClick={() => setShowList(!showList)} sx={{ mb: 2 }}>
        {showList ? 'Haritayı Göster' : 'ShowList (Listeyi Göster)'}
      </Button>

      {loading ? (
        <p>Bayi verileri yükleniyor...</p>
      ) : showList ? (
        <List sx={{ maxHeight: 300, overflow: 'auto', border: '1px solid #ccc', borderRadius: 1 }}>
          {dealers.map((dealer, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => setSelectedDealer(dealer.name)}>
                <ListItemText primary={dealer.name} secondary={dealer.address} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <MapContainer center={[39.925533, 32.866287]} zoom={6} style={{ height: '400px', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {dealers.map((dealer, index) => (
            <Marker
              key={index}
              position={[dealer.latitude, dealer.longitude]}
              eventHandlers={{
                click: () => setSelectedDealer(dealer.name),
              }}
            >
              <Popup>
                <strong>{dealer.name}</strong><br />
                {dealer.address}<br />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setSelectedDealer(dealer.name)}
                >
                  Bu Bayiyi Seç
                </Button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      <TextField
        label="Seçilen Bayi"
        value={selectedDealer}
        onChange={(e) => setSelectedDealer(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        required
      />
    </Box>
  );
}

export default DealerMap;