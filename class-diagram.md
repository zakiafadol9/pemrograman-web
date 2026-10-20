# Class Diagram Logis

```mermaid
classDiagram
 class User {
  +string id
  +string name
  +string email
  +string role
  +boolean active
 }
 class IncomingLetter {
  +string id
  +string agenda
  +string number
  +string subject
  +string status
  +archive()
 }
 class OutgoingLetter {
  +string id
  +string number
  +string subject
  +string status
  +submit()
  +send()
  +archive()
 }
 class Disposition {
  +string id
  +string letterId
  +string toId
  +string status
  +date dueDate
  +followup()
 }
 class Approval {
  +string id
  +string letterId
  +string status
  +string note
  +decide()
 }
 class Archive {
  +string id
  +string letterId
  +string location
  +printMetadata()
 }
 class Classification {
  +string code
  +string name
  +boolean active
 }
 class Contact {
  +string id
  +string name
  +string type
 }
 class Storage {
  +load()
  +commit()
  +reset()
  +validateBackup()
 }
 class Auth {
  +login()
  +logout()
  +canPage()
  +can()
 }
 class Generator {
  +print()
  +formatNumber()
 }
 User "1" --> "0..*" OutgoingLetter : creates
 User "1" --> "0..*" Disposition : receives
 IncomingLetter "1" --> "0..*" Disposition : delegates
 OutgoingLetter "1" --> "0..*" Approval : approves
 IncomingLetter "0..1" --> "0..1" Archive : archived
 OutgoingLetter "0..1" --> "0..1" Archive : archived
 Classification "1" --> "0..*" IncomingLetter
 Classification "1" --> "0..*" OutgoingLetter
 Contact "1" --> "0..*" IncomingLetter
 Storage ..> IncomingLetter
 Storage ..> OutgoingLetter
 Auth ..> User
 Generator ..> OutgoingLetter
```

Implementasi runtime terdiri dari modul JavaScript klasik dalam satu namespace global `window.SISMARA` agar dapat dimuat dengan `<script defer>` dari berkas lokal tanpa bundler atau modul ES yang dapat terkena pembatasan `file://`.
