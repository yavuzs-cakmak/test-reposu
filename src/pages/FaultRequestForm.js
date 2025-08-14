import React, { useState } from 'react';
import Bakim from './bakim';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

function FaultRequestForm() {
  const [page, setPage] = useState(1);

  // Sayfa 1: İletişim Bilgileri
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const communicationAreas = [
    { label: "Ad Soyad", value: name, onChange: (e) => setName(e.target.value) },
    { label: "E-posta", value: email, onChange: (e) => setEmail(e.target.value), type: "email" },
    { label: "Telefon Numarası", value: phone, onChange: (e) => setPhone(e.target.value), type: "tel", placeholder: "05xx xxx xx xx" },
  ];

  // Sayfa 2: Araç Bilgileri
  const [vehicleidNo, setVehicleidNo] = useState("");
  const [plate, setPlate] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [maintenanceRequired, ] = useState(false);
  const [kvkkApproval, setKvkkApproval] = useState(false);

  const vehicleInformationFields = [
    { label: "Şasi No", value: vehicleidNo, onChange: (e) => setVehicleidNo(e.target.value) },
    { label: "Plaka", value: plate, onChange: (e) => setPlate(e.target.value) },
    { label: "Kilometre", value: kilometer, onChange: (e) => setKilometer(e.target.value), type: "number" },
    { label: "Arıza Açıklaması", value: faultDescription, onChange: (e) => setFaultDescription(e.target.value), multiline: true, rows: 3 },
  ];

  // Sayfa 3: Bayi Seçimi
  const [selectedDealer, setSelectedDealer] = useState("");
  const dealerList = [
    "Renault Kartal",
    "Renault Kadıköy",
    "Renault Ümraniye",
  ];

  const forward = () => setPage((prev) => Math.min(prev + 1, 4));
  const back = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleTalepGonder = () => {
    if (!kvkkApproval) {
      alert("Lütfen KVKK sözleşmesini kabul ediniz.");
      return;
    }

    if (!selectedDealer) {
      alert("Lütfen bir Renault bayisi seçiniz.");
      return;
    }

    alert(`Talep gönderildi:
Ad: ${name}
E-posta: ${email}
Telefon: ${phone}
Şasi No: ${vehicleidNo}
Plaka: ${plate}
KM: ${kilometer}
Arıza Açıklaması: ${faultDescription}
Bakım Talebi: ${maintenanceRequired ? "Evet" : "Hayır"}
KVKK Onayı: Kabul Edildi
Seçilen Bayi: ${selectedDealer}`);

    setPage(4);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {page === 1 && (
        <>
          <h2>İletişim Bilgileri</h2>
          {communicationAreas.map((area, index) => (
            <TextField
              key={index}
              label={area.label}
              value={area.value}
              onChange={area.onChange}
              type={area.type || "text"}
              placeholder={area.placeholder || ""}
              variant="outlined"
              required
            />
          ))}
          <Button variant="contained" color="primary" onClick={forward}>
            Devam Et
          </Button>
        </>
      )}

      {page === 2 && (
        <>
          <h2>Araç Bilgileri</h2>
          {vehicleInformationFields.map((field, index) => (
            <TextField
              key={index}
              label={field.label}
              value={field.value}
              onChange={field.onChange}
              type={field.type || "text"}
              multiline={field.multiline || false}
              rows={field.rows || 1}
              variant="outlined"
              required
            />
          ))}
          <Bakim />
          <FormControlLabel
            control={
              <Checkbox
                checked={kvkkApproval}
                onChange={(e) => setKvkkApproval(e.target.checked)}
              />
            }
            label="KVKK sözleşmesini okudum ve kabul ediyorum"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={back}>
              Geri
            </Button>
            <Button variant="contained" color="primary" onClick={forward}>
              Devam Et
            </Button>
          </Box>
        </>
      )}

      {page === 3 && (
        <>
          <h2>Renault Bayi Seçimi</h2>
          <TextField
            select
            label="Bayi Seçimi"
            value={selectedDealer}
            onChange={(e) => setSelectedDealer(e.target.value)}
            SelectProps={{ native: true }}
            required
          >
            <option value="">Bayi seçiniz</option>
            {dealerList.map((dealer, index) => (
              <option key={index} value={dealer}>
                {dealer}
              </option>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={back}>
              Geri
            </Button>
            <Button variant="contained" color="primary" onClick={handleTalepGonder}>
              Talebi Gönder
            </Button>
          </Box>
        </>
      )}

      {page === 4 && (
        <>
          <h2>Talebiniz Başarıyla Alındı!</h2>
          <p>Teşekkür ederiz, <strong>{name}</strong>.</p>
          <p>Renault yetkilileri sizinle en kısa sürede iletişime geçecek.</p>
          <p><strong>Seçilen Bayi:</strong> {selectedDealer}</p>
        </>
      )}
    </Box>
  );
}

export default FaultRequestForm;
