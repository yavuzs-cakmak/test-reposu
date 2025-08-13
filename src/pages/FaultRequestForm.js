import React, { useState } from 'react';
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

    // Sayfa 2: Araç Bilgileri
    const [sasiNo, setSasiNo] = useState("");
    const [plaka, setPlaka] = useState("");
    const [km, setKm] = useState("");
    const [arizaAciklama, setArizaAciklama] = useState("");
    const [bakimIstiyor, setBakimIstiyor] = useState(false);
    const [kvkkOnay, setKvkkOnay] = useState(false);

    // Sayfa 3: Bayi Seçimi
    const [secilenBayi, setSecilenBayi] = useState("");

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
                    <TextField
                        label="Ad Soyad"
                        variant="outlined"
                        value={ad}
                        onChange={(e) => setAd(e.target.value)}
                        required
                    />
                    <TextField
                        label="E-posta"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Telefon Numarası"
                        type="tel"
                        variant="outlined"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        placeholder="05xx xxx xx xx"
                        required
                    />
                    <Button variant="contained" color="primary" onClick={ileri}>
                        Devam Et
                    </Button>
                </>
            )}

            {sayfa === 2 && (
                <>
                    <h2>Araç Bilgileri</h2>
                    <TextField
                        label="Şasi No"
                        variant="outlined"
                        value={sasiNo}
                        onChange={(e) => setSasiNo(e.target.value)}
                        required
                    />
                    <TextField
                        label="Plaka"
                        variant="outlined"
                        value={plaka}
                        onChange={(e) => setPlaka(e.target.value)}
                        required
                    />
                    <TextField
                        label="Kilometre"
                        type="number"
                        variant="outlined"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        required
                    />
                    <TextField
                        label="Arıza Açıklaması"
                        variant="outlined"
                        value={arizaAciklama}
                        onChange={(e) => setArizaAciklama(e.target.value)}
                        multiline
                        rows={3}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={bakimIstiyor}
                                onChange={(e) => setBakimIstiyor(e.target.checked)}
                            />
                        }
                        label="Bakım da istiyorum"
                    />
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
                        <option value="Renault Kartal">Renault Kartal</option>
                        <option value="Renault Kadiköy">Renault Kadıköy</option>
                        <option value="Renault Ümraniye">Renault Ümraniye</option>
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