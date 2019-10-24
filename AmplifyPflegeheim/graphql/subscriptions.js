// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateArzt = `subscription OnCreateArzt {
  onCreateArzt {
    id
    Vorname
    Nachname
    Arztnr
    BetriebsstaettenNr
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdateArzt = `subscription OnUpdateArzt {
  onUpdateArzt {
    id
    Vorname
    Nachname
    Arztnr
    BetriebsstaettenNr
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeleteArzt = `subscription OnDeleteArzt {
  onDeleteArzt {
    id
    Vorname
    Nachname
    Arztnr
    BetriebsstaettenNr
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreateAdministrator = `subscription OnCreateAdministrator {
  onCreateAdministrator {
    id
    Vorname
    Nachname
    Email
    userId
    Group
    Formular
  }
}
`;
export const onUpdateAdministrator = `subscription OnUpdateAdministrator {
  onUpdateAdministrator {
    id
    Vorname
    Nachname
    Email
    userId
    Group
    Formular
  }
}
`;
export const onDeleteAdministrator = `subscription OnDeleteAdministrator {
  onDeleteAdministrator {
    id
    Vorname
    Nachname
    Email
    userId
    Group
    Formular
  }
}
`;
export const onCreateBetreuer = `subscription OnCreateBetreuer {
  onCreateBetreuer {
    id
    Vorname
    Nachname
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdateBetreuer = `subscription OnUpdateBetreuer {
  onUpdateBetreuer {
    id
    Vorname
    Nachname
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeleteBetreuer = `subscription OnDeleteBetreuer {
  onDeleteBetreuer {
    id
    Vorname
    Nachname
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreatePatient = `subscription OnCreatePatient {
  onCreatePatient {
    id
    Vorname
    kzv
    Nachname
    VersichertenNr
	  Kostentraegerkennung
    Strasse
    sex
	  DateofBirth
    Hausnr
    Ort
    Postleitzahl
    Pflegestufe
    Pflegeheim
    Zimmernummr
    Etage
    Zustand
    Telefonnummer
    Email
    Betreuer
    Arzt
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdatePatient = `subscription OnUpdatePatient {
  onUpdatePatient {
    id
    kzv
    Vorname
    Nachname
    Strasse
    VersichertenNr
	  Kostentraegerkennung
    sex
	  DateofBirth
    Hausnr
    Ort
    Postleitzahl
    Pflegestufe
    Pflegeheim
    Zimmernummr
    Etage
    Zustand
    Telefonnummer
    Email
    Betreuer
    Arzt
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeletePatient = `subscription OnDeletePatient {
  onDeletePatient {
    id
    kzv
    Vorname
    Nachname
    VersichertenNr
	  Kostentraegerkennung
    sex
	  DateofBirth
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Pflegestufe
    Pflegeheim
    Zimmernummr
    Etage
    Zustand
    Telefonnummer
    Email
    Betreuer
    Arzt
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreatePraxisMitarbeiter = `subscription OnCreatePraxisMitarbeiter {
  onCreatePraxisMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    BetriebsstaettenNr
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdatePraxisMitarbeiter = `subscription OnUpdatePraxisMitarbeiter {
  onUpdatePraxisMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    BetriebsstaettenNr
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeletePraxisMitarbeiter = `subscription OnDeletePraxisMitarbeiter {
  onDeletePraxisMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    BetriebsstaettenNr
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreatePraxis = `subscription OnCreatePraxis {
  onCreatePraxis {
    id
    Strasse
    Name
    HausNr
    Postleitzahl
    Praxisid
    BetriebsstaettenNr
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
  }
}
`;
export const onUpdatePraxis = `subscription OnUpdatePraxis {
  onUpdatePraxis {
    id
    Strasse
    Name
    HausNr
    Postleitzahl
    BetriebsstaettenNr
    Praxisid
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
  }
}
`;
export const onDeletePraxis = `subscription OnDeletePraxis {
  onDeletePraxis {
    id
    Strasse
    Name
    HausNr
    Postleitzahl
    BetriebsstaettenNr
    Praxisid
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
  }
}
`;
export const onCreatePraxisGeschaeftsfuerung = `subscription OnCreatePraxisGeschaeftsfuerung {
  onCreatePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    BetriebsstaettenNr
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdatePraxisGeschaeftsfuerung = `subscription OnUpdatePraxisGeschaeftsfuerung {
  onUpdatePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    BetriebsstaettenNr
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeletePraxisGeschaeftsfuerung = `subscription OnDeletePraxisGeschaeftsfuerung {
  onDeletePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    BetriebsstaettenNr
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreatePflegeheim = `subscription OnCreatePflegeheim {
  onCreatePflegeheim {
    id
    Strasse
    Pflegeheimid
    Name
    HausNr
    Postleitzahl
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
    Formular
  }
}
`;
export const onUpdatePflegeheim = `subscription OnUpdatePflegeheim {
  onUpdatePflegeheim {
    id
    Strasse
    Name
    Pflegeheimid
    HausNr
    Postleitzahl
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
    Formular
  }
}
`;
export const onDeletePflegeheim = `subscription OnDeletePflegeheim {
  onDeletePflegeheim {
    id
    Strasse
    Name
    Pflegeheimid
    HausNr
    Postleitzahl
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
    Formular
  }
}
`;
export const onCreatePflegeheimMitarbeiter = `subscription OnCreatePflegeheimMitarbeiter {
  onCreatePflegeheimMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdatePflegeheimMitarbeiter = `subscription OnUpdatePflegeheimMitarbeiter {
  onUpdatePflegeheimMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeletePflegeheimMitarbeiter = `subscription OnDeletePflegeheimMitarbeiter {
  onDeletePflegeheimMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreatePflegeheimPDL = `subscription OnCreatePflegeheimPDL {
  onCreatePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    userId
    Zustand
    Pflegeheim
    Formular
  }
}
`;
export const onUpdatePflegeheimPDL = `subscription OnUpdatePflegeheimPDL {
  onUpdatePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    userId
    Zustand
    Pflegeheim
    Formular
  }
}
`;
export const onDeletePflegeheimPDL = `subscription OnDeletePflegeheimPDL {
  onDeletePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    userId
    Zustand
    Pflegeheim
    Formular
  }
}
`;
export const onCreatePflegeheimGeschaeftsfuerung = `subscription OnCreatePflegeheimGeschaeftsfuerung {
  onCreatePflegeheimGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onUpdatePflegeheimGeschaeftsfuerung = `subscription OnUpdatePflegeheimGeschaeftsfuerung {
  onUpdatePflegeheimGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onDeletePflegeheimGeschaeftsfuerung = `subscription OnDeletePflegeheimGeschaeftsfuerung {
  onDeletePflegeheimGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    Pflegeheim
    Formular
    userId
    username
    Group
  }
}
`;
export const onCreateDistanzen = `subscription OnCreateDistanzen {
  onCreateDistanzen {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const onUpdateDistanzen = `subscription OnUpdateDistanzen {
  onUpdateDistanzen {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const onDeleteDistanzen = `subscription OnDeleteDistanzen {
  onDeleteDistanzen {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const onCreateRecords = `subscription OnCreateRecords {
  onCreateRecords {
    id
    arzt
    patient
    record
    Session
	    SessionTime
    zahn
  	datum
    abrechnungsnummerprivat
	  abrechnungsnummergesaetzlich
    Leistungskette
    Ketteninhalt
    file {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    Access
    createdAt
    updatedAt
  }
}
`;

export const onCreateRecords2 = `subscription OnCreateRecords2($records: [CreateRecordsInput]) {
  onCreateRecords2(records: $records) {
    id
    arzt
    patient
    record
    abrechnungsnummerprivat
    Session
	    SessionTime
	  abrechnungsnummergesaetzlich
    Leistungskette
    zahn
  	datum
    Ketteninhalt
    file {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    Access
    createdAt
    updatedAt
  }
}
`;

export const onUpdateRecords = `subscription OnUpdateRecords {
  onUpdateRecords {
    id
    arzt
    patient
    record
    zahn
    datum
    Session
	    SessionTime
    abrechnungsnummerprivat
	  abrechnungsnummergesaetzlich
    Leistungskette
    Ketteninhalt
    file {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    Access
    createdAt
    updatedAt
  }
}
`;
export const onDeleteRecords = `subscription OnDeleteRecords {
  onDeleteRecords {
    id
    arzt
    patient
    record
    zahn
    datum
    Session
	    SessionTime
    abrechnungsnummerprivat
	  abrechnungsnummergesaetzlich
    Leistungskette
    Ketteninhalt
    file {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    Access
    createdAt
    updatedAt
  }
}
`;
export const onCreateBehandlungen = `subscription OnCreateBehandlungen {
  onCreateBehandlungen {
    id
    name
    Kuerzel
    Arzt
    ArztName
    Patient
    Volgebehandlung
    PatientName
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Kette
  }
}
`;
export const onUpdateBehandlungen = `subscription OnUpdateBehandlungen {
  onUpdateBehandlungen {
    id
    name
    Kuerzel
    Arzt
    ArztName
    Patient
    PatientName
    abrechnungsnummerprivat
    Volgebehandlung
    abrechnungsnummergesaetzlich
    Kette
  }
}
`;
export const onDeleteBehandlungen = `subscription OnDeleteBehandlungen {
  onDeleteBehandlungen {
    id
    name
    Kuerzel
    Arzt
    ArztName
    Patient
    Volgebehandlung
    PatientName
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Kette
  }
}
`;
