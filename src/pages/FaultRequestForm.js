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
  const [sayfa, setSayfa] = useState(1);

  // Sayfa 1: İletişim Bilgileri
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");

  const iletisimAlanlari = [
    { label: "Ad Soyad", value: ad, onChange: (e) => setAd(e.target.value) },
    { label: "E-posta", value: email, onChange: (e) => setEmail(e.target.value), type: "email" },
    { label: "Telefon Numarası", value: telefon, onChange: (e) => setTelefon(e.target.value), type: "tel", placeholder: "05xx xxx xx xx" },
  ];

  // Sayfa 2: Araç Bilgileri
  const [sasiNo, setSasiNo] = useState("");
  const [plaka, setPlaka] = useState("");
  const [km, setKm] = useState("");
  const [arizaAciklama, setArizaAciklama] = useState("");
  const [bakimIstiyor,] = useState(false);
  const [kvkkOnay, setKvkkOnay] = useState(false);

  const aracBilgileriAlanlari = [
    { label: "Şasi No", value: sasiNo, onChange: (e) => setSasiNo(e.target.value) },
    { label: "Plaka", value: plaka, onChange: (e) => setPlaka(e.target.value) },
    { label: "Kilometre", value: km, onChange: (e) => setKm(e.target.value), type: "number" },
    { label: "Arıza Açıklaması", value: arizaAciklama, onChange: (e) => setArizaAciklama(e.target.value), multiline: true, rows: 3 },
  ];

  // Sayfa 3: Bayi Seçimi
  const [secilenBayi, setSecilenBayi] = useState("");
  const bayiListesi = [
    "Renault Kartal",
    "Renault Kadıköy",
    "Renault Ümraniye",
  ];

  const ileri = () => setSayfa((prev) => Math.min(prev + 1, 4));
  const geri = () => setSayfa((prev) => Math.max(prev - 1, 1));

  const handleTalepGonder = () => {
    if (!kvkkOnay) {
      alert("Lütfen KVKK sözleşmesini kabul ediniz.");
      return;
    }

    if (!secilenBayi) {
      alert("Lütfen bir Renault bayisi seçiniz.");
      return;
    }

    alert(`Talep gönderildi:
Ad: ${ad}
E-posta: ${email}
Telefon: ${telefon}
Şasi No: ${sasiNo}
Plaka: ${plaka}
KM: ${km}
Arıza Açıklaması: ${arizaAciklama}
Bakım Talebi: ${bakimIstiyor ? "Evet" : "Hayır"}
KVKK Onayı: Kabul Edildi
Seçilen Bayi: ${secilenBayi}`);

    setSayfa(4);
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
      {sayfa === 1 && (
        <>
          <h2>İletişim Bilgileri</h2>
          {iletisimAlanlari.map((alan, index) => (
            <TextField
              key={index}
              label={alan.label}
              value={alan.value}
              onChange={alan.onChange}
              type={alan.type || "text"}
              placeholder={alan.placeholder || ""}
              variant="outlined"
              required
            />
          ))}
          <Button variant="contained" color="primary" onClick={ileri}>
            Devam Et
          </Button>
        </>
      )}

      {sayfa === 2 && (
        <>
          <h2>Araç Bilgileri</h2>
          {aracBilgileriAlanlari.map((alan, index) => (
            <TextField
              key={index}
              label={alan.label}
              value={alan.value}
              onChange={alan.onChange}
              type={alan.type || "text"}
              multiline={alan.multiline || false}
              rows={alan.rows || 1}
              variant="outlined"
              required
            />
          ))}
          <Bakim />
          <FormControlLabel
            control={
              <Checkbox
                checked={kvkkOnay}
                onChange={(e) => setKvkkOnay(e.target.checked)}
              />
            }
            label="KVKK sözleşmesini okudum ve kabul ediyorum"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={geri}>
              Geri
            </Button>
            <Button variant="contained" color="primary" onClick={ileri}>
              Devam Et
            </Button>
          </Box>
        </>
      )}

      {sayfa === 3 && (
        <>
          <h2>Renault Bayi Seçimi</h2>
          <TextField
            select
            label="Bayi Seçimi"
            value={secilenBayi}
            onChange={(e) => setSecilenBayi(e.target.value)}
            SelectProps={{ native: true }}
            required
          >
            <option value="">Bayi seçiniz</option>
            {bayiListesi.map((bayi, index) => (
              <option key={index} value={bayi}>
                {bayi}
              </option>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={geri}>
              Geri
            </Button>
            <Button variant="contained" color="primary" onClick={handleTalepGonder}>
              Talebi Gönder
            </Button>
          </Box>
        </>
      )}

      {sayfa === 4 && (
        <>
          <h2>Talebiniz Başarıyla Alındı!</h2>
          <p>Teşekkür ederiz, <strong>{ad}</strong>.</p>
          <p>Renault yetkilileri sizinle en kısa sürede iletişime geçecek.</p>
          <p><strong>Seçilen Bayi:</strong> {secilenBayi}</p>
        </>
      )}
    </Box>
  );
}

export default FaultRequestForm;
