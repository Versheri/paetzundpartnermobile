import gql from "graphql-tag";

  //NonBatch Mutations

  export const updateAdministrator2 = gql`
  mutation UpdateAdministrator($input: UpdateAdministratorInput!
    $condition: ModelAdministratorConditionInput){
      updateAdministrator2(input:$input
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

export const createPatient2 = `mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient2(input: $input, condition: $condition) {
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
  
  export const updateArzt2 = gql`
  mutation UpdateArzt($input: UpdateArztInput!
    $condition: ModelArztConditionInput){
      updateArzt2(input:$input
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
  
  
  export const updateBetreuer2 = gql`
  mutation UpdateBetreuer($input: UpdateBetreuerInput!
    $condition: ModelBetreuerConditionInput){
      updateBetreuer2(input:$input
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
  
  export const updatePatient2 = gql`
  mutation UpdatePatient($input: UpdatePatientInput!
    $condition: ModelPatientConditionInput){
      updatePatient2(input:$input
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
  
  export const updatePraxisGeschaeftsfuerung2 = gql`
  mutation UpdatePraxisGeschaeftsfuerung($input: UpdatePraxisGeschaeftsfuerungInput!
    $condition: ModelPraxisGeschaeftsfuerungConditionInput){
      updatePraxisGeschaeftsfuerung2(input:$input
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
  
  export const updatePflegeheimPDL2 = gql`
  mutation UpdatePflegeheimPdl($input: UpdatePflegeheimPdlInput!
    $condition: ModelPflegeheimPdlConditionInput){
        updatePflegeheimPDL2(input:$input
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
  
  export const updatePflegeheimGeschaeftsfuerung2 = gql`
  mutation UpdatePflegeheimGeschaeftsfuerung($input: UpdatePflegeheimGeschaeftsfuerungInput!
    $condition: ModelPflegeheimGeschaeftsfuerungConditionInput){
      updatePflegeheimGeschaeftsfuerung2(input:$input
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
  
  export const updatePraxisMitarbeiter2 = gql`
  mutation UpdatePraxisMitarbeiter($input: UpdatePraxisMitarbeiterInput!
    $condition: ModelPraxisMitarbeiterConditionInput){
      updatePraxisMitarbeiter2(input:$input
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


//Batch Mutations Needs Work
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
  
  