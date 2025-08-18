import React, { useState } from "react";

const DealerList = () => {
  const [dealers, setDealers] = useState([
    {
      id: 306,
      name: "ABC MOT.ARÇ.SAN.VE TİC.AŞ.",
      shortName: "ABC UYDU",
      code: "98443",
      mainCode: "98131",
      address: "MERKEZ MAH. CENDERE YOLU NO:12",
      district: "KAĞITHANE",
      city: "İSTANBUL",
      latitude: 41.084259,
      longitude: 28.977885,
      isRenew: false,
      isService: true,
      isSale: true,
      isVale: false,
      isExpress: false
    },
    {
                "id": 311,
                "name": "BATMAN MOTORLU ARAÇLAR SANAYİ TİCARET ANONİM ŞİRKETİ",
                "shortName": "BATMAN",
                "code": "98447",
                "mainCode": "98447",
                "address": "GÜLTEPE MAH KIBRIS ŞEHİTLERİ BLV TEKSTİL KENT KARŞISI ESKİ HAVA LİMANI KAVŞAĞI NO:132",
                "district": "MERKEZ",
                "city": "BATMAN",
                "latitude": 37.90955,
                "longitude": 41.11659,
                "isRenew": false,
                "isService": true,
                "isSale": true,
                "isVale": false,
                "isExpress": false
            }
  ]);

  return (
    <div>
      <h2>📋 Bayi Listesi</h2>
      {dealers.map((dealer) => (
        <div key={dealer.id} style={{ marginBottom: "1rem", padding: "0.5rem", border: "1px solid #ccc" }}>
          <h3>{dealer.name} ({dealer.shortName})</h3>
          <p><strong>Adres:</strong> {dealer.address}, {dealer.district}/{dealer.city}</p>
          <p><strong>Satış:</strong> {dealer.isSale ? "✅ Var" : "❌ Yok"}</p>
          <p><strong>Servis:</strong> {dealer.isService ? "✅ Var" : "❌ Yok"}</p>
        </div>
      ))}
    </div>
  );
};

export default DealerList;