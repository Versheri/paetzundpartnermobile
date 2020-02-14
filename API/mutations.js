import gql from "graphql-tag";

export const createAbbrechnung = `mutation CreateAbbrechnung(
    $input: CreateAbbrechnungInput!
    $condition: ModelAbbrechnungConditionInput
  ) {
    createAbbrechnung(input: $input, condition: $condition) {
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

  export const updateAbbrechnung = gql`
  mutation UpdateAbbrechnung($input: UpdateAbbrechnungInput!
    $condition: ModelAbbrechnungConditionInput){
      updateAbbrechnung(input:$input
      , condition: $condition){
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
 
 export const deleteAbbrechnung = gql`
  mutation DeleteAbbrechnung($input: DeleteAbbrechnungInput!
    $condition: ModelAbbrechnungConditionInput){
    deleteAbbrechnung(input:$input
      , condition: $condition){
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

export const createAdministrator = `mutation CreateAdministrator(
  $input: CreateAdministratorInput!
  $condition: ModelAdministratorConditionInput
) {
  createAdministrator(input: $input, condition: $condition) {
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
  }
}
`;

export const updateAdministrator = gql`
mutation UpdateAdministrator($input: UpdateAdministratorInput!
  $condition: ModelAdministratorConditionInput){
    updateAdministrator(input:$input
    , condition: $condition){
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

export const deleteAdministrator = gql`
mutation DeleteAdministrator($input: DeleteAdministratorInput!
  $condition: ModelAdministratorConditionInput){
  deleteAdministrator(input:$input
    , condition: $condition){
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

export const createArzt = `mutation CreateArzt(
  $input: CreateArztInput!
  $condition: ModelArztConditionInput
) {
  createArzt(input: $input, condition: $condition) {
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
  }
}
`;

export const updateArzt = gql`
mutation UpdateArzt($input: UpdateArztInput!
  $condition: ModelArztConditionInput){
    updateArzt(input:$input
    , condition: $condition){
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

export const deleteArzt = gql`
mutation DeleteArzt($input: DeleteArztInput!
  $condition: ModelArztConditionInput){
  deleteArzt(input:$input
    , condition: $condition){
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

export const createBehandlungen = `mutation CreateBehandlungen(
  $input: CreateBehandlungenInput!
  $condition: ModelBehandlungenConditionInput
) {
  createBehandlungen(input: $input, condition: $condition) {
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
  }
}
`;

export const updateBehandlungen = gql`
mutation UpdateBehandlungen($input: UpdateBehandlungenInput!
  $condition: ModelBehandlungenConditionInput){
    updateBehandlungen(input:$input
    , condition: $condition){
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

export const deleteBehandlungen = gql`
mutation DeleteBehandlungen($input: DeleteBehandlungenInput!
  $condition: ModelBehandlungenConditionInput){
  deleteBehandlungen(input:$input
    , condition: $condition){
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

export const createBetreuer = `mutation CreateBetreuer(
  $input: CreateBetreuerInput!
  $condition: ModelBetreuerConditionInput
) {
  createBetreuer(input: $input, condition: $condition) {
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
  }
}
`;

export const updateBetreuer = gql`
mutation UpdateBetreuer($input: UpdateBetreuerInput!
  $condition: ModelBetreuerConditionInput){
    updateBetreuer(input:$input
    , condition: $condition){
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

export const deleteBetreuer = gql`
mutation DeleteBetreuer($input: DeleteBetreuerInput!
  $condition: ModelBetreuerConditionInput){
  deleteBetreuer(input:$input
    , condition: $condition){
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

export const createDistanzen = `mutation CreateDistanzen(
  $input: CreateDistanzenInput!
  $condition: ModelDistanzenConditionInput
) {
  createDistanzen(input: $input, condition: $condition) {
    id
    Start
    Ende
    Distanz
    status
    _version
  }
}
`;

export const updateDistanzen = gql`
mutation UpdateDistanzen($input: UpdateDistanzenInput!
  $condition: ModelDistanzenConditionInput){
    updateDistanzen(input:$input
    , condition: $condition){
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

export const deleteDistanzen = gql`
mutation DeleteDistanzen($input: DeleteDistanzenInput!
  $condition: ModelDistanzenConditionInput){
  deleteDistanzen(input:$input
    , condition: $condition){
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

export const createKrankenKassen = `mutation CreateKrankenKassen(
  $input: CreateKrankenKassenInput!
  $condition: ModelKrankenKassenConditionInput
) {
  createKrankenKassen(input: $input, condition: $condition) {
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
  }
}
`;

export const updateKrankenKassen = gql`
mutation UpdateKrankenKassen($input: UpdateKrankenKassenInput!
  $condition: ModelKrankenKassenConditionInput){
    updateKrankenKassen(input:$input
    , condition: $condition){
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

export const deleteKrankenKassen = gql`
mutation DeleteKrankenKassen($input: DeleteKrankenKassenInput!
  $condition: ModelKrankenKassenConditionInput){
  deleteKrankenKassen(input:$input
    , condition: $condition){
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

export const createLeistungsKette = `mutation CreateLeistungsKette(
  $input: CreateLeistungsKetteInput!
  $condition: ModelLeistungsKetteConditionInput
) {
  createLeistungsKette(input: $input, condition: $condition) {
    id
    Name
    Typ
    Praxis
    status
    _version
  }
}
`;

export const updateLeistungsKette = gql`
mutation UpdateLeistungsKette($input: UpdateLeistungsKetteInput!
  $condition: ModelLeistungsKetteConditionInput){
    updateLeistungsKette(input:$input
    , condition: $condition){
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

export const deleteLeistungsKette = gql`
mutation DeleteLeistungsKette($input: DeleteLeistungsKetteInput!
  $condition: ModelLeistungsKetteConditionInput){
  deleteLeistungsKette(input:$input
    , condition: $condition){
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

export const createOffeneVolgebehandlung = `mutation CreateOffeneVolgebehandlung(
  $input: CreateOffeneVolgebehandlungInput!
  $condition: ModelOffeneVolgebehandlungConditionInput
) {
  createOffeneVolgebehandlung(input: $input, condition: $condition) {
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
  }
}
`;

export const updateOffeneVolgebehandlung = gql`
mutation UpdateOffeneVolgebehandlung($input: UpdateOffeneVolgebehandlungInput!
  $condition: ModelOffeneVolgebehandlungConditionInput){
    updateOffeneVolgebehandlung(input:$input
    , condition: $condition){
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

export const deleteOffeneVolgebehandlung = gql`
mutation DeleteOffeneVolgebehandlung($input: DeleteOffeneVolgebehandlungInput!
  $condition: ModelOffeneVolgebehandlungConditionInput){
  deleteOffeneVolgebehandlung(input:$input
    , condition: $condition){
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

export const createPatient = `mutation CreatePatient(
  $input: CreatePatientInput!
  $condition: ModelPatientConditionInput
) {
  createPatient(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePatient = gql`
mutation UpdatePatient($input: UpdatePatientInput!
  $condition: ModelPatientConditionInput){
    updatePatient(input:$input
    , condition: $condition){
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

export const deletePatient = gql`
mutation DeletePatient($input: DeletePatientInput!
  $condition: ModelPatientConditionInput){
  deletePatient(input:$input
    , condition: $condition){
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

export const createPflegeheim = `mutation CreatePflegeheim(
  $input: CreatePflegeheimInput!
  $condition: ModelPflegeheimConditionInput
) {
  createPflegeheim(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePflegeheim = gql`
mutation UpdatePflegeheim($input: UpdatePflegeheimInput!
  $condition: ModelPflegeheimConditionInput){
    updatePflegeheim(input:$input
    , condition: $condition){
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

export const deletePflegeheim = gql`
mutation DeletePflegeheim($input: DeletePflegeheimInput!
  $condition: ModelPflegeheimConditionInput){
  deletePflegeheim(input:$input
    , condition: $condition){
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

export const createPflegeheimGeschaeftsfuerung = `mutation CreatePflegeheimGeschaeftsfuerung(
  $input: CreatePflegeheimGeschaeftsfuerungInput!
  $condition: ModelPflegeheimGeschaeftsfuerungConditionInput
) {
  createPflegeheimGeschaeftsfuerung(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePflegeheimGeschaeftsfuerung = gql`
mutation UpdatePflegeheimGeschaeftsfuerung($input: UpdatePflegeheimGeschaeftsfuerungInput!
  $condition: ModelPflegeheimGeschaeftsfuerungConditionInput){
    updatePflegeheimGeschaeftsfuerung(input:$input
    , condition: $condition){
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

export const deletePflegeheimGeschaeftsfuerung = gql`
mutation DeletePflegeheimGeschaeftsfuerung($input: DeletePflegeheimGeschaeftsfuerungInput!
  $condition: ModelPflegeheimGeschaeftsfuerungConditionInput){
  deletePflegeheimGeschaeftsfuerung(input:$input
    , condition: $condition){
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

export const createPflegeheimMitarbeiter = `mutation CreatePflegeheimMitarbeiter(
  $input: CreatePflegeheimMitarbeiterInput!
  $condition: ModelPflegeheimMitarbeiterConditionInput
) {
  createPflegeheimMitarbeiter(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePflegeheimMitarbeiter = gql`
mutation UpdatePflegeheimMitarbeiter($input: UpdatePflegeheimMitarbeiterInput!
  $condition: ModelPflegeheimMitarbeiterConditionInput){
    updatePflegeheimMitarbeiter(input:$input
    , condition: $condition){
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

export const deletePflegeheimMitarbeiter = gql`
mutation DeletePflegeheimMitarbeiter($input: DeletePflegeheimMitarbeiterInput!
  $condition: ModelPflegeheimMitarbeiterConditionInput){
  deletePflegeheimMitarbeiter(input:$input
    , condition: $condition){
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

export const createPflegeheimPdl = `mutation CreatePflegeheimPdl(
  $input: CreatePflegeheimPdlInput!
  $condition: ModelPflegeheimPdlConditionInput
) {
  createPflegeheimPdl(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePflegeheimPdl = gql`
mutation UpdatePflegeheimPdl($input: UpdatePflegeheimPdlInput!
  $condition: ModelPflegeheimPdlConditionInput){
    updatePflegeheimPdl(input:$input
    , condition: $condition){
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

export const deletePflegeheimPdl = gql`
mutation DeletePflegeheimPdl($input: DeletePflegeheimPdlInput!
  $condition: ModelPflegeheimPdlConditionInput){
  deletePflegeheimPdl(input:$input
    , condition: $condition){
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

export const createPraxis = `mutation CreatePraxis(
  $input: CreatePraxisInput!
  $condition: ModelPraxisConditionInput
) {
  createPraxis(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePraxis = gql`
mutation UpdatePraxis($input: UpdatePraxisInput!
  $condition: ModelPraxisConditionInput){
    updatePraxis(input:$input
    , condition: $condition){
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

export const deletePraxis = gql`
mutation DeletePraxis($input: DeletePraxisInput!
  $condition: ModelPraxisConditionInput){
  deletePraxis(input:$input
    , condition: $condition){
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

export const createPraxisGeschaeftsfuerung = `mutation CreatePraxisGeschaeftsfuerung(
  $input: CreatePraxisGeschaeftsfuerungInput!
  $condition: ModelPraxisGeschaeftsfuerungConditionInput
) {
  createPraxisGeschaeftsfuerung(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePraxisGeschaeftsfuerung = gql`
mutation UpdatePraxisGeschaeftsfuerung($input: UpdatePraxisGeschaeftsfuerungInput!
  $condition: ModelPraxisGeschaeftsfuerungConditionInput){
    updatePraxisGeschaeftsfuerung(input:$input
    , condition: $condition){
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

export const deletePraxisGeschaeftsfuerung = gql`
mutation DeletePraxisGeschaeftsfuerung($input: DeletePraxisGeschaeftsfuerungInput!
  $condition: ModelPraxisGeschaeftsfuerungConditionInput){
  deletePraxisGeschaeftsfuerung(input:$input
    , condition: $condition){
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

export const createPraxisMitarbeiter = `mutation CreatePraxisMitarbeiter(
  $input: CreatePraxisMitarbeiterInput!
  $condition: ModelPraxisMitarbeiterConditionInput
) {
  createPraxisMitarbeiter(input: $input, condition: $condition) {
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
  }
}
`;

export const updatePraxisMitarbeiter = gql`
mutation UpdatePraxisMitarbeiter($input: UpdatePraxisMitarbeiterInput!
  $condition: ModelPraxisMitarbeiterConditionInput){
    updatePraxisMitarbeiter(input:$input
    , condition: $condition){
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

export const deletePraxisMitarbeiter = gql`
mutation DeletePraxisMitarbeiter($input: DeletePraxisMitarbeiterInput!
  $condition: ModelPraxisMitarbeiterConditionInput){
  deletePraxisMitarbeiter(input:$input
    , condition: $condition){
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

export const createRecords = `mutation CreateRecords(
  $input: CreateRecordsInput!
  $condition: ModelRecordsConditionInput
) {
  createRecords(input: $input, condition: $condition) {
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
  }
}
`;

export const updateRecords = gql`
mutation UpdateRecords($input: UpdateRecordsInput!
  $condition: ModelRecordsConditionInput){
    updateRecords(input:$input
    , condition: $condition){
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

export const deleteRecords = gql`
mutation DeleteRecords($input: DeleteRecordsInput!
  $condition: ModelRecordsConditionInput){
  deleteRecords(input:$input
    , condition: $condition){
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

export const createBefunde = `mutation CreateBefunde(
  $input: CreateBefundeInput!
  $condition: ModelBefundeConditionInput
) {
  createBefunde(input: $input, condition: $condition) {
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
  }
}
`;

export const updateBefunde = gql`
mutation UpdateBefunde($input: UpdateBefundeInput!
  $condition: ModelBefundeConditionInput){
    updateBefunde(input:$input
    , condition: $condition){
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

export const deleteBefunde = gql`
mutation DeleteBefunde($input: DeleteBefundeInput!
  $condition: ModelBefundeConditionInput){
  deleteBefunde(input:$input
    , condition: $condition){
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

export const createTracking = `mutation CreateTracking(
  $input: CreateTrackingInput!
  $condition: ModelTrackingConditionInput
) {
  createTracking(input: $input, condition: $condition) {
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
  }
}
`;

export const updateTracking = gql`
mutation UpdateTracking($input: UpdateTrackingInput!
  $condition: ModelTrackingConditionInput){
    updateTracking(input:$input
    , condition: $condition){
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

export const deleteTracking = gql`
mutation DeleteTracking($input: DeleteTrackingInput!
  $condition: ModelTrackingConditionInput){
  deleteTracking(input:$input
    , condition: $condition){
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

export const createVolgebehandlung = `mutation CreateVolgebehandlung(
  $input: CreateVolgebehandlungInput!
  $condition: ModelVolgebehandlungConditionInput
) {
  createVolgebehandlung(input: $input, condition: $condition) {
    id
    Leistungsname
    Name
    Leistungskette
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    status
    _version
  }
}
`;

export const updateVolgebehandlung = gql`
mutation UpdateVolgebehandlung($input: UpdateVolgebehandlungInput!
  $condition: ModelVolgebehandlungConditionInput){
    updateVolgebehandlung(input:$input
    , condition: $condition){
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

export const deleteVolgebehandlung = gql`
mutation DeleteVolgebehandlung($input: DeleteVolgebehandlungInput!
  $condition: ModelVolgebehandlungConditionInput){
  deleteVolgebehandlung(input:$input
    , condition: $condition){
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

export const createWegegeldTable = `mutation CreateWegegeldTable(
  $input: CreateWegegeldTableInput!
  $condition: ModelWegegeldTableConditionInput
) {
  createWegegeldTable(input: $input, condition: $condition) {
    id
    Distanz
    Nummer
    status
    _version
  }
}
`;

export const updateWegegeldTable = gql`
mutation UpdateWegegeldTable($input: UpdateWegegeldTableInput!
  $condition: ModelWegegeldTableConditionInput){
    updateWegegeldTable(input:$input
    , condition: $condition){
    id
    Distanz
    Nummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}`;

export const deleteWegegeldTable = gql`
mutation DeleteWegegeldTable($input: DeleteWegegeldTableInput!
  $condition: ModelWegegeldTableConditionInput){
  deleteWegegeldTable(input:$input
    , condition: $condition){
    id
    Distanz
    Nummer
    status
    _version
    _deleted
    _lastChangedAt
  }
}`;

export const createScheine = `mutation CreateScheine(
  $input: CreateScheineInput!
  $condition: ModelScheineConditionInput
) {
  createScheine(input: $input, condition: $condition) {
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
  }
}
`;

export const updateScheine = gql`
mutation UpdateScheine($input: UpdateScheineInput!
  $condition: ModelScheineConditionInput){
    updateScheine(input:$input
    , condition: $condition){
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

export const deleteScheine = gql`
mutation DeleteScheine($input: DeleteScheineInput!
  $condition: ModelScheineConditionInput){
  deleteScheine(input:$input
    , condition: $condition){
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

export const createZahn = `mutation CreateZahn(
  $input: CreateZahnInput!
  $condition: ModelZahnConditionInput
) {
  createZahn(input: $input, condition: $condition) {
    id
    Distanz
    status
    _version
  }
}
`;

export const updateZahn = gql`
mutation UpdateZahn($input: UpdateZahnInput!
  $condition: ModelZahnConditionInput){
    updateZahn(input:$input
    , condition: $condition){
    id
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}`;

export const deleteZahn = gql`
mutation DeleteZahn($input: DeleteZahnInput!
  $condition: ModelZahnConditionInput){
  deleteZahn(input:$input
    , condition: $condition){
    id
    Distanz
    status
    _version
    _deleted
    _lastChangedAt
  }
}`;



export const CreateAbbrechnungInput = `input CreateAbbrechnungInput {
  id: ID
  Typ: String
  Eintrag: String
  Kette: String
  patient: String
  arzt: String
  createdAt: String
  filetype: String
  Ketteninhalt: [String]
  bild: S3ObjectInput
  audio: S3ObjectInput
  status: PostStatus!
  _version: Int
}`;

export const CreateAdministratorInput = `input CreateAdministratorInput {
id: ID
Vorname: String!
Nachname: String
Email: String
userId: String
Group: [String]
Formular: String
status: PostStatus!
_version: Int
}`;

export const CreateArztInput = `input CreateArztInput {
id: ID
Vorname: String!
Arztnr: String
BetriebsstaettenNr: String
Nachname: String
Telefonnummer: String
Email: String
Zustand: String
Strasse: String
Hausnr: String
Ort: String
Postleitzahl: String
Praxis: String
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreateBefundeInput = `input CreateBefundeInput {
id: ID
PatientId: String
zahn: S3ObjectInput
color: S3ObjectInput
Date: String
Time: String
ArztId: String
ids: [String]
Number: String
index: String
createdAt: String
status: PostStatus!
_version: Int
}`;

export const CreateBehandlungenInput = `input CreateBehandlungenInput {
id: ID
name: String
Kuerzel: String
Arzt: String
ArztName: String
Patient: String
PatientName: String
abrechnungsnummerprivat: String
abrechnungsnummergesaetzlich: String
Volgebehandlung: String
createdAt: String
Kette: [String]
status: PostStatus!
_version: Int
}`;

export const CreateBetreuerInput = `input CreateBetreuerInput {
id: ID
Vorname: String!
Nachname: String
Strasse: String
Hausnr: String
Ort: String
Postleitzahl: String
Telefonnummer: String
Email: String
Zustand: String
Pflegeheim: [String]
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreateDistanzenInput = `input CreateDistanzenInput {
id: ID
Start: String
Ende: String
Distanz: String
status: PostStatus!
_version: Int
}`;

export const CreateKrankenKassenInput = `input CreateKrankenKassenInput {
id: ID
kgruppe: String
kzv: String
knummer: String
abrstelle: String
kart: String
kblock: String
abrflags: String
kname: String
kplz: String
kort: String
kstrasse: String
ktelefon: String
ktelefax: String
ksuchname: String
status: PostStatus!
_version: Int
}`;

export const CreateLeistungsKetteInput = `input CreateLeistungsKetteInput {
id: ID
Name: String!
Typ: String
Praxis: String
status: PostStatus!
_version: Int
}`;

export const CreateOffeneVolgebehandlungInput = `input CreateOffeneVolgebehandlungInput {
id: ID
Leistungsname: String
Name: String
abrechnungsnummerprivat: String
abrechnungsnummergesaetzlich: String
Leistungskette: String
Status: String
Session: String
SessionTime: String
patientId: String
arztId: String
datum: String
userId: String
status: PostStatus!
_version: Int
}`;

export const CreatePatientInput = `input CreatePatientInput {
id: ID
Vorname: String!
Nachname: String
Krankenkasse: String
createdAt: String
kzv: String
VersichertenNr: String
Kostentraegerkennung: String
sex: String
DateofBirth: String
Strasse: String
Hausnr: String
Ort: String
Postleitzahl: String
Pflegestufe: String
Pflegeheim: String
Zimmernummr: String
Etage: String
Zustand: String
Telefonnummer: String
Email: String
Betreuer: String
Arzt: String
Praxis: String
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreatePflegeheimGeschaeftsfuerungInput = `input CreatePflegeheimGeschaeftsfuerungInput {
id: ID
Vorname: String!
Nachname: String
Telefonnummer: String
Email: String
Zustand: String
Pflegeheim: String
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreatePflegeheimInput = `input CreatePflegeheimInput {
id: ID
Strasse: String!
Name: String
Pflegeheimid: String
HausNr: String
Postleitzahl: String
Ort: String
Telefonnummer: String
Email: String
HausAufteilung: String
Etagen: String
Zimmernummer: String
Formular: String
status: PostStatus!
_version: Int
}`;

export const CreatePflegeheimMitarbeiterInput = `input CreatePflegeheimMitarbeiterInput {
id: ID
Vorname: String!
Nachname: String
Telefonnummer: String
Email: String
Zustand: String
Pflegeheim: String
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreatePflegeheimPDLInput = `input CreatePflegeheimPDLInput {
id: ID
Vorname: String!
Nachname: String
Telefonnummer: String
Email: String
username: String
userId: String
Zustand: String
Pflegeheim: String
Formular: String
status: PostStatus!
_version: Int
}`;

export const CreatePraxisGeschaeftsfuerungInput = `input CreatePraxisGeschaeftsfuerungInput {
id: ID
Vorname: String!
Nachname: String
BetriebsstaettenNr: String
Telefonnummer: String
Email: String
Zustand: String
Praxis: String
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreatePraxisInput = `input CreatePraxisInput {
id: ID
Strasse: String!
Praxisid: String
BetriebsstaettenNr: String
Name: String
HausNr: String
Postleitzahl: String
Ort: String
Telefonnummer: String
Email: String
HausAufteilung: String
Etagen: String
Zimmernummer: String
status: PostStatus!
_version: Int
}`;

export const CreatePraxisMitarbeiterInput = `input CreatePraxisMitarbeiterInput {
id: ID
Vorname: String!
Nachname: String
BetriebsstaettenNr: String
Telefonnummer: String
Email: String
Zustand: String
Praxis: String
Formular: String
userId: String
username: String
Group: [String]
status: PostStatus!
_version: Int
}`;

export const CreateRecordsInput = `input CreateRecordsInput {
id: ID
arzt: String
patient: String
record: String
Session: String
SessionTime: String
zahn: String
datum: String
abrechnungsnummerprivat: String
abrechnungsnummergesaetzlich: String
Leistungskette: String
Ketteninhalt: [String]
file: S3ObjectInput
audio: S3ObjectInput
Access: [String]
createdAt: String
updatedAt: String
status: PostStatus!
_version: Int
}`;

export const CreateScheineInput = `input CreateScheineInput {
id: ID
Krankenkasse: String
Kostentraegerkennung: String
VersichertenNummer: String
Patient: String
Arzt: String
SStatus: String
Datum: String
Unfall: String
ArbeitsunfallOderBerufskrankheit: String
Versorgungsleiden: String
Hinfahrt: String
Rueckfahrt: String
vollTeilstationaereKrankenhausbehandlung: String
andererGrund: String
vorodernachstationaereBehandlung: String
Dialyse: String
Merkzeichen: String
Ausnahmefall: String
Mobilitaetsbeeintraechtigung: String
Begruendung: String
KTWerfordert: String
vomam: String
vomam2: String
xpropWoche: String
Behandlungsstaette: String
TaxiMietwagen: String
Rollstuhl: String
Tragestuhl: String
liegend: String
medizinischfachlicheBetreuung: String
RTW: String
NAWNEF: String
andere: String
Sonstiges: String
status: PostStatus!
_version: Int
}`;

export const CreateTrackingInput = `input CreateTrackingInput {
id: ID
start: String
end: String
Session: String
SessionTime: String
Leistung: String
distanz: String
Date: String
PatientId: String
ArztId: String
ids: [String]
Number: String
Praxis: String
createdAt: String
status: PostStatus!
_version: Int
}`;

export const CreateVolgebehandlungInput = `input CreateVolgebehandlungInput {
id: ID
Leistungsname: String
Name: String
Leistungskette: String
abrechnungsnummerprivat: String
abrechnungsnummergesaetzlich: String
status: PostStatus!
_version: Int
}`;

export const CreateWegegeldTableInput = `input CreateWegegeldTableInput {
id: ID
Distanz: String
Nummer: String
status: PostStatus!
_version: Int
}`;

export const CreateZahnInput = `input CreateZahnInput {
id: ID
Distanz: String
status: PostStatus!
_version: Int
}`;
  