/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAbbrechnung = `mutation CreateAbbrechnung($input: CreateAbbrechnungInput!) {
  createAbbrechnung(input: $input) {
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
  }
}
`;
export const updateAbbrechnung = `mutation UpdateAbbrechnung($input: UpdateAbbrechnungInput!) {
  updateAbbrechnung(input: $input) {
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
  }
}
`;
export const deleteAbbrechnung = `mutation DeleteAbbrechnung($input: DeleteAbbrechnungInput!) {
  deleteAbbrechnung(input: $input) {
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
  }
}
`;
export const createAdministrator = `mutation CreateAdministrator($input: CreateAdministratorInput!) {
  createAdministrator(input: $input) {
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
export const updateAdministrator = `mutation UpdateAdministrator($input: UpdateAdministratorInput!) {
  updateAdministrator(input: $input) {
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
export const deleteAdministrator = `mutation DeleteAdministrator($input: DeleteAdministratorInput!) {
  deleteAdministrator(input: $input) {
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
export const createArzt = `mutation CreateArzt($input: CreateArztInput!) {
  createArzt(input: $input) {
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
  }
}
`;
export const updateArzt = `mutation UpdateArzt($input: UpdateArztInput!) {
  updateArzt(input: $input) {
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
  }
}
`;
export const deleteArzt = `mutation DeleteArzt($input: DeleteArztInput!) {
  deleteArzt(input: $input) {
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
  }
}
`;
export const createBehandlungen = `mutation CreateBehandlungen($input: CreateBehandlungenInput!) {
  createBehandlungen(input: $input) {
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
  }
}
`;
export const updateBehandlungen = `mutation UpdateBehandlungen($input: UpdateBehandlungenInput!) {
  updateBehandlungen(input: $input) {
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
  }
}
`;
export const deleteBehandlungen = `mutation DeleteBehandlungen($input: DeleteBehandlungenInput!) {
  deleteBehandlungen(input: $input) {
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
  }
}
`;
export const createBetreuer = `mutation CreateBetreuer($input: CreateBetreuerInput!) {
  createBetreuer(input: $input) {
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
export const updateBetreuer = `mutation UpdateBetreuer($input: UpdateBetreuerInput!) {
  updateBetreuer(input: $input) {
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
export const deleteBetreuer = `mutation DeleteBetreuer($input: DeleteBetreuerInput!) {
  deleteBetreuer(input: $input) {
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
export const createDistanzen = `mutation CreateDistanzen($input: CreateDistanzenInput!) {
  createDistanzen(input: $input) {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const updateDistanzen = `mutation UpdateDistanzen($input: UpdateDistanzenInput!) {
  updateDistanzen(input: $input) {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const deleteDistanzen = `mutation DeleteDistanzen($input: DeleteDistanzenInput!) {
  deleteDistanzen(input: $input) {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const createKrankenKassen = `mutation CreateKrankenKassen($input: CreateKrankenKassenInput!) {
  createKrankenKassen(input: $input) {
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
  }
}
`;
export const updateKrankenKassen = `mutation UpdateKrankenKassen($input: UpdateKrankenKassenInput!) {
  updateKrankenKassen(input: $input) {
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
  }
}
`;
export const deleteKrankenKassen = `mutation DeleteKrankenKassen($input: DeleteKrankenKassenInput!) {
  deleteKrankenKassen(input: $input) {
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
  }
}
`;
export const createLeistungsKette = `mutation CreateLeistungsKette($input: CreateLeistungsKetteInput!) {
  createLeistungsKette(input: $input) {
    id
    Name
    Typ
    Praxis
  }
}
`;
export const updateLeistungsKette = `mutation UpdateLeistungsKette($input: UpdateLeistungsKetteInput!) {
  updateLeistungsKette(input: $input) {
    id
    Name
    Typ
    Praxis
  }
}
`;
export const deleteLeistungsKette = `mutation DeleteLeistungsKette($input: DeleteLeistungsKetteInput!) {
  deleteLeistungsKette(input: $input) {
    id
    Name
    Typ
    Praxis
  }
}
`;
export const createOffeneVolgebehandlung = `mutation CreateOffeneVolgebehandlung(
  $input: CreateOffeneVolgebehandlungInput!
) {
  createOffeneVolgebehandlung(input: $input) {
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
  }
}
`;
export const updateOffeneVolgebehandlung = `mutation UpdateOffeneVolgebehandlung(
  $input: UpdateOffeneVolgebehandlungInput!
) {
  updateOffeneVolgebehandlung(input: $input) {
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
  }
}
`;
export const deleteOffeneVolgebehandlung = `mutation DeleteOffeneVolgebehandlung(
  $input: DeleteOffeneVolgebehandlungInput!
) {
  deleteOffeneVolgebehandlung(input: $input) {
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
  }
}
`;
export const createPatient = `mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
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
  }
}
`;
export const updatePatient = `mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient(input: $input) {
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
  }
}
`;
export const deletePatient = `mutation DeletePatient($input: DeletePatientInput!) {
  deletePatient(input: $input) {
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
  }
}
`;
export const createPflegeheim = `mutation CreatePflegeheim($input: CreatePflegeheimInput!) {
  createPflegeheim(input: $input) {
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
export const updatePflegeheim = `mutation UpdatePflegeheim($input: UpdatePflegeheimInput!) {
  updatePflegeheim(input: $input) {
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
export const deletePflegeheim = `mutation DeletePflegeheim($input: DeletePflegeheimInput!) {
  deletePflegeheim(input: $input) {
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
export const createPflegeheimGeschaeftsfuerung = `mutation CreatePflegeheimGeschaeftsfuerung(
  $input: CreatePflegeheimGeschaeftsfuerungInput!
) {
  createPflegeheimGeschaeftsfuerung(input: $input) {
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
export const updatePflegeheimGeschaeftsfuerung = `mutation UpdatePflegeheimGeschaeftsfuerung(
  $input: UpdatePflegeheimGeschaeftsfuerungInput!
) {
  updatePflegeheimGeschaeftsfuerung(input: $input) {
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
export const deletePflegeheimGeschaeftsfuerung = `mutation DeletePflegeheimGeschaeftsfuerung(
  $input: DeletePflegeheimGeschaeftsfuerungInput!
) {
  deletePflegeheimGeschaeftsfuerung(input: $input) {
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
export const createPflegeheimMitarbeiter = `mutation CreatePflegeheimMitarbeiter(
  $input: CreatePflegeheimMitarbeiterInput!
) {
  createPflegeheimMitarbeiter(input: $input) {
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
export const updatePflegeheimMitarbeiter = `mutation UpdatePflegeheimMitarbeiter(
  $input: UpdatePflegeheimMitarbeiterInput!
) {
  updatePflegeheimMitarbeiter(input: $input) {
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
export const deletePflegeheimMitarbeiter = `mutation DeletePflegeheimMitarbeiter(
  $input: DeletePflegeheimMitarbeiterInput!
) {
  deletePflegeheimMitarbeiter(input: $input) {
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
export const createPflegeheimPDL = `mutation CreatePflegeheimPDL($input: CreatePflegeheimPDLInput!) {
  createPflegeheimPDL(input: $input) {
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
  }
}
`;
export const updatePflegeheimPDL = `mutation UpdatePflegeheimPDL($input: UpdatePflegeheimPDLInput!) {
  updatePflegeheimPDL(input: $input) {
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
  }
}
`;
export const deletePflegeheimPDL = `mutation DeletePflegeheimPDL($input: DeletePflegeheimPDLInput!) {
  deletePflegeheimPDL(input: $input) {
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
  }
}
`;
export const createPraxis = `mutation CreatePraxis($input: CreatePraxisInput!) {
  createPraxis(input: $input) {
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
  }
}
`;
export const updatePraxis = `mutation UpdatePraxis($input: UpdatePraxisInput!) {
  updatePraxis(input: $input) {
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
  }
}
`;
export const deletePraxis = `mutation DeletePraxis($input: DeletePraxisInput!) {
  deletePraxis(input: $input) {
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
  }
}
`;
export const createPraxisGeschaeftsfuerung = `mutation CreatePraxisGeschaeftsfuerung(
  $input: CreatePraxisGeschaeftsfuerungInput!
) {
  createPraxisGeschaeftsfuerung(input: $input) {
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
  }
}
`;
export const updatePraxisGeschaeftsfuerung = `mutation UpdatePraxisGeschaeftsfuerung(
  $input: UpdatePraxisGeschaeftsfuerungInput!
) {
  updatePraxisGeschaeftsfuerung(input: $input) {
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
  }
}
`;
export const deletePraxisGeschaeftsfuerung = `mutation DeletePraxisGeschaeftsfuerung(
  $input: DeletePraxisGeschaeftsfuerungInput!
) {
  deletePraxisGeschaeftsfuerung(input: $input) {
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
  }
}
`;
export const createPraxisMitarbeiter = `mutation CreatePraxisMitarbeiter($input: CreatePraxisMitarbeiterInput!) {
  createPraxisMitarbeiter(input: $input) {
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
  }
}
`;
export const updatePraxisMitarbeiter = `mutation UpdatePraxisMitarbeiter($input: UpdatePraxisMitarbeiterInput!) {
  updatePraxisMitarbeiter(input: $input) {
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
  }
}
`;
export const deletePraxisMitarbeiter = `mutation DeletePraxisMitarbeiter($input: DeletePraxisMitarbeiterInput!) {
  deletePraxisMitarbeiter(input: $input) {
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
  }
}
`;
export const createRecords = `mutation CreateRecords($input: CreateRecordsInput!) {
  createRecords(input: $input) {
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

export const createRecords2 = `mutation CreateRecords2($records: [CreateRecordsInput]) {
  createRecords2(records: $records) {
    id
    arzt
    patient
    record
    zahn
    Session
	    SessionTime
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


export const updateRecords = `mutation UpdateRecords($input: UpdateRecordsInput!) {
  updateRecords(input: $input) {
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
export const deleteRecords = `mutation DeleteRecords($input: DeleteRecordsInput!) {
  deleteRecords(input: $input) {
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
export const createTracking = `mutation CreateTracking($input: CreateTrackingInput!) {
  createTracking(input: $input) {
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
  }
}
`;
export const updateTracking = `mutation UpdateTracking($input: UpdateTrackingInput!) {
  updateTracking(input: $input) {
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
  }
}
`;
export const deleteTracking = `mutation DeleteTracking($input: DeleteTrackingInput!) {
  deleteTracking(input: $input) {
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
  }
}
`;
export const createVolgebehandlung = `mutation CreateVolgebehandlung($input: CreateVolgebehandlungInput!) {
  createVolgebehandlung(input: $input) {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
  }
}
`;
export const updateVolgebehandlung = `mutation UpdateVolgebehandlung($input: UpdateVolgebehandlungInput!) {
  updateVolgebehandlung(input: $input) {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
  }
}
`;
export const deleteVolgebehandlung = `mutation DeleteVolgebehandlung($input: DeleteVolgebehandlungInput!) {
  deleteVolgebehandlung(input: $input) {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
  }
}
`;
export const createWegegeldTable = `mutation CreateWegegeldTable($input: CreateWegegeldTableInput!) {
  createWegegeldTable(input: $input) {
    id
    Distanz
    Nummer
  }
}
`;
export const updateWegegeldTable = `mutation UpdateWegegeldTable($input: UpdateWegegeldTableInput!) {
  updateWegegeldTable(input: $input) {
    id
    Distanz
    Nummer
  }
}
`;
export const deleteWegegeldTable = `mutation DeleteWegegeldTable($input: DeleteWegegeldTableInput!) {
  deleteWegegeldTable(input: $input) {
    id
    Distanz
    Nummer
  }
}
`;


export const updateArzt2 = `mutation UpdateArzt($input: UpdateArztInput!) {
  updateArzt2(input: $input) {
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

export const updateBetreuer2 = `mutation UpdateBetreuer($input: UpdateBetreuerInput!) {
  updateBetreuer2(input: $input) {
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

export const updatePatient2 = `mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient2(input: $input) {
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

export const updatePraxisGeschaeftsfuerung2 = `mutation UpdatePraxisGeschaeftsfuerung(
  $input: UpdatePraxisGeschaeftsfuerungInput!
) {
  updatePraxisGeschaeftsfuerung2(input: $input) {
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

export const updatePflegeheimPDL2 = `mutation UpdatePflegeheimPDL($input: UpdatePflegeheimPDLInput!) {
  updatePflegeheimPDL2(input: $input) {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    userId
    username
    Zustand
    Pflegeheim
    Formular
  }
}
`;

export const updatePflegeheimGeschaeftsfuerung2 = `mutation UpdatePflegeheimGeschaeftsfuerung(
  $input: UpdatePflegeheimGeschaeftsfuerungInput!
) {
  updatePflegeheimGeschaeftsfuerung2(input: $input) {
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


export const createPatient2 = `mutation CreatePatient2($input: CreatePatientInput!) {
  createPatient(input: $input) {
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

export const updatePraxisMitarbeiter2 = `mutation UpdatePraxisMitarbeiter(
  $input: UpdatePraxisMitarbeiterInput!) {
  updatePraxisMitarbeiter2(input: $input) {
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
  }
}
`;

