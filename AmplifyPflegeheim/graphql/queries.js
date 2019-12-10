/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAbbrechnung = `query GetAbbrechnung($id: ID!) {
  getAbbrechnung(id: $id) {
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
export const listAbbrechnungs = `query ListAbbrechnungs(
  $filter: ModelAbbrechnungFilterInput
  $limit: Int
  $nextToken: String
) {
  listAbbrechnungs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getAdministrator = `query GetAdministrator($id: ID!) {
  getAdministrator(id: $id) {
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
export const listAdministrators = `query ListAdministrators(
  $filter: ModelAdministratorFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdministrators(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Vorname
      Nachname
      Email
      userId
      Group
      Formular
    }
    nextToken
  }
}
`;
export const getArzt = `query GetArzt($id: ID!) {
  getArzt(id: $id) {
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
export const listArzts = `query ListArzts(
  $filter: ModelArztFilterInput
  $limit: Int
  $nextToken: String
) {
  listArzts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getBehandlungen = `query GetBehandlungen($id: ID!) {
  getBehandlungen(id: $id) {
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
export const listBehandlungens = `query ListBehandlungens(
  $filter: ModelBehandlungenFilterInput
  $limit: Int
  $nextToken: String
) {
  listBehandlungens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getBetreuer = `query GetBetreuer($id: ID!) {
  getBetreuer(id: $id) {
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
export const listBetreuers = `query ListBetreuers(
  $filter: ModelBetreuerFilterInput
  $limit: Int
  $nextToken: String
) {
  listBetreuers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getDistanzen = `query GetDistanzen($id: ID!) {
  getDistanzen(id: $id) {
    id
    Start
    Ende
    Distanz
  }
}
`;
export const listDistanzens = `query ListDistanzens(
  $filter: ModelDistanzenFilterInput
  $limit: Int
  $nextToken: String
) {
  listDistanzens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Start
      Ende
      Distanz
    }
    nextToken
  }
}
`;
export const getKrankenKassen = `query GetKrankenKassen($id: ID!) {
  getKrankenKassen(id: $id) {
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
export const listKrankenKassens = `query ListKrankenKassens(
  $filter: ModelKrankenKassenFilterInput
  $limit: Int
  $nextToken: String
) {
  listKrankenKassens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getLeistungsKette = `query GetLeistungsKette($id: ID!) {
  getLeistungsKette(id: $id) {
    id
    Name
    Typ
    Praxis
  }
}
`;
export const listLeistungsKettes = `query ListLeistungsKettes(
  $filter: ModelLeistungsKetteFilterInput
  $limit: Int
  $nextToken: String
) {
  listLeistungsKettes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Name
      Typ
      Praxis
    }
    nextToken
  }
}
`;
export const getOffeneVolgebehandlung = `query GetOffeneVolgebehandlung($id: ID!) {
  getOffeneVolgebehandlung(id: $id) {
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
export const listOffeneVolgebehandlungs = `query ListOffeneVolgebehandlungs(
  $filter: ModelOffeneVolgebehandlungFilterInput
  $limit: Int
  $nextToken: String
) {
  listOffeneVolgebehandlungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const getPatient = `query GetPatient($id: ID!) {
  getPatient(id: $id) {
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
export const listPatients = `query ListPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPflegeheim = `query GetPflegeheim($id: ID!) {
  getPflegeheim(id: $id) {
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
export const listPflegeheims = `query ListPflegeheims(
  $filter: ModelPflegeheimFilterInput
  $limit: Int
  $nextToken: String
) {
  listPflegeheims(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPflegeheimGeschaeftsfuerung = `query GetPflegeheimGeschaeftsfuerung($id: ID!) {
  getPflegeheimGeschaeftsfuerung(id: $id) {
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
export const listPflegeheimGeschaeftsfuerungs = `query ListPflegeheimGeschaeftsfuerungs(
  $filter: ModelPflegeheimGeschaeftsfuerungFilterInput
  $limit: Int
  $nextToken: String
) {
  listPflegeheimGeschaeftsfuerungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const getPflegeheimMitarbeiter = `query GetPflegeheimMitarbeiter($id: ID!) {
  getPflegeheimMitarbeiter(id: $id) {
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
export const listPflegeheimMitarbeiters = `query ListPflegeheimMitarbeiters(
  $filter: ModelPflegeheimMitarbeiterFilterInput
  $limit: Int
  $nextToken: String
) {
  listPflegeheimMitarbeiters(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const getPflegeheimPDL = `query GetPflegeheimPDL($id: ID!) {
  getPflegeheimPDL(id: $id) {
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
export const listPflegeheimPDLs = `query ListPflegeheimPDLs(
  $filter: ModelPflegeheimPDLFilterInput
  $limit: Int
  $nextToken: String
) {
  listPflegeheimPDLs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPraxis = `query GetPraxis($id: ID!) {
  getPraxis(id: $id) {
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
export const listPraxiss = `query ListPraxiss(
  $filter: ModelPraxisFilterInput
  $limit: Int
  $nextToken: String
) {
  listPraxiss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPraxisGeschaeftsfuerung = `query GetPraxisGeschaeftsfuerung($id: ID!) {
  getPraxisGeschaeftsfuerung(id: $id) {
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
export const listPraxisGeschaeftsfuerungs = `query ListPraxisGeschaeftsfuerungs(
  $filter: ModelPraxisGeschaeftsfuerungFilterInput
  $limit: Int
  $nextToken: String
) {
  listPraxisGeschaeftsfuerungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const getPraxisMitarbeiter = `query GetPraxisMitarbeiter($id: ID!) {
  getPraxisMitarbeiter(id: $id) {
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
export const listPraxisMitarbeiters = `query ListPraxisMitarbeiters(
  $filter: ModelPraxisMitarbeiterFilterInput
  $limit: Int
  $nextToken: String
) {
  listPraxisMitarbeiters(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const getRecords = `query GetRecords($id: ID!) {
  getRecords(id: $id) {
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
export const listRecordss = `query ListRecordss(
  $filter: ModelRecordsFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecordss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getTracking = `query GetTracking($id: ID!) {
  getTracking(id: $id) {
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
export const listTrackings = `query ListTrackings(
  $filter: ModelTrackingFilterInput
  $limit: Int
  $nextToken: String
) {
  listTrackings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getVolgebehandlung = `query GetVolgebehandlung($id: ID!) {
  getVolgebehandlung(id: $id) {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
  }
}
`;
export const listVolgebehandlungs = `query ListVolgebehandlungs(
  $filter: ModelVolgebehandlungFilterInput
  $limit: Int
  $nextToken: String
) {
  listVolgebehandlungs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Leistungsname
      Name
      Leistungskette
      abrechnungsnummerprivat
      abrechnungsnummergesaetzlich
    }
    nextToken
  }
}
`;
export const getWegegeldTable = `query GetWegegeldTable($id: ID!) {
  getWegegeldTable(id: $id) {
    id
    Distanz
    Nummer
  }
}
`;
export const listWegegeldTables = `query ListWegegeldTables(
  $filter: ModelWegegeldTableFilterInput
  $limit: Int
  $nextToken: String
) {
  listWegegeldTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Distanz
      Nummer
    }
    nextToken
  }
}
`;

export const listArzts2 = `query ListArzts(
  $filter: ModelArztFilterInput
  $limit: Int
  $nextToken: String
) {
  listArzts2(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const listBetreuers2 = `query ListBetreuers(
  $filter: ModelBetreuerFilterInput
  $limit: Int
  $nextToken: String
) {
  listBetreuers2(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const listPatients2 = `query ListPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatients2(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      kzv
      Vorname
      Nachname
      Strasse
      VersichertenNr
      Kostentraegerkennung
      Krankenkasse
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
    nextToken
  }
}
`;

export const listPraxisMitarbeiters2 = `query ListPraxisMitarbeiters(
  $filter: ModelPraxisMitarbeiterFilterInput
  $limit: Int
  $nextToken: String
) {
  listPraxisMitarbeiters2(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const listPraxisGeschaeftsfuerungs2 = `query ListPraxisGeschaeftsfuerungs(
  $filter: ModelPraxisGeschaeftsfuerungFilterInput
  $limit: Int
  $nextToken: String
) {
  listPraxisGeschaeftsfuerungs2(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
export const listPflegeheimPDLs2 = `query ListPflegeheimPDLs(
  $filter: ModelPflegeheimPDLFilterInput
  $limit: Int
  $nextToken: String
) {
  listPflegeheimPDLs2(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const listPflegeheimGeschaeftsfuerungs2 = `query ListPflegeheimGeschaeftsfuerungs(
  $filter: ModelPflegeheimGeschaeftsfuerungFilterInput
  $limit: Int
  $nextToken: String
) {
  listPflegeheimGeschaeftsfuerungs2(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;

