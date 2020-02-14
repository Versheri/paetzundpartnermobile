import gql from "graphql-tag";


export const listArzts2 = gql`
query listArzts2($nextToken: String){
	listArzts2(nextToken: $nextToken) {
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
  }
}`;

export const listBetreuers2 = gql`
query listBetreuers2($nextToken: String){
	listBetreuers2(nextToken: $nextToken) {
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
  }
}`;

export const listPatients2 = gql`
query listPatients2($nextToken: String){
	listPatients2(nextToken: $nextToken) {
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
  }
}`;
  
  export const listPraxisMitarbeiters2 = gql`
  query listPraxisMitarbeiters2($nextToken: String){
      listPraxisMitarbeiters2(nextToken: $nextToken) {
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
    }
  }`;

export const listPraxisGeschaeftsfuerungs2 = gql`
query listPraxisGeschaeftsfuerungs2($nextToken: String){
	listPraxisGeschaeftsfuerungs2(nextToken: $nextToken) {
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
  }
}`;

export const listPflegeheimPDLs2 = gql`
query listPflegeheimPDLs2($nextToken: String){
	listPflegeheimPDLs2(nextToken: $nextToken) {
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
  }
}`;

export const listPflegeheimGeschaeftsfuerungs2 = gql`
query listPflegeheimGeschaeftsfuerungs2($nextToken: String){
	listPflegeheimGeschaeftsfuerungs2(nextToken: $nextToken) {
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
  }
}`;