import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, TextField, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function DealerMap({ selectedDealer, setSelectedDealer }) {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetch('https://api/mais/dealers', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 2e663a7d-2993-441f-bc45-912d75c6bbeb',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDealers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Bayi verisi alınamadı:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <h3>Renault Bayi Seçimi</h3>

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