export const onCreateOrDeleteOrEditBetreuer = `subscription onCreateOrDeleteOrEditBetreuer {
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
    },
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
    },
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
    }

}
`;

export const onCreateOrDeleteOrEditArzt = `subscription onCreateOrDeleteOrEditArzt {
  onCreateArzt {
    id
    Vorname
    Nachname
    Arztnr
    BetriebsstaettenNr
    Telefonnummer
    Email
    Strasse
    Hausnr
    Ort
    Postleitzahl
    Zustand
    Praxis
    Formular
    userId
    username
    Group
  },
  onDeleteArzt {
    id
    Vorname
    Arztnr
    BetriebsstaettenNr
    Nachname
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




export const onCreateOrDeleteOrEditPatient = `subscription onCreateOrDeleteOrEditPatient {
  onCreatePatient {
    id
    kzv
    Vorname
    Nachname
    VersichertenNr
	  Kostentraegerkennung
    Strasse
    Hausnr
    sex
    DateofBirth
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
  },
  onDeletePatient {
    id
    kzv
    Vorname
    Nachname
    VersichertenNr
	  Kostentraegerkennung
    Strasse
    Hausnr
    sex
    DateofBirth
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




export const onCreateOrDeleteOrEditPraxisGeschaeftsfuerung = `subscription onCreateOrDeleteOrEditPraxisGeschaeftsfuerung {
  onCreatePraxisGeschaeftsfuerung {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    BetriebsstaettenNr
    Praxis
    Formular
    userId
    username
    Group
  },
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
  }

}
`;

export const onCreateOrDeleteOrEditPraxisMitarbeiter = `subscription onCreateOrDeleteOrEditPraxisMitarbeiter {
  onCreatePraxisMitarbeiter {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    Zustand
    BetriebsstaettenNr
    Praxis
    Formular
    userId
    username
    Group
  },
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
  }

}
`;




export const onCreateOrDeleteOrEditPflegeheimGeschaeftsfuerung = `subscription onCreateOrDeleteOrEditPflegeheimGeschaeftsfuerung {
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
  },
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
  }
}
`;

export const onCreateOrDeleteOrEditDistanzen = `subscription onCreateOrDeleteOrEditDistanzen {
  onCreateDistanzen {
    id
    Start
    Ende
    Distanz
  },
  onDeleteDistanzen {
    id
    Start
    Ende
    Distanz
  }
}
`;


export const onCreateOrDeleteOrEditPflegeheimPDL = `subscription onCreateOrDeleteOrEditPflegeheimPDL {
  onCreatePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    userId
    Zustand
    Pflegeheim
    Formular
  },
  onDeletePflegeheimPDL {
    id
    Vorname
    Nachname
    Telefonnummer
    Email
    userId
    Zustand
    Pflegeheim
    Formular
  }
}
`;








