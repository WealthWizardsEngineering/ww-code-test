# ww-code-test

In this test you will find a wide cross section of the type of code you will be exposed to at Wealth Wizards.

Most candidates complete the test in under 2 hours, however if 
you should wish to continue beyond that we welcome you to do so and this will have no impact on your submission.

Good luck
 
---

## Instructions

- [ ] Click **[Use this template](https://github.com/WealthWizardsEngineering/ww-code-test/generate)** to create a private repository in your own github account
- [ ] Invite github users [@mrwithersea](https://github.com/mrwithersea), [@lukebrowne](https://github.com/lukebrowne), [@ukslim](https://github.com/ukslim) and [@laurence-howard](https://github.com/laurence-howard) as collaborators on your repo
- [ ] Run ```yarn``` to install packages
- [ ] **Commit all your work on a new branch**
- [ ] When you are ready **raise a pull request against the master branch of your repo and add us as reviewers**
- [ ] Add a simple description to your PR outlining which parts of the test have been completed and any comments you feel support your submission
- [ ] If it is unlikely we will be able to identify you from your github username please add your name/email to your PR so we know who you are

---

### Part A. Fix the unit tests that are broken

Run this command to see the result of the unit tests, you will need to implement the empty function at `line:27` of `src/services/national-insurance.js` in order to make the failing unit tests pass.

```
yarn test:unit
```

---

### Part B. Fix the feature tests that are broken after completion of Part A.

Run this command to see the result of the feature tests, you will need to implement the missing feature of the API that is indicated by the failing tests.

```
yarn test:feature
```

---

### Part C. Build a simple React application that should allow a user to compare their national insurance contributions between 2018/19 and 2019/20

Run this command to run the application locally.

```
yarn dev
```

Alternatively you can run this command to bring the application up in the provided docker container:

```
make dev
```

There are a number of packages pre-installed with this codebase, feel free to _use any you see fit_ or add any of your own choosing.

The placeholder application can be browsed to on:
 
```
http://localhost:8080
```

There is a single API route accessible through the following request:

```
curl -X POST http://localhost:8080/v1/national-insurance -H 'Content-Type: application/json' -d '{"income": 1234}'
```

---

### _Additional Information_

This code test was written on macOS but will run natively on Linux and Windows 10 as well as in the provided devcontainer. The code test requires Node.js 14.x (which is in LTS) and we advocate using a node version management tool such as [n](https://github.com/tj/n) to help in managing your node versions.

**Windows Users**

When running on Windows 10 our preference was to follow [this guide](https://www.windowscentral.com/how-install-bash-shell-command-line-windows-10) to using Windows Subsystem for Linux and installing Bash through the Ubuntu distro in the Windows Store.

**Linux Users**

Users of Ubuntu should be aware that in some versions of the distro there are extra hurdles around the aliasing of the `yarn` command by the `cmdtest` library and the use of `nodejs` rather than `node`, [this page](https://yarnpkg.com/lang/en/docs/install/#debian-stable) provides details on rectifying these problems.

**Remote Containers**

If you're using VS Code and Docker, and have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VS Code extensions installed the project can be opened in a container.

More information about developing in a container can be found in the [VS Code documentation](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container).

If you would like to attempt the test in your browser and are part of the beta, this project is also configured to run in GitHub [Codespaces](https://github.com/features/codespaces). Please be aware GitHub may charge for use of this service.

More information about GitHub codespaces can be found in the [GitHub documentation](https://docs.github.com/en/github/developing-online-with-codespaces).
