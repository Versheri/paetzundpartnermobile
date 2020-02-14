/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAbbrechnung = `subscription OnCreateAbbrechnung {
  onCreateAbbrechnung {
    id
    Typ
    Eintrag
    Kette
    patient
    arzt
    createdAt
    filetype
    Ketteninhalt
    bild {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    status
    _version
  }
}
`;

export const onUpdateAbbrechnung = `subscription OnUpdateAbbrechnung {
  onUpdateAbbrechnung {
    id
    Typ
    Eintrag
    Kette
    patient
    arzt
    createdAt
    filetype
    Ketteninhalt
    bild {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteAbbrechnung = `subscription OnDeleteAbbrechnung {
  onDeleteAbbrechnung {
    id
    Typ
    Eintrag
    Kette
    patient
    arzt
    createdAt
    filetype
    Ketteninhalt
    bild {
      bucket
      region
      key
    }
    audio {
      bucket
      region
      key
    }
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateArzt = `subscription OnCreateArzt {
  onCreateArzt {
    id
    Vorname
    Arztnr
    BetriebsstaettenNr
    Nachname
    Telefonnummer
    Email
    Zustand
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateArzt = `subscription OnUpdateArzt {
  onUpdateArzt {
    id
    Vorname
    Arztnr
    BetriebsstaettenNr
    Nachname
    Telefonnummer
    Email
    Zustand
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteArzt = `subscription OnDeleteArzt {
  onDeleteArzt {
    id
    Vorname
    Arztnr
    BetriebsstaettenNr
    Nachname
    Telefonnummer
    Email
    Zustand
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
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
    PatientName
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Volgebehandlung
    createdAt
    Kette
    status
    _version
    _deleted
    _lastChangedAt
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
    abrechnungsnummergesaetzlich
    Volgebehandlung
    createdAt
    Kette
    status
    _version
    _deleted
    _lastChangedAt
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
    PatientName
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Volgebehandlung
    createdAt
    Kette
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateDistanzen = `subscription OnCreateDistanzen {
  onCreateDistanzen {
    id
    Start
    Ende
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateDistanzen = `subscription OnUpdateDistanzen {
  onUpdateDistanzen {
    id
    Start
    Ende
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteDistanzen = `subscription OnDeleteDistanzen {
  onDeleteDistanzen {
    id
    Start
    Ende
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateKrankenKassen = `subscription OnCreateKrankenKassen {
  onCreateKrankenKassen {
    id
    kgruppe
    kzv
    knummer
    abrstelle
    kart
    kblock
    abrflags
    kname
    kplz
    kort
    kstrasse
    ktelefon
    ktelefax
    ksuchname
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateKrankenKassen = `subscription OnUpdateKrankenKassen {
  onUpdateKrankenKassen {
    id
    kgruppe
    kzv
    knummer
    abrstelle
    kart
    kblock
    abrflags
    kname
    kplz
    kort
    kstrasse
    ktelefon
    ktelefax
    ksuchname
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteKrankenKassen = `subscription OnDeleteKrankenKassen {
  onDeleteKrankenKassen {
    id
    kgruppe
    kzv
    knummer
    abrstelle
    kart
    kblock
    abrflags
    kname
    kplz
    kort
    kstrasse
    ktelefon
    ktelefax
    ksuchname
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateLeistungsKette = `subscription OnCreateLeistungsKette {
  onCreateLeistungsKette {
    id
    Name
    Typ
    Praxis
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateLeistungsKette = `subscription OnUpdateLeistungsKette {
  onUpdateLeistungsKette {
    id
    Name
    Typ
    Praxis
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteLeistungsKette = `subscription OnDeleteLeistungsKette {
  onDeleteLeistungsKette {
    id
    Name
    Typ
    Praxis
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateOffeneVolgebehandlung = `subscription OnCreateOffeneVolgebehandlung {
  onCreateOffeneVolgebehandlung {
    id
    Leistungsname
    Name
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Leistungskette
    Status
    Session
    SessionTime
    patientId
    arztId
    datum
    userId
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateOffeneVolgebehandlung = `subscription OnUpdateOffeneVolgebehandlung {
  onUpdateOffeneVolgebehandlung {
    id
    Leistungsname
    Name
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Leistungskette
    Status
    Session
    SessionTime
    patientId
    arztId
    datum
    userId
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteOffeneVolgebehandlung = `subscription OnDeleteOffeneVolgebehandlung {
  onDeleteOffeneVolgebehandlung {
    id
    Leistungsname
    Name
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Leistungskette
    Status
    Session
    SessionTime
    patientId
    arztId
    datum
    userId
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreatePatient = `subscription OnCreatePatient {
  onCreatePatient {
    id
    Vorname
    Nachname
    Krankenkasse
    createdAt
    kzv
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdatePatient = `subscription OnUpdatePatient {
  onUpdatePatient {
    id
    Vorname
    Nachname
    Krankenkasse
    createdAt
    kzv
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeletePatient = `subscription OnDeletePatient {
  onDeletePatient {
    id
    Vorname
    Nachname
    Krankenkasse
    createdAt
    kzv
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreatePflegeheim = `subscription OnCreatePflegeheim {
  onCreatePflegeheim {
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreatePflegeheimPdl = `subscription OnCreatePflegeheimPdl {
  onCreatePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    username
    userId
    Zustand
    Pflegeheim
    Formular
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdatePflegeheimPdl = `subscription OnUpdatePflegeheimPdl {
  onUpdatePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    username
    userId
    Zustand
    Pflegeheim
    Formular
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeletePflegeheimPdl = `subscription OnDeletePflegeheimPdl {
  onDeletePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    username
    userId
    Zustand
    Pflegeheim
    Formular
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreatePraxis = `subscription OnCreatePraxis {
  onCreatePraxis {
    id
    Strasse
    Praxisid
    BetriebsstaettenNr
    Name
    HausNr
    Postleitzahl
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdatePraxis = `subscription OnUpdatePraxis {
  onUpdatePraxis {
    id
    Strasse
    Praxisid
    BetriebsstaettenNr
    Name
    HausNr
    Postleitzahl
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeletePraxis = `subscription OnDeletePraxis {
  onDeletePraxis {
    id
    Strasse
    Praxisid
    BetriebsstaettenNr
    Name
    HausNr
    Postleitzahl
    Ort
    Telefonnummer
    Email
    HausAufteilung
    Etagen
    Zimmernummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreatePraxisGeschaeftsfuerung = `subscription OnCreatePraxisGeschaeftsfuerung {
  onCreatePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    BetriebsstaettenNr
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdatePraxisGeschaeftsfuerung = `subscription OnUpdatePraxisGeschaeftsfuerung {
  onUpdatePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    BetriebsstaettenNr
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeletePraxisGeschaeftsfuerung = `subscription OnDeletePraxisGeschaeftsfuerung {
  onDeletePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    BetriebsstaettenNr
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreatePraxisMitarbeiter = `subscription OnCreatePraxisMitarbeiter {
  onCreatePraxisMitarbeiter {
    id
    Vorname
    Nachname
    BetriebsstaettenNr
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdatePraxisMitarbeiter = `subscription OnUpdatePraxisMitarbeiter {
  onUpdatePraxisMitarbeiter {
    id
    Vorname
    Nachname
    BetriebsstaettenNr
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeletePraxisMitarbeiter = `subscription OnDeletePraxisMitarbeiter {
  onDeletePraxisMitarbeiter {
    id
    Vorname
    Nachname
    BetriebsstaettenNr
    Telefonnummer
    Email
    Zustand
    Praxis
    Formular
    userId
    username
    Group
    status
    _version
    _deleted
    _lastChangedAt
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateRecords = `subscription OnUpdateRecords {
  onUpdateRecords {
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteRecords = `subscription OnDeleteRecords {
  onDeleteRecords {
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateBefunde = `subscription OnCreateBefunde {
  onCreateBefunde {
    id
    PatientId
    zahn {
      bucket
      region
      key
    }
    color {
      bucket
      region
      key
    }
    Date
    Time
    ArztId
    ids
    Number
    index
    createdAt
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateBefunde = `subscription OnUpdateBefunde {
  onUpdateBefunde {
    id
    PatientId
    zahn {
      bucket
      region
      key
    }
    color {
      bucket
      region
      key
    }
    Date
    Time
    ArztId
    ids
    Number
    index
    createdAt
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteBefunde = `subscription OnDeleteBefunde {
  onDeleteBefunde {
    id
    PatientId
    zahn {
      bucket
      region
      key
    }
    color {
      bucket
      region
      key
    }
    Date
    Time
    ArztId
    ids
    Number
    index
    createdAt
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateTracking = `subscription OnCreateTracking {
  onCreateTracking {
    id
    start
    end
    Session
    SessionTime
    Leistung
    distanz
    Date
    PatientId
    ArztId
    ids
    Number
    Praxis
    createdAt
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateTracking = `subscription OnUpdateTracking {
  onUpdateTracking {
    id
    start
    end
    Session
    SessionTime
    Leistung
    distanz
    Date
    PatientId
    ArztId
    ids
    Number
    Praxis
    createdAt
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteTracking = `subscription OnDeleteTracking {
  onDeleteTracking {
    id
    start
    end
    Session
    SessionTime
    Leistung
    distanz
    Date
    PatientId
    ArztId
    ids
    Number
    Praxis
    createdAt
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateVolgebehandlung = `subscription OnCreateVolgebehandlung {
  onCreateVolgebehandlung {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateVolgebehandlung = `subscription OnUpdateVolgebehandlung {
  onUpdateVolgebehandlung {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteVolgebehandlung = `subscription OnDeleteVolgebehandlung {
  onDeleteVolgebehandlung {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateWegegeldTable = `subscription OnCreateWegegeldTable {
  onCreateWegegeldTable {
    id
    Distanz
    Nummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateWegegeldTable = `subscription OnUpdateWegegeldTable {
  onUpdateWegegeldTable {
    id
    Distanz
    Nummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteWegegeldTable = `subscription OnDeleteWegegeldTable {
  onDeleteWegegeldTable {
    id
    Distanz
    Nummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateScheine = `subscription OnCreateScheine {
  onCreateScheine {
    id
    Krankenkasse
    Kostentraegerkennung
    VersichertenNummer
    Patient
    Arzt
    SStatus
    Datum
    Unfall
    ArbeitsunfallOderBerufskrankheit
    Versorgungsleiden
    Hinfahrt
    Rueckfahrt
    vollTeilstationaereKrankenhausbehandlung
    andererGrund
    vorodernachstationaereBehandlung
    Dialyse
    Merkzeichen
    Ausnahmefall
    Mobilitaetsbeeintraechtigung
    Begruendung
    KTWerfordert
    vomam
    vomam2
    xpropWoche
    Behandlungsstaette
    TaxiMietwagen
    Rollstuhl
    Tragestuhl
    liegend
    medizinischfachlicheBetreuung
    RTW
    NAWNEF
    andere
    Sonstiges
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateScheine = `subscription OnUpdateScheine {
  onUpdateScheine {
    id
    Krankenkasse
    Kostentraegerkennung
    VersichertenNummer
    Patient
    Arzt
    SStatus
    Datum
    Unfall
    ArbeitsunfallOderBerufskrankheit
    Versorgungsleiden
    Hinfahrt
    Rueckfahrt
    vollTeilstationaereKrankenhausbehandlung
    andererGrund
    vorodernachstationaereBehandlung
    Dialyse
    Merkzeichen
    Ausnahmefall
    Mobilitaetsbeeintraechtigung
    Begruendung
    KTWerfordert
    vomam
    vomam2
    xpropWoche
    Behandlungsstaette
    TaxiMietwagen
    Rollstuhl
    Tragestuhl
    liegend
    medizinischfachlicheBetreuung
    RTW
    NAWNEF
    andere
    Sonstiges
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteScheine = `subscription OnDeleteScheine {
  onDeleteScheine {
    id
    Krankenkasse
    Kostentraegerkennung
    VersichertenNummer
    Patient
    Arzt
    SStatus
    Datum
    Unfall
    ArbeitsunfallOderBerufskrankheit
    Versorgungsleiden
    Hinfahrt
    Rueckfahrt
    vollTeilstationaereKrankenhausbehandlung
    andererGrund
    vorodernachstationaereBehandlung
    Dialyse
    Merkzeichen
    Ausnahmefall
    Mobilitaetsbeeintraechtigung
    Begruendung
    KTWerfordert
    vomam
    vomam2
    xpropWoche
    Behandlungsstaette
    TaxiMietwagen
    Rollstuhl
    Tragestuhl
    liegend
    medizinischfachlicheBetreuung
    RTW
    NAWNEF
    andere
    Sonstiges
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onCreateZahn = `subscription OnCreateZahn {
  onCreateZahn {
    id
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onUpdateZahn = `subscription OnUpdateZahn {
  onUpdateZahn {
    id
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const onDeleteZahn = `subscription OnDeleteZahn {
  onDeleteZahn {
    id
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
