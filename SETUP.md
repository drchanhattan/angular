1. npm install -g @angular/cli
2. ng new website
3. cd website
4. git init
5. git remote add origin https://github.com/drchanhattan/website.git
6. git add .
7. git commit -m "change"
8. git push -u origin master

9. Add this script:

"publish": "ng build --configuration production --output-path docs --base-href . && move docs\\browser\\\* docs && rmdir /s /q docs\\browser && echo christopherchan.co.uk > docs\\CNAME && git add . && git commit -m \"commit\" && git push -u origin master"

10. Run this script to build the project, add the CNAME for christopherchan.co.uk, then push to git repo

npm run-script publish
