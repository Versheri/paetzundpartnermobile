
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


export const createTracking = `mutation CreateTracking($input: CreateTrackingInput!) {
  createTracking(input: $input) {
    id
    start
    end
    distanz
    Session
    SessionTime
    Leistung
    Date
    PatientId
    ArztId
    Number
    Praxis
    ids
  }
}
`;

export const createOffeneVolgebehandlung = `mutation CreateOffeneVolgebehandlung($input: CreateOffeneVolgebehandlungInput!) {
  createOffeneVolgebehandlung(input: $input) {
   id
   Leistungsname
   Name
   abrechnungsnummerprivat
   abrechnungsnummergesaetzlich
   Leistungskette
   Status
   patientId
   arztId
   datum
   Session
   SessionTime
   userId
  }
}
`;

export const updateOffeneVolgebehandlung = `mutation UpdateOffeneVolgebehandlung($input: UpdateOffeneVolgebehandlungInput!) {
  updateOffeneVolgebehandlung(input: $input) {
    id
   Leistungsname
   Name
   abrechnungsnummerprivat
   abrechnungsnummergesaetzlich
   Leistungskette
   Status
   patientId
   arztId
   datum
   Session
   SessionTime
   userId
  }
}
`;

export const createOffeneVolgebehandlung2 = `mutation CreateOffeneVolgebehandlung2($records: [CreateOffeneVolgebehandlungInput]) {
  createOffeneVolgebehandlung2(records: $records) {
    id
    Leistungsname
    Name
    abrechnungsnummerprivat
    abrechnungsnummergesaetzlich
    Leistungskette
    Status
    patientId
    arztId
    datum
    Session
    SessionTime
    userId
  }
}
`;

export const createKrankenKassen = `mutation CreateKrankenKassen($krankenkassen: [CreateKrankenKassenInput]) {
  createKrankenKassen(krankenkassen: $krankenkassen) {
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

export const createWegegeldTable = `mutation CreateWegegeldTable($input: CreateWegegeldTableInput!) {
  createWegegeldTable(input: $input) {
    id
    Distanz
    Nummer
  }
}
`;

export const CreatePatientInput = `input CreatePatientInput {
  id: ID!
Vorname: String!
kzv: String
Nachname: String
VersichertenNr: String
Kostentraegerkennung: String
Strasse: String
Hausnr: String
sex: String
DateofBirth: String
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
}`;

export const createArzt = `mutation CreateArzt($input: CreateArztInput!) {
  createArzt(input: $input) {
    id
    Vorname
    Nachname
    Arztnr
    BetriebsstaettenNr
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
export const CreateArztInput = `input CreateArztInput {
  id: ID!
  Vorname: String!
  Nachname: String
  Telefonnummer: String
  Arztnr: String
  BetriebsstaettenNr: String
  Email: String
  Strasse: String
  Hausnr: String
  Ort: String
  Postleitzahl: String
  Zustand: String
  Praxis: String
  Formular: String
  userId: String
  username: String
  Group: [String]
}`;
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
export const CreateBetreuerInput = `input CreateBetreuerInput {
  id: ID!
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
}`;

export const createPflegeheim = `mutation CreatePflegeheim($input: CreatePflegeheimInput!) {
  createPflegeheim(input: $input) {
    id
    Strasse
    Name
    HausNr
    Pflegeheimid
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

export const CreatePflegeheimInput = `input CreatePflegeheimInput {
  id: ID!
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
}`;

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

export const CreatePflegeheimGeschaeftsfuerungInput = `input CreatePflegeheimGeschaeftsfuerungInput {
  id: ID!
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
}`;

export const createPraxis = `mutation CreatePraxis($input: CreatePraxisInput!) {
  createPraxis(input: $input) {
    id
    Strasse
    Name
    HausNr
    Praxisid
    BetriebsstaettenNr
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

export const CreatePraxisInput = `input CreatePraxisInput {
  id: ID!
  Strasse: String!
  Praxisid: String
  Name: String
  BetriebsstaettenNr: String
  HausNr: String
  Postleitzahl: String
  Ort: String
  Telefonnummer: String
  Email: String
  HausAufteilung: String
  Etagen: String
  Zimmernummer: String
}`;

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

export const CreatePraxisGeschaeftsfuerungInput = `input CreatePraxisGeschaeftsfuerungInput {
  id: ID!
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
}`;


export const createDistanzen = `mutation CreateDistanzen($input: CreateDistanzenInput!) {
  createDistanzen(input: $input) {
    id
    Start
    Ende
    Distanz
  }
}
`;

export const CreateDistanzenInput = `input CreateDistanzenInput {
  id: ID!
  Start: String
  Ende: String
  Distanz: String
}`;

export const createPflegeheimPDL = `mutation CreatePflegeheimPDL($input: CreatePflegeheimPDLInput!) {
  createPflegeheimPDL(input: $input) {
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
export const CreatePflegeheimPDLInput = `input CreatePflegeheimPDLInput {
  id: ID!
  Vorname: String!
  Nachname: String
  Telefonnummer: String
  Email: String
  userId: String
  username: String
  Zustand: String
  Pflegeheim: String
  Formular: String
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
    Kette
    Volgebehandlung
  }
}
`;

export const CreateBehandlungenInput = `input CreateBehandlungenInput {
  id: ID!
  name: String
  Kuerzel: String
  Arzt:String
  ArztName:String
  Patient:String
  PatientName:String
  abrechnungsnummerprivat: String
  abrechnungsnummergesaetzlich: String
  Kette: [String]
  Volgebehandlung: String
}`;

export const createRecords = `mutation CreateRecords($input: CreateRecordsInput!) {
  createRecords(input: $input) {
    id
    arzt
    patient
    zahn
    Session
    SessionTime
    datum
    record
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

export const CreateRecordsInput = `input CreateRecordsInput {
  id: ID!
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
  file: S3Object
  audio: S3Object
  Access:[String]
  createdAt: String
  updatedAt: String
}`;