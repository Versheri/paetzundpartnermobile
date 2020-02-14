import gql from "graphql-tag";


export default gql`
query listAbbrechnungs{
    listAbbrechnungs {
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