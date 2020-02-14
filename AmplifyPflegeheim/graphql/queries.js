/* eslint-disable */
// this is an auto generated file. This will be overwritten


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

