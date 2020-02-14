import gql from "graphql-tag";
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncAbbrechnungs = gql`
query syncAbbrechnungs{
  syncAbbrechnungs {
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
  }
}`;

  export const getAbbrechnung = gql`
  query getAbbrechnung($id: ID!){
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
  }`;

  export const listAbbrechnungs = gql`
  query listAbbrechnungs($nextToken: String){
      listAbbrechnungs(nextToken: $nextToken) {
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
    }
  }`;

export const syncAdministrators = gql`
query syncAdministrators{
  syncAdministrators {
        items {
            id
            Vorname
            username
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
}`;

  export const getAdministrator = gql`
  query getAdministrator($id: ID!){
    getAdministrator(id: $id) {
        id
      Vorname
      username
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
  }`;

  export const listAdministrators = gql`
  query listAdministrators{
      listAdministrators {
          items {
            id
      Vorname
      username
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
  }`;

export const syncArzts = gql`
query syncArzts{
  syncArzts {
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
  }
}`;

  export const getArzt = gql`
  query getArzt($id: ID!){
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
  }`;

  export const listArzts = gql`
  query listArzts{
      listArzts {
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
    }
  }`;
  
  export const syncBehandlungens = gql`
  query syncBehandlungens{
    syncBehandlungens {
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
    }
  }`;
  
    export const getBehandlungen = gql`
    query getBehandlungen($id: ID!){
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
    }`;
  
    export const listBehandlungens = gql`
    query listBehandlungens{
        listBehandlungens {
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
      }
    }`;

export const syncBetreuers = gql`
query syncBetreuers{
  syncBetreuers {
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
  }
}`;

  export const getBetreuer = gql`
  query getBetreuer($id: ID!){
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
  }`;

  export const listBetreuers = gql`
  query listBetreuers{
      listBetreuers {
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
    }
  }`;

export const syncDistanzens = gql`
query syncDistanzens{
  syncDistanzens {
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
  }
}`;

  export const getDistanzen = gql`
  query getDistanzen($id: ID!){
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
  }`;

  export const listDistanzens = gql`
  query listDistanzens{
      listDistanzens {
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
    }
  }`;

export const syncKrankenKassens = gql`
query syncKrankenKassens{
  syncKrankenKassens {
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
  }
}`;

  export const getKrankenKassen = gql`
  query getKrankenKassen($id: ID!){
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
  }`;

  export const listKrankenKassens = gql`
  query listKrankenKassens{
      listKrankenKassens {
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
    }
  }`;

export const syncLeistungsKettes = gql`
query syncLeistungsKettes{
  syncLeistungsKettes {
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
  }
}`;

  export const getLeistungsKette = gql`
  query getLeistungsKette($id: ID!){
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
  }`;

  export const listLeistungsKettes = gql`
  query listLeistungsKettes{
      listLeistungsKettes {
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
    }
  }`;

export const syncOffeneVolgebehandlungs = gql`
query syncOffeneVolgebehandlungs{
  syncOffeneVolgebehandlungs {
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
  }
}`;

  export const getOffeneVolgebehandlung = gql`
  query getOffeneVolgebehandlung($id: ID!){
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
  }`;

  export const listOffeneVolgebehandlungs = gql`
  query listOffeneVolgebehandlungs{
      listOffeneVolgebehandlungs {
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
    }
  }`;

export const syncPatients = gql`
query syncPatients{
  syncPatients {
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
  }
}`;

  export const getPatient = gql`
  query getPatient($id: ID!){
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
  }`;

  export const listPatients = gql`
  query listPatients{
      listPatients {
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
    }
  }`;

export const syncPflegeheims = gql`
query syncPflegeheims{
  syncPflegeheims {
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
  }
}`;

  export const getPflegeheim = gql`
  query getPflegeheim($id: ID!){
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
  }`;

  export const listPflegeheims = gql`
  query listPflegeheims{
      listPflegeheims {
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
    }
  }`;

export const syncPflegeheimGeschaeftsfuerungs = gql`
query syncPflegeheimGeschaeftsfuerungs{
  syncPflegeheimGeschaeftsfuerungs {
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
  }
}`;

  export const getPflegeheimGeschaeftsfuerung = gql`
  query getPflegeheimGeschaeftsfuerung($id: ID!){
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
  }`;

  export const listPflegeheimGeschaeftsfuerungs = gql`
  query listPflegeheimGeschaeftsfuerungs{
      listPflegeheimGeschaeftsfuerungs {
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
    }
  }`;

