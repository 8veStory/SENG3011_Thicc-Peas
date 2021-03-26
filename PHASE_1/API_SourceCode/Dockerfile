FROM node:15.11.0

# Install NodeJS modules
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

# Copy source code
COPY . .
COPY ./handy-amplifier-307202-7b79308ce4ea.json ../
EXPOSE 3000

# Run
CMD ["node", "index.js"]

# To-do:
# - [ ] Finish Report endpoint
# - [ ] Finish Disease endpoint
# - [ ] Finish Output Logfile endpoint
# - [ ] Deploy API
# - [ ] Deploy documentation website
# - [ ] Finish testing processes

# Future:
# - [ ] CI/CD for Google Function
# - [ ] CI/CD for API

# NOTES:
# enddate = null
# 404, 400
