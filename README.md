# Space Viewer

View cool space images, and save them in playlists for later.

# Index

- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Development](#Development)

<br />

## Prerequisites

Install these apps:

- [Node][node-install]

Install these VS Code extensions:

- [ESLint][eslint-extension]
- [Prettier][prettier-extension]

<br />

---

<br />

## Installation

Install dependencies with `npm i`.

<br />
 
--- 
  
<br />

## Development

### FE

Run the front-end app with `npm start`.

### Api

Run the API with `cd ./express` and then `npm start`.

---

## certificate renewal

1.delete old certificate
sudo certbot delete --cert-name cosmosviewer.com

2.manually create certicate
sudo certbot certonly --manual --preferred-challenges=dns -d cosmosviewer.com -d \*.cosmosviewer.com

3.add new txt record in route53 hosted zones to security group by pasting from ec2, the instance code in quotes
name: \_acme-challenge.cosmosviewer.com - this is the record in secruity group
value: <token> - this is the value from ec2
then wait a couple mins

4.return to powershell and hit enter and wait 2 mins

5.restart api by pushing to main

[node-install]: https://nodejs.org/en/download/
[eslint-extension]: vscode:extension/dbaeumer.vscode-eslint
[prettier-extension]: vscode:extension/esbenp.prettier-vscode