export const syncPflegeheimMitarbeiters = gql`
query syncPflegeheimMitarbeiters{
  syncPflegeheimMitarbeiters {
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
  }
}`;

  export const getPflegeheimMitarbeiter = gql`
  query getPflegeheimMitarbeiter($id: ID!){
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
  }`;

  export const listPflegeheimMitarbeiters = gql`
  query listPflegeheimMitarbeiters{
      listPflegeheimMitarbeiters {
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
    }
  }`;

export const syncPflegeheimPdls = gql`
query syncPflegeheimPdls{
  syncPflegeheimPdls {
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
  }
}`;

  export const getPflegeheimPdl = gql`
  query getPflegeheimPdl($id: ID!){
    getPflegeheimPdl(id: $id) {
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
  }`;

  export const listPflegeheimPdls = gql`
  query listPflegeheimPdls{
      listPflegeheimPdls {
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
    }
  }`;

export const syncPraxes = gql`
query syncPraxes{
  syncPraxes {
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
  }
}`;

  export const getPraxis = gql`
  query getPraxis($id: ID!){
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
  }`;

  export const listPraxiss = gql`
  query listPraxiss{
      listPraxiss {
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
    }
  }`;

export const syncPraxisGeschaeftsfuerungs = gql`
query syncPraxisGeschaeftsfuerungs{
  syncPraxisGeschaeftsfuerungs {
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
  }
}`;

  export const getPraxisGeschaeftsfuerung = gql`
  query getPraxisGeschaeftsfuerung($id: ID!){
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
  }`;

  export const listPraxisGeschaeftsfuerungs = gql`
  query listPraxisGeschaeftsfuerungs{
      listPraxisGeschaeftsfuerungs {
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
    }
  }`;

export const syncPraxisMitarbeiters = gql`
query syncPraxisMitarbeiters{
  syncPraxisMitarbeiters {
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
  }
}`;

  export const getPraxisMitarbeiter = gql`
  query getPraxisMitarbeiter($id: ID!){
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
  }`;

  export const listPraxisMitarbeiters = gql`
  query listPraxisMitarbeiters{
      listPraxisMitarbeiters {
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
    }
  }`;

export const syncRecords = gql`
query syncRecords{
  syncRecords {
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
  }
}`;

  export const getRecords = gql`
  query getRecords($id: ID!){
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
  }`;

  export const listRecordss = gql`
  query listRecordss{
      listRecordss {
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
    }
  }`;

export const syncBefundes = gql`
query syncBefundes{
  syncBefundes {
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
  }
}`;

  export const getBefunde = gql`
  query getBefunde($id: ID!){
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
  }`;

  export const listBefundes = gql`
  query listBefundes{
      listBefundes {
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
    }
  }`;

export const syncTrackings = gql`
query syncTrackings{
  syncTrackings {
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
  }
}`;

  export const getTracking = gql`
  query getTracking($id: ID!){
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
  }`;

  export const listTrackings = gql`
  query listTrackings{
      listTrackings {
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
    }
  }`;

export const syncVolgebehandlungs = gql`
query syncVolgebehandlungs{
  syncVolgebehandlungs {
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
  }
}`;

  export const getVolgebehandlung = gql`
  query getVolgebehandlung($id: ID!){
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
  }`;

  export const listVolgebehandlungs = gql`
  query listVolgebehandlungs{
      listVolgebehandlungs {
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
    }
  }`;

export const syncWegegeldTables = gql`
query syncWegegeldTables{
  syncWegegeldTables {
        items {
        id
        Distanz
        Nummer
        status
        _version
        _deleted
        _lastChangedAt
        }
  }
}`;

  export const getWegegeldTable = gql`
  query getWegegeldTable($id: ID!){
    getWegegeldTable(id: $id) {
        id
        Distanz
        Nummer
        status
        _version
        _deleted
        _lastChangedAt
    }
  }`;

  export const listWegegeldTables = gql`
  query listWegegeldTables{
      listWegegeldTables {
          items {
        id
        Distanz
        Nummer
        status
        _version
        _deleted
        _lastChangedAt
            }
    }
  }`;

export const syncScheines = gql`
query syncScheines{
  syncScheines {
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
  }
}`;

  export const getScheine = gql`
  query getScheine($id: ID!){
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
  }`;

  export const listScheines = gql`
  query listScheines{
      listScheines {
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
    }
  }`;

export const syncZahns = gql`
query syncZahns{
  syncZahns {
        items {
      id
      Distanz
      status
      _version
      _deleted
      _lastChangedAt
        }
  }
}`;

  export const getZahn = gql`
  query getZahn($id: ID!){
    getZahn(id: $id) {
      id
      Distanz
      status
      _version
      _deleted
      _lastChangedAt
    }
  }`;

  export const listZahns = gql`
  query listZahns{
      listZahns {
          items {
      id
      Distanz
      status
      _version
      _deleted
      _lastChangedAt
            }
    }
  }`;
  