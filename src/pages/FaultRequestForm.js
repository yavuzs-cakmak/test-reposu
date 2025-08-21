
import React, { useState } from 'react';
import DealerMap from './DealerMap';
import Bakim from './bakim';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
  const nameRegex = /^([a-zA-ZğüşıöçĞÜŞİÖÇ]{2,20})(\s[a-zA-ZğüşıöçĞÜŞİÖÇ]{2,20}){1,3}$/;
  const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,10}$/;
  const sasiNoRegex = /^[A-Z0-9]{17}$/;
  const plateRegex = /^(0[1-9]|[1-7][0-9]|8[01])\s[A-ZÇŞÜÖİĞ]{1,3}\s\d{1,4}$/;
  const phoneRegex = /^\+90\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;

function FaultRequestForm() {
  const [page, setPage] = useState(1);

  // Sayfa 1: İletişim Bilgileri
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const isPage1Valid =
  nameRegex.test(name) && name.trim() !== "" &&
  emailRegex.test(email) && email.trim() !== "" &&
  phoneRegex.test(phone) && phone.trim() !== "";

 

  // Sayfa 2: Araç Bilgileri
  const [vehicleidNo, setVehicleidNo] = useState("");
  const [plate, setPlate] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [maintenanceRequired, ] = useState(false);
  const [kvkkApproval, setKvkkApproval] = useState(false);
  const isPage2Valid =
  sasiNoRegex.test(vehicleidNo) && vehicleidNo.trim() !== "" &&
  plateRegex.test(plate) && plate.trim() !== "" &&
  kilometer.trim() !== "" &&
  faultDescription.trim() !== "";

  

  // Sayfa 3: Bayi Seçimi
  const [selectedDealer, setSelectedDealer] = useState("");


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
          <TextField
            label="Ad Soyad"
            value={name}
            onChange={e => setName(e.target.value)}
            error={name !== "" && !nameRegex.test(name)}
            helperText={name !== "" && !nameRegex.test(name) ? "Geçersiz ad soyad" : ""}
            variant="outlined"
            required
          />
          <TextField
            label="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={email !== "" && !emailRegex.test(email)}
            helperText={email !== "" && !emailRegex.test(email) ? "Geçersiz e-posta" : ""}
            type="email"
            variant="outlined"
            required
          />
          <TextField
            label="Telefon Numarası"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            error={phone !== "" && !phoneRegex.test(phone)}
            helperText={phone !== "" && !phoneRegex.test(phone) ? "Geçersiz telefon" : ""}
            type="tel"
            placeholder="+90 xxx xxx xx xx"
            variant="outlined"
            required
          />
         <Button variant="contained" color="primary" onClick={forward} disabled={!isPage1Valid}>
  Devam Et
</Button>
        </>
      )}

      {page === 2 && (
        <>
          <h2>Araç Bilgileri</h2>
          <TextField
            label="Şasi No"
            value={vehicleidNo}
            onChange={e => setVehicleidNo(e.target.value)}
            error={vehicleidNo !== "" && !sasiNoRegex.test(vehicleidNo)}
            helperText={vehicleidNo !== "" && !sasiNoRegex.test(vehicleidNo) ? "Geçersiz şasi no" : ""}
            variant="outlined"
            required
          />
          <TextField
            label="Plaka"
            value={plate}
            onChange={e => setPlate(e.target.value)}
            error={plate !== "" && !plateRegex.test(plate)}
            helperText={plate !== "" && !plateRegex.test(plate) ? "Geçersiz plaka" : ""}
            variant="outlined"
            required
          />
          <TextField
            label="Kilometre"
            value={kilometer}
            onChange={e => setKilometer(e.target.value)}
            type="number"
            variant="outlined"
            required
          />
          <TextField
            label="Arıza Açıklaması"
            value={faultDescription}
            onChange={e => setFaultDescription(e.target.value)}
            multiline
            rows={3}
            variant="outlined"
            required
          />
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
            <Button variant="contained" color="primary" onClick={forward} disabled={!isPage2Valid}>
  Devam Et
</Button>
          </Box>
        </>
      )}

{page === 3 && (
  <>
    <h2>Renault Bayi Seçimi</h2>
    <DealerMap
      selectedDealer={selectedDealer}
      setSelectedDealer={setSelectedDealer}
    />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
          <p><strong>Seçilen Servis Bayisi:</strong> {selectedDealer}</p>
        </>
      )}
    </Box>
  );
}

export default FaultRequestForm;
