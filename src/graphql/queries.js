/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncAbbrechnungs = `query SyncAbbrechnungs(
  $filter: ModelAbbrechnungFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAbbrechnungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncAdministrators = `query SyncAdministrators(
  $filter: ModelAdministratorFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAdministrators(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncArzts = `query SyncArzts(
  $filter: ModelArztFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncArzts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncBehandlungens = `query SyncBehandlungens(
  $filter: ModelBehandlungenFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBehandlungens(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncBetreuers = `query SyncBetreuers(
  $filter: ModelBetreuerFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBetreuers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncDistanzens = `query SyncDistanzens(
  $filter: ModelDistanzenFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncDistanzens(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Start
      Ende
      Distanz
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const getDistanzen = `query GetDistanzen($id: ID!) {
  getDistanzen(id: $id) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncKrankenKassens = `query SyncKrankenKassens(
  $filter: ModelKrankenKassenFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncKrankenKassens(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncLeistungsKettes = `query SyncLeistungsKettes(
  $filter: ModelLeistungsKetteFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncLeistungsKettes(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Name
      Typ
      Praxis
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const getLeistungsKette = `query GetLeistungsKette($id: ID!) {
  getLeistungsKette(id: $id) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncOffeneVolgebehandlungs = `query SyncOffeneVolgebehandlungs(
  $filter: ModelOffeneVolgebehandlungFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncOffeneVolgebehandlungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPatients = `query SyncPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPatients(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPflegeheims = `query SyncPflegeheims(
  $filter: ModelPflegeheimFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPflegeheims(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPflegeheimGeschaeftsfuerungs = `query SyncPflegeheimGeschaeftsfuerungs(
  $filter: ModelPflegeheimGeschaeftsfuerungFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPflegeheimGeschaeftsfuerungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPflegeheimMitarbeiters = `query SyncPflegeheimMitarbeiters(
  $filter: ModelPflegeheimMitarbeiterFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPflegeheimMitarbeiters(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPflegeheimPdls = `query SyncPflegeheimPdls(
  $filter: ModelPflegeheimPDLFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPflegeheimPDLS(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const getPflegeheimPdl = `query GetPflegeheimPdl($id: ID!) {
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
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const listPflegeheimPdLs = `query ListPflegeheimPdLs(
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPraxes = `query SyncPraxes(
  $filter: ModelPraxisFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPraxes(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPraxisGeschaeftsfuerungs = `query SyncPraxisGeschaeftsfuerungs(
  $filter: ModelPraxisGeschaeftsfuerungFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPraxisGeschaeftsfuerungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncPraxisMitarbeiters = `query SyncPraxisMitarbeiters(
  $filter: ModelPraxisMitarbeiterFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPraxisMitarbeiters(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncRecords = `query SyncRecords(
  $filter: ModelRecordsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRecords(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncBefundes = `query SyncBefundes(
  $filter: ModelBefundeFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBefundes(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
  }
}
`;
export const getBefunde = `query GetBefunde($id: ID!) {
  getBefunde(id: $id) {
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
export const listBefundes = `query ListBefundes(
  $filter: ModelBefundeFilterInput
  $limit: Int
  $nextToken: String
) {
  listBefundes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
  }
}
`;
export const syncTrackings = `query SyncTrackings(
  $filter: ModelTrackingFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTrackings(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncVolgebehandlungs = `query SyncVolgebehandlungs(
  $filter: ModelVolgebehandlungFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncVolgebehandlungs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
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
    status
    _version
    _deleted
    _lastChangedAt
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncWegegeldTables = `query SyncWegegeldTables(
  $filter: ModelWegegeldTableFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncWegegeldTables(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Distanz
      Nummer
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const getWegegeldTable = `query GetWegegeldTable($id: ID!) {
  getWegegeldTable(id: $id) {
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
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const syncScheines = `query SyncScheines(
  $filter: ModelScheineFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncScheines(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
  }
}
`;
export const getScheine = `query GetScheine($id: ID!) {
  getScheine(id: $id) {
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
export const listScheines = `query ListScheines(
  $filter: ModelScheineFilterInput
  $limit: Int
  $nextToken: String
) {
  listScheines(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
  }
}
`;
export const syncZahns = `query SyncZahns(
  $filter: ModelZahnFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncZahns(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      Distanz
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
export const getZahn = `query GetZahn($id: ID!) {
  getZahn(id: $id) {
    id
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}
`;
export const listZahns = `query ListZahns(
  $filter: ModelZahnFilterInput
  $limit: Int
  $nextToken: String
) {
  listZahns(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Distanz
      status
      _version
      _deleted
      _lastChangedAt
    }
    nextToken
    startedAt
  }
}
`;
